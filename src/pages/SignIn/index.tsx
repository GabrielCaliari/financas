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
  ImageLogo,
  ViewInput,
  Separator,
} from './styled';
import {AuthContext} from '../../contexts/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Fontisto';

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
      style={{flex: 1, backgroundColor: '#121212'}}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
      enableOnAndroid={true}
      extraHeight={150}>
      <Header>
        <ImageLogo
          source={require('../../assets/LogoSemFundo.png')}
          resizeMode="contain"
        />
        <HeaderText>Entre para acessar seus dados financeiros.</HeaderText>
      </Header>

      <Animatable.View
        animation="fadeInUp"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#1e1e1e',
          paddingStart: '5%',
          paddingEnd: '5%',
          marginBottom: 200,
          borderRadius: 18,
          height: '40%',
        }}>
        <ViewInput>
          <Icon
            name="email"
            size={20}
            color="white"
            style={{paddingTop: 15, paddingRight: 8}}
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="white"
          />
          <Separator />
        </ViewInput>

        <ViewInput>
          <Icon
            name="locked"
            size={20}
            color="white"
            style={{paddingTop: 15, paddingRight: 8}}
          />
          <TextInput
            placeholder="Sua senha"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={currentSecure}
            placeholderTextColor="white"
          />
          <IconEye
            onPress={handleOnPressEye}
            name={currentSecure ? 'eye-off' : 'eye'}
            size={20}
            color="white"
          />
          <Separator />
        </ViewInput>

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
