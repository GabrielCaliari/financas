import React, {useState} from 'react';
import {Background, Input, SubmitButton, SubmitText} from './styled';
import Header from '../../components/Header';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';

const New = () => {
  const [labelInput, setLabelInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [type, setType] = useState('Receita');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <Header titulo="Registrando" />

        <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
          <Input
            placeholder="Descrição desse registro"
            onChange={text => setLabelInput(text)}
          />
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            onChange={text => setValueInput(text)}
          />
          <SubmitButton>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default New;
