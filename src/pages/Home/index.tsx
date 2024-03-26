import React, {useContext, useEffect, useState} from 'react';
import {Background, ListBalance, Area, Title, List} from './styled';
import Header from '../../components/Header';
import {format} from 'date-fns';
import api from '../../services/api';
import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistoricList from '../../components/HistoricList';

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
      <Area>
        <TouchableOpacity>
          <Icon name="event" color="black" size={30} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
        <List
          data={[]}
          keyExtractor={item => item.id}
          renderItem={({item}) => <HistoricList />}
          showsVerticalScrollIndicator={false}
        />
      </Area>
    </Background>
  );
};

export default Home;
