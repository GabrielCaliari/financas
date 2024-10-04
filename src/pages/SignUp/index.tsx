import React, {useContext, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  SubmitButton,
  SubmitText,
  Container,
  MidText,
  TextInput,
  Header,
  HeaderText,
} from './styled';
import {Platform, ActivityIndicator, View} from 'react-native';
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
    <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
      <Header>
        <HeaderText> Cadastrar</HeaderText>
      </Header>

      <Animatable.View
        animation="fadeInUp"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingStart: '5%',
          paddingEnd: '5%',
        }}>
        <MidText>Seu nome</MidText>
        <TextInput
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />

        <MidText>Seu email</MidText>
        <TextInput
          placeholder="Digite seu email..."
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <MidText>Sua senha</MidText>
        <TextInput
          placeholder="Digite sua senha..."
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <View>
          <SubmitButton activeOpacity={0.7} onPress={handleSignUp}>
            {loading ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <SubmitText>Cadastrar </SubmitText>
            )}
          </SubmitButton>
        </View>
      </Animatable.View>
    </Container>
  );
};

export default SignUp;
