import React, {useState} from 'react';
import {RegisterButton, RegisterContainer, RegisterLabel} from './styled';
import Feather from 'react-native-vector-icons/Feather';

const RegisterType = ({type, sendTypeChanged}) => {
  const [typeChecked, setTypeChecked] = useState(type);

  function changeType(name) {
    if (name === 'receita') {
      setTypeChecked('receita');
      sendTypeChanged('receita');
    }
  }

  return (
    <RegisterContainer>
      <RegisterButton
        checked={typeChecked === 'receita' ? true : false}
        onPress={() => changeType('receita')}>
        <Feather name="arrow-up" size={25} color="black" />
        <RegisterLabel>Receita</RegisterLabel>
      </RegisterButton>
    </RegisterContainer>
  );
};

export default RegisterType;
