import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import FilterR from '../../components/FilterR';
import {
  ButtonCancel,
  List,
  ViewHeader,
  ButtonText,
  Area,
  Title,
} from './styled';
import {format} from 'date-fns';
import api from '../../services/api';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import CalendarModal from '../../components/CalendarModal';
import Back from 'react-native-vector-icons/Ionicons';
import FilterD from '../../components/FilterD';
import Separator from '../../components/Separator';

const BalanceD = () => {
  const [movements, setMovevents] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

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

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <ViewHeader style={{justifyContent: 'space-between'}}>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color="white" size={30} />
        </ButtonCancel>
        <Header titulo="Despesa" />
      </ViewHeader>
      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="calendar" color="white" size={30} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={item => item?.id?.toString() || Math.random().toString()}
        renderItem={({item}) => (item ? <FilterD data={item} /> : null)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 20}}
        ItemSeparatorComponent={Separator}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </View>
  );
};

export default BalanceD;
