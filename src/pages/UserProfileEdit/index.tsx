import React, {useContext, useState} from 'react';
import {
  AreaColor,
  ButtonCancel,
  Container,
  SubmitButton,
  SubmitText,
  TextDescription,
  Title,
  ViewDescription,
  ViewHeader,
  ErrorTextWrapper,
  IconEye,
} from './styled';
import Back from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AuthContext} from '../../contexts/auth';
import {useForm, FieldValues} from 'react-hook-form';
import api from '../../services/api';
import {InputControl} from '../../components/InputControl';
import Avatar from '../../components/Avatar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomModalUpdate from '../../components/CustomModalUpdate';

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido.').required('Informe o email.'),
  currentPassword: yup.string(),
  newPassword: yup
    .string()
    .min(6, 'A nova senha deve ter pelo menos 6 caracteres.')
    .when('currentPassword', {
      is: val => val && val.length > 0,
      then: yup.string().required('Informe a nova senha.'),
      otherwise: yup.string().notRequired(),
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'As senhas não coincidem.')
    .when('newPassword', {
      is: val => val && val.length > 0,
      then: yup.string().required('Confirme a nova senha.'),
      otherwise: yup.string().notRequired(),
    }),
});

const UserProfileEdit = () => {
  const navigation = useNavigation();
  const [currentSecure, setCurrentSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [confirmAgainSecure, setConfirmAgainSecure] = useState(true);
  const {user, updateUser} = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const handleProfileEdit = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
      avatarUrl,
    };

    try {
      setIsLoading(true);

      const response = await api.put(`/users/${user.id}`, data);
      updateUser(response.data);

      if (form.currentPassword && form.newPassword) {
        await api.put(`/users/${user.id}/password`, {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
      }

      openModal(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados com sucesso.',
      );
      // Remova a navegação daqui para que ocorra após o modal.
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.response?.data || error);
      openModal(
        'Erro ao atualizar',
        error.response?.data?.error ||
          'Ocorreu um erro ao atualizar o seu perfil. Tente novamente.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnPressEye = () => {
    setCurrentSecure(current => !current);
  };

  const handleOnPressConfirmEye = () => {
    setConfirmSecure(current => !current);
  };

  const handleOnPressConfirmAgainEye = () => {
    setConfirmAgainSecure(current => !current);
  };

  const openModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <>
      <KeyboardAwareScrollView style={{backgroundColor: '#121212'}}>
        <Container>
          <ViewHeader>
            <ButtonCancel onPress={() => navigation.goBack()}>
              <Back name="arrow-back" color="white" size={30} />
            </ButtonCancel>
            <Header titulo="Edição de perfil" />
          </ViewHeader>

          <AreaColor>
            <Title>Editar dados do perfil</Title>

            <Avatar setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} />

            <ViewDescription>
              <TextDescription>Nome do usuário:</TextDescription>
              <InputControl
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="name"
                placeholder="Nome completo"
                textColor="white"
              />
              <ErrorTextWrapper>{errors.name?.message}</ErrorTextWrapper>
            </ViewDescription>

            <ViewDescription>
              <TextDescription>Email:</TextDescription>
              <InputControl
                autoCapitalize="none"
                autoCorrect={false}
                control={control}
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                textColor="white"
              />
              <ErrorTextWrapper>{errors.email?.message}</ErrorTextWrapper>
            </ViewDescription>

            {/* Campos para alteração de senha */}
            <ViewDescription style={{position: 'relative'}}>
              <TextDescription>Senha Atual:</TextDescription>
              <InputControl
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={currentSecure}
                control={control}
                name="currentPassword"
                placeholder="********"
                textColor="white"
              />
              <IconEye
                onPress={handleOnPressEye}
                name={currentSecure ? 'eye-off' : 'eye'}
                size={20}
                color="white"
              />
              <ErrorTextWrapper>
                {errors.currentPassword?.message}
              </ErrorTextWrapper>
            </ViewDescription>

            <ViewDescription style={{position: 'relative'}}>
              <TextDescription>Nova Senha:</TextDescription>
              <InputControl
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmSecure}
                control={control}
                name="newPassword"
                placeholder="********"
                textColor="white"
              />
              <IconEye
                onPress={handleOnPressConfirmEye}
                name={confirmSecure ? 'eye-off' : 'eye'}
                size={20}
                color="white"
              />
              <ErrorTextWrapper>{errors.newPassword?.message}</ErrorTextWrapper>
            </ViewDescription>

            <ViewDescription style={{position: 'relative'}}>
              <TextDescription>Confirme a Nova Senha:</TextDescription>
              <InputControl
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmAgainSecure}
                control={control}
                name="confirmPassword"
                placeholder="********"
                textColor="white"
              />
              <IconEye
                onPress={handleOnPressConfirmAgainEye}
                name={confirmAgainSecure ? 'eye-off' : 'eye'}
                size={20}
                color="white"
              />
              <ErrorTextWrapper>
                {errors.confirmPassword?.message}
              </ErrorTextWrapper>
            </ViewDescription>

            <SubmitButton
              onPress={handleSubmit(handleProfileEdit)}
              disabled={isLoading || !!errors.name || !!errors.email}>
              <SubmitText>
                {isLoading ? 'Salvando...' : 'Salvar alterações'}
              </SubmitText>
            </SubmitButton>
          </AreaColor>
        </Container>
      </KeyboardAwareScrollView>
      <CustomModalUpdate
        visible={modalVisible}
        title={modalTitle}
        info={modalMessage}
        onCancel={() => setModalVisible(false)}
        onContinue={() => {
          setModalVisible(false);
          navigation.goBack(); // Navega para a tela de perfil somente após a confirmação no modal
        }}
      />
    </>
  );
};

export default UserProfileEdit;
