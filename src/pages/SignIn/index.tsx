import React, {useContext, useState} from 'react';
import {Platform, ActivityIndicator, View, TextInputProps} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  Link,
  LinkText,
  SubmitButton,
  SubmitText,
  Header,
  HeaderText,
  MidText,
  TextInput,
  IconEye,
} from './styled';
import {AuthContext} from '../../contexts/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface InputProps extends TextInputProps {
  secureTextEntry?: boolean;
}

const SignIn = ({secureTextEntry}: InputProps) => {
  const {signIn, loading} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [currentSecure, setCurrentSecure] = useState<boolean>(
    !!secureTextEntry,
  );

  function handleLogin() {
    signIn(email, password);
  }

  const handleOnPressEye = () => {
    setCurrentSecure(current => !current);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'black'}}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
      enableOnAndroid={true}
      extraHeight={150}>
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
        <View>
          <TextInput
            placeholder="Sua senha"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={currentSecure}
          />
          <IconEye
            onPress={handleOnPressEye}
            name={currentSecure ? 'eye-off' : 'eye'}
            size={20}
            color="black"
          />
        </View>

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
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
