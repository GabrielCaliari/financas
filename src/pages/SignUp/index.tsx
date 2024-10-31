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
  IconEye,
} from './styled';
import {Platform, ActivityIndicator, View, TextInputProps} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface InputProps extends TextInputProps {
  secureTextEntry?: boolean;
}

const SignUp = ({secureTextEntry}: InputProps) => {
  const {signUp, loading} = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSecure, setCurrentSecure] = useState<boolean>(
    !!secureTextEntry,
  );

  function handleSignUp() {
    if (nome === '' || email === '' || password === '') {
      return;
    }

    signUp(email, password, nome);
  }

  const handleOnPressEye = () => {
    setCurrentSecure(current => !current);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'black'}}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
      enableOnAndroid={true}>
      <Header>
        <HeaderText> Cadastrar</HeaderText>
      </Header>

      <Animatable.View
        animation="fadeInUp"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingStart: '5%',
          paddingEnd: '5%',
          marginBottom: 120,
          borderRadius: 18,
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
        <View>
          <TextInput
            placeholder="Digite sua senha..."
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
          <SubmitButton activeOpacity={0.7} onPress={handleSignUp}>
            {loading ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <SubmitText>Cadastrar </SubmitText>
            )}
          </SubmitButton>
        </View>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
