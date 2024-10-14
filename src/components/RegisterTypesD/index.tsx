import React, {useState} from 'react';
import {RegisterButton, RegisterContainer, RegisterLabel} from './styled';
import Feather from 'react-native-vector-icons/Feather';

const RegisterTypeD = ({type, sendTypeChanged}) => {
  const [typeChecked, setTypeChecked] = useState(type);

  function changeType(name) {
    if (name === 'despesa') {
      setTypeChecked('despesa');
      sendTypeChanged('despesa');
    }
  }

  return (
    <RegisterContainer>
      <RegisterButton
        checked={typeChecked === 'despesa' ? true : false}
        onPress={() => changeType('despesa')}>
        <Feather name="arrow-down" size={25} color="black" />
        <RegisterLabel>Despesa</RegisterLabel>
      </RegisterButton>
    </RegisterContainer>
  );
};

export default RegisterTypeD;
