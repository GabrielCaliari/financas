import React, {useContext, useState} from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  Link,
  LinkText,
  SubmitButton,
  SubmitText,
} from './styled';
import {AuthContext} from '../../contexts/auth';

const SignIn = () => {
  const {signIn, loading} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} />
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

        <SubmitButton activeOpacity={0.7} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <SubmitText>Acessar </SubmitText>
          )}
        </SubmitButton>
        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
};

export default SignIn;
