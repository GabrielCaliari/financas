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
  ImageLogo,
  TextLogOut,
  TOLogOut,
  ViewInput,
  Separator,
} from './styled';
import {ActivityIndicator, View, Alert} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm, FieldValues} from 'react-hook-form';
import {InputControl} from '../../components/InputControl';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconUser from 'react-native-vector-icons/AntDesign';
import CustomModalUpdate from '../../components/CustomModalUpdate';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigation = useNavigation();

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
      openModal('Sucesso', 'Conta criada com sucesso!');
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? 'Ocorreu um erro ao criar a conta. Email ou senha inválidos.'
          : 'Ocorreu um erro ao criar a conta. Tente novamente.';
      openModal('Erro ao cadastrar', errorMessage);
    }
  };

  const handleOnPressEye = () => {
    setCurrentSecure(current => !current);
  };

  const handleOnPressConfirmEye = () => {
    setConfirmSecure(current => !current);
  };

  const openModal = (title, message) => {
    console.log('Abrindo modal com título:', title); // Verifique se o log é exibido
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: '#121212'}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        enableOnAndroid={true}>
        <Header>
          <ImageLogo
            source={require('../../assets/LogoSemFundo.png')}
            resizeMode="contain"
          />
          <HeaderText>
            Cadastre-se para comecar a ter um controle de suas movimentações
            finaceiras.
          </HeaderText>
        </Header>

        <Animatable.View
          animation="fadeInUp"
          style={{
            backgroundColor: '#1e1e1e',
            paddingStart: '5%',
            paddingEnd: '5%',
            marginBottom: 200,
            borderRadius: 18,
            height: '50%',
          }}>
          {/* Nome */}

          <ViewInput>
            <IconUser
              name="user"
              size={20}
              color="white"
              style={{paddingTop: 25, paddingRight: 8}}
            />
            <InputControl
              placeholder="Digite seu nome"
              control={control}
              name="nome"
              textColor="white"
            />
            <Separator />
          </ViewInput>

          {/* Email */}
          <ViewInput>
            <Icon
              name="email"
              size={20}
              color="white"
              style={{paddingTop: 25, paddingRight: 8}}
            />
            <InputControl
              placeholder="Digite seu email..."
              control={control}
              name="email"
              keyboardType="email-address"
              textColor="white"
            />
            <Separator />
          </ViewInput>
          {/* Senha */}

          <ViewInput>
            <Icon
              name="locked"
              size={20}
              color="white"
              style={{paddingTop: 25, paddingRight: 8}}
            />
            <InputControl
              placeholder="Digite sua senha..."
              control={control}
              name="password"
              secureTextEntry={currentSecure}
              textColor="white"
            />
            <IconEye
              onPress={handleOnPressEye}
              name={currentSecure ? 'eye-off' : 'eye'}
              size={20}
              color="white"
            />
            {errors.password && (
              <ErrorTextWrapper>{errors.password.message}</ErrorTextWrapper>
            )}
            <Separator />
          </ViewInput>

          {/* Confirmação de Senha */}
          <ViewInput>
            <Icon
              name="locked"
              size={20}
              color="white"
              style={{paddingTop: 25, paddingRight: 8}}
            />
            <InputControl
              placeholder="Confirme sua senha..."
              control={control}
              name="confirmPassword"
              secureTextEntry={confirmSecure}
              textColor="white"
            />
            <IconEye
              onPress={handleOnPressConfirmEye}
              name={confirmSecure ? 'eye-off' : 'eye'}
              size={20}
              color="white"
            />
            {errors.confirmPassword && (
              <ErrorTextWrapper>
                {errors.confirmPassword.message}
              </ErrorTextWrapper>
            )}
            <Separator />
          </ViewInput>

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
          <TOLogOut onPress={() => navigation.goBack()}>
            <TextLogOut>Ja é cadastrado? Entrar</TextLogOut>
          </TOLogOut>
        </Animatable.View>
      </KeyboardAwareScrollView>

      <CustomModalUpdate
        visible={modalVisible}
        title={modalTitle}
        info={modalMessage}
        onCancel={() => setModalVisible(false)}
        onContinue={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </>
  );
};

export default SignUp;
