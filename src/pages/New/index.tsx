import React, {useState} from 'react';
import {Background, Input, SubmitButton, SubmitText} from './styled';
import Header from '../../components/Header';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Text,
} from 'react-native';
import RegisterType from '../../components/RegisterTypes';
import api from '../../services/api';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

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
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
        <Header titulo="Registrando" />

        <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
          <Input
            placeholder="Descrição desse registro"
            value={labelInput}
            onChangeText={text => setLabelInput(text)}
          />
          <Input
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
