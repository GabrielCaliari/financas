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
  UserWrapper,
  Header,
} from './styled';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import {Alert, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import HistoricList from '../../components/HistoricList';
import CalendarModal from '../../components/CalendarModal';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {AuthContext} from '../../contexts/auth';
import {useTheme} from '../../contexts/ThemeContext';
import {
  getMovementsByDate,
  getBalanceByDate,
  deleteMovement,
  MovementDisplay,
} from '../../services/movementService';

const Home = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [listBalance, setListBalance] = useState<{saldo: number; tag: string}[]>([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const [movements, setMovements] = useState<MovementDisplay[]>([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    async function getPermission() {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
        return;
      }
    }
    getPermission();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchMovements();
    }
  }, [dateMovements, isFocused]);

  async function fetchMovements() {
    try {
      const movementsData = await getMovementsByDate(dateMovements);
      const balanceData = await getBalanceByDate(dateMovements);

      setMovements(movementsData);
      setListBalance([balanceData]);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar as movimentações. Tente novamente.',
      );
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMovement(id);
      fetchMovements(); // Recarregar movimentações
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível excluir a movimentação.');
    }
  }

  function filterDateMovements(dateSelected: Date) {
    setDateMovements(dateSelected);
  }

  function handleEdit(item: MovementDisplay) {
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
                  user?.avatarUrl
                    ? {uri: user.avatarUrl}
                    : require('../../assets/avatar.png')
                }
              />
            </UserAvatarButton>
            <UserInfoDetail>
              <UserGreeting>Olá, {user?.name}</UserGreeting>
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
          <Icon name="calendar" color={colors.text} size={30} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={item => item.id}
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
