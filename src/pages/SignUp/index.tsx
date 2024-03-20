import React, {useContext, useState} from 'react';

import {
  Background,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Container,
} from './styled';
import {Alert, Platform, ActivityIndicator} from 'react-native';
import {AuthContext} from '../../contexts/auth';

const SignUp = () => {
  const {signUp, loading} = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    if (nome === '' || email === '' || password === '') {
      return;
    }

    signUp(email, password, nome);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <AreaInput>
          <Input
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Seu email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Sua senha"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton activeOpacity={0.7} onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <SubmitText>Cadastrar </SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default SignUp;
