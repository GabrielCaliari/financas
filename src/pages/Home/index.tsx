import Reac, {useContext, useEffect, useState} from 'react';
import {Text, View, Button} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import {Background, ListBalance} from './styled';
import Header from '../../components/Header';
import React from 'react';
import {format} from 'date-fns';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';

const Home = () => {
  // const {signOut, user} = useContext(AuthContext);
  const [listBalnce, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const balance = await api.get('/balance', {
        params: {
          date: dateFormated,
        },
      });
      if (isActive) {
        setListBalance(balance.data);
      }
    }
    getMovements();

    return () => (isActive = false);
  }, [dateMovements, isFocused]);

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
    </Background>
  );
};

export default Home;
