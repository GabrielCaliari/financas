import React, {useContext, useEffect, useState} from 'react';
import {
  Background,
  ListBalance,
  Area,
  Title,
  List,
  Separator,
  UserAvatar,
  UserAvatarButton,
  UserGreeting,
  UserInfo,
  UserInfoDetail,
  UserName,
  UserWrapper,
  Header,
} from './styled';
import {format} from 'date-fns';
import api from '../../services/api';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import {Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import HistoricList from '../../components/HistoricList';
import CalendarModal from '../../components/CalendarModal';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {avatarDefault} from '../../assets/avatar.png';
import {AuthContext} from '../../contexts/auth';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [listBalance, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const [movements, setMovevents] = useState([]);
  const [statusNotification, setStatusNotification] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    async function getPermission() {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission:', settings.authorizationStatus);
      } else {
        console.log('Usuário negou a permissão!');
        setStatusNotification(false);
      }
    }
    getPermission();
  }, []);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let date = new Date(dateMovements);
      let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
      let dateFormated = format(onlyDate, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params: {
          date: dateFormated,
        },
      });

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setMovevents(receives.data);
        setListBalance(balance.data);
      }
    }
    getMovements();

    return () => (isActive = false);
  }, [dateMovements, isFocused]);

  async function handleDelete(id) {
    try {
      await api.delete('/receives/delete', {
        params: {
          item_id: id,
        },
      });
      setDateMovements(new Date()); // Atualiza a data para recarregar as movimentações
    } catch (err) {
      console.log(err);
    }
  }

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected);
  }

  function handleEdit(item) {
    if (item.type === 'receita') {
      navigation.navigate('Receita', {
        id: item.id,
        description: item.description,
        value: item.value,
        type: item.type,
        payment_method: item.payment_method,
      });
    } else if (item.type === 'despesa') {
      navigation.navigate('Despesa', {
        id: item.id,
        description: item.description,
        value: item.value,
        type: item.type,
        payment_method: item.payment_method,
      });
    }
  }

  const handleUserProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <Background>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={handleUserProfile}>
              <UserAvatar
                source={
                  user.avatarUrl
                    ? {uri: user.avatarUrl}
                    : require('../../assets/avatar.png')
                }
              />
            </UserAvatarButton>
            <UserInfoDetail>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </UserInfoDetail>
          </UserInfo>
        </UserWrapper>
      </Header>

      <ListBalance
        data={listBalance.filter(item => item.tag === 'saldo')}
        keyExtractor={item => item.tag}
        renderItem={({item}) => {
          const totalIncome = movements
            .filter(movement => movement.type === 'receita')
            .reduce((acc, curr) => acc + curr.value, 0);

          const totalExpense = movements
            .filter(movement => movement.type === 'despesa')
            .reduce((acc, curr) => acc + curr.value, 0);

          return (
            <BalanceItem
              data={{
                ...item,
                receita: totalIncome,
                despesa: totalExpense,
              }}
            />
          );
        }}
      />

      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="calendar" color="white" size={30} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.7} style={{marginHorizontal: 10}}>
            <HistoricList
              data={item}
              deleteItem={handleDelete}
              editItem={movement => handleEdit(movement)}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </Background>
  );
};

export default Home;
