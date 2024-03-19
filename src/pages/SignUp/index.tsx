import React, {useContext} from 'react';

import {
  Background,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Container,
} from './styled';
import {Alert, Platform} from 'react-native';
import {AuthContext} from '../../contexts/auth';

const SignUp = () => {
  const {user} = useContext(AuthContext);

  function handleName() {
    console.log(user);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <AreaInput>
          <Input placeholder="Nome" />
        </AreaInput>
        <AreaInput>
          <Input placeholder="Seu email" />
        </AreaInput>
        <AreaInput>
          <Input placeholder="Sua senha" />
        </AreaInput>

        <SubmitButton activeOpacity={0.7} onPress={handleName}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default SignUp;
