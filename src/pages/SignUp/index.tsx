import React from 'react';

import {
  Background,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Container,
} from './styled';
import {Platform} from 'react-native';

const SignUp = () => {
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

        <SubmitButton activeOpacity={0.7}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default SignUp;
