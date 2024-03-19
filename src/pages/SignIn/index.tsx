import React, {useContext} from 'react';
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
  const navigation = useNavigation();
  const {loading} = useContext(AuthContext);

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} />
        <AreaInput>
          <Input placeholder="Seu email" />
        </AreaInput>
        <AreaInput>
          <Input placeholder="Sua senha" />
        </AreaInput>

        <SubmitButton activeOpacity={0.7}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <SubmitText>Cadastrar </SubmitText>
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
