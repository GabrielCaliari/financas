import React, {useContext, useEffect, useState} from 'react';
import {Background, ListBalance, Area, Title, List} from './styled';
import Header from '../../components/Header';
import {format} from 'date-fns';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import {Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistoricList from '../../components/HistoricList';

const Home = () => {
  // const {signOut, user} = useContext(AuthContext);
  const [listBalnce, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const [movements, setMovevents] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

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

  return (
    <Background>
      <Header titulo="Minhas movimentações" />

      <ListBalance
        data={listBalnce}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.tag}
        renderItem={({item}) => <BalanceItem data={item} />}
      />
      <Area>
        <TouchableOpacity>
          <Icon name="event" color="black" size={30} />
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
    </Background>
  );
};

export default Home;
