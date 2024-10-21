import React, {useContext, useEffect, useState} from 'react';
import {Background, ListBalance, Area, Title, List} from './styled';
import Header from '../../components/Header';
import {format} from 'date-fns';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import {Modal, TextInputProps, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import HistoricList from '../../components/HistoricList';
import CalendarModal from '../../components/CalendarModal';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

const Home = () => {
  // const {signOut, user} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [listBalance, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const [movements, setMovevents] = useState([]);
  const [statusNotification, setStatusNotification] = useState(true);

  useEffect(() => {
    async function getPermission() {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log('Permission:', settings.authorizationStatus);
      } else {
        console.log('Usuario negou a permissao!');
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
      setDateMovements(new Date());
    } catch (err) {
      console.log(err);
    }
  }

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected);
  }

  return (
    <Background>
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
        <Title>Ultimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HistoricList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
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
