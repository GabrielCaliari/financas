import React, {useContext, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  SubmitButton,
  SubmitText,
  MidText,
  Header,
  HeaderText,
  IconEye,
  ErrorTextWrapper,
} from './styled';
import {ActivityIndicator, View, Alert} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm, FieldValues} from 'react-hook-form';
import {InputControl} from '../../components/InputControl';

const formSchema = yup.object({
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.')
    .required('Informe a senha.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não correspondem.')
    .required('Confirme a senha.'),
});

const SignUp = () => {
  const {signUp, loading} = useContext(AuthContext);
  const [currentSecure, setCurrentSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const handleSignUp = async (data: FieldValues) => {
    const {password} = data;
    try {
      await signUp(data.email, password, data.nome);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? 'Ocorreu um erro ao criar a conta. Email ou senha inválidos.'
          : 'Ocorreu um erro ao criar a conta. Tente novamente.';
      Alert.alert('Erro ao cadastrar', errorMessage);
    }
  };

  const handleOnPressEye = () => {
    setCurrentSecure(current => !current);
  };

  const handleOnPressConfirmEye = () => {
    setConfirmSecure(current => !current);
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
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingStart: '5%',
          paddingEnd: '5%',
          marginBottom: 120,
          borderRadius: 18,
        }}>
        {/* Nome */}
        <MidText>Seu nome</MidText>
        <InputControl
          placeholder="Digite seu nome"
          control={control}
          name="nome"
        />

        {/* Email */}
        <MidText>Seu email</MidText>
        <InputControl
          placeholder="Digite seu email..."
          control={control}
          name="email"
          keyboardType="email-address"
        />

        {/* Senha */}
        <MidText>Sua senha</MidText>
        <View>
          <InputControl
            placeholder="Digite sua senha..."
            control={control}
            name="password"
            secureTextEntry={currentSecure}
          />
          <IconEye
            onPress={handleOnPressEye}
            name={currentSecure ? 'eye-off' : 'eye'}
            size={20}
            color="black"
          />
          {errors.password && (
            <ErrorTextWrapper>{errors.password.message}</ErrorTextWrapper>
          )}
        </View>

        {/* Confirmação de Senha */}
        <MidText>Confirme sua senha</MidText>
        <View>
          <InputControl
            placeholder="Confirme sua senha..."
            control={control}
            name="confirmPassword"
            secureTextEntry={confirmSecure}
          />
          <IconEye
            onPress={handleOnPressConfirmEye}
            name={confirmSecure ? 'eye-off' : 'eye'}
            size={20}
            color="black"
          />
          {errors.confirmPassword && (
            <ErrorTextWrapper>
              {errors.confirmPassword.message}
            </ErrorTextWrapper>
          )}
        </View>

        {/* Botão de cadastro */}
        <View>
          <SubmitButton
            activeOpacity={0.7}
            onPress={handleSubmit(handleSignUp)}>
            {loading ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <SubmitText>Cadastrar</SubmitText>
            )}
          </SubmitButton>
        </View>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
