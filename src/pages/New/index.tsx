/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Background,
  ButtonCancel,
  ButtonText,
  Input,
  InputDescription,
  InputValue,
  SubmitButton,
  SubmitText,
  ViewHeader,
  ViewInput,
} from './styled';
import Header from '../../components/Header';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
  View,
} from 'react-native';
import RegisterType from '../../components/RegisterTypes';
import api from '../../services/api';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconEye} from '../SignIn/styled';

const New = () => {
  const navigation = useNavigation();
  const [labelInput, setLabelInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [type, setType] = useState('receita');

  function handleSubmit() {
    Keyboard.dismiss();

    if (isNaN(parseFloat(valueInput)) || type === null) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo: ${type} - Valor: ${parseFloat(valueInput)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd(),
        },
      ],
    );
  }

  async function handleAdd() {
    Keyboard.dismiss();

    await api.post('/receive', {
      description: labelInput,
      value: Number(valueInput),
      type: type,
      date: format(new Date(), 'dd/MM/yyyy'),
    });

    setLabelInput('');
    setValueInput('');
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <ViewHeader style={{justifyContent: 'space-between'}}>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <ButtonText>Cancelar</ButtonText>
          </ButtonCancel>
          <Header titulo="Registrando" />
        </ViewHeader>

        <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
          <ViewInput>
            <InputDescription
              placeholder="Descrição desse registro"
              value={labelInput}
              onChangeText={text => setLabelInput(text)}
            />
            <IconEye name="edit" size={20} color="black" />
          </ViewInput>
          <InputValue
            placeholder="Valor desejado"
            keyboardType="numeric"
            value={valueInput}
            onChangeText={text => setValueInput(text)}
          />
          <RegisterType type={type} sendTypeChanged={item => setType(item)} />
          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default New;
