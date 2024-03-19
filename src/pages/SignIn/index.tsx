import React from 'react';
import {Platform} from 'react-native';
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

const SignIn = () => {
  const navigation = useNavigation();

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
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>
        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  );
};

export default SignIn;
