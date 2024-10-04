import React, {useContext, useState} from 'react';
import {Platform, ActivityIndicator, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  AreaInput,
  Input,
  Link,
  LinkText,
  SubmitButton,
  SubmitText,
  Header,
  HeaderText,
  MidText,
  TextInput,
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
    <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
      <Header>
        <HeaderText> Bem vindo(a)</HeaderText>
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
        <MidText> Email</MidText>
        <TextInput
          placeholder="Digite seu email..."
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <MidText> Senha</MidText>
        <TextInput
          placeholder="Sua senha"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <View>
          <SubmitButton activeOpacity={0.7} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <SubmitText>Acessar </SubmitText>
            )}
          </SubmitButton>
        </View>
        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Não possui uma conta? Registre-se agora</LinkText>
        </Link>
      </Animatable.View>
    </Container>
  );
};

export default SignIn;
