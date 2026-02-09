import React, {useEffect, useState} from 'react';
import {Alert, Modal, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import {useTheme} from '../../contexts/ThemeContext';
import {
  ButtonCancel,
  List,
  ViewHeader,
  Area,
  Title,
} from './styled';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import CalendarModal from '../../components/CalendarModal';
import Back from 'react-native-vector-icons/Ionicons';
import FilterD from '../../components/FilterD';
import Separator from '../../components/Separator';
import {
  getMovementsByTypeAndDate,
  MovementDisplay,
} from '../../services/movementService';

const BalanceD = () => {
  const {colors} = useTheme();
  const [movements, setMovements] = useState<MovementDisplay[]>([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      try {
        const movementsData = await getMovementsByTypeAndDate(
          'despesa',
          dateMovements,
        );

        if (isActive) {
          setMovements(movementsData);
        }
      } catch (error) {
        if (isActive) {
          Alert.alert('Erro', 'Não foi possível carregar as despesas.');
        }
      }
    }
    getMovements();

    return () => {
      isActive = false;
    };
  }, [dateMovements, isFocused]);

  function filterDateMovements(dateSelected: Date) {
    setDateMovements(dateSelected);
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <ViewHeader style={{justifyContent: 'space-between'}}>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </ButtonCancel>
        <Header titulo="Despesa" />
      </ViewHeader>
      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="calendar" color={colors.text} size={30} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>
      <List
        data={movements}
        keyExtractor={item => item.id}
        renderItem={({item}) => <FilterD data={item} />}
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
