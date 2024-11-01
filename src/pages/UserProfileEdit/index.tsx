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
} from './styled';
import Back from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AuthContext} from '../../contexts/auth';
import {Alert} from 'react-native';
import {useForm, FieldValues} from 'react-hook-form';
import api from '../../services/api';
import {InputControl} from '../../components/InputControl';
import Avatar from '../../components/Avatar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido.').required('Informe o email.'),
  currentPassword: yup.string(), // Não obrigatório, mas presente se alteração de senha for necessária
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
  const {user, updateUser} = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);
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

      // Atualize o perfil
      const response = await api.put(`/users/${user.id}`, data);
      updateUser(response.data);

      // Se a senha for informada, faça uma segunda requisição para atualizar a senha
      if (form.currentPassword && form.newPassword) {
        const passwordResponse = await api.put(`/users/${user.id}/password`, {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
        console.log('Senha atualizada com sucesso:', passwordResponse.data);
      }

      Alert.alert(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados',
      );
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error.response?.data || error);
      Alert.alert(
        'Erro ao atualizar',
        error.response?.data?.error ||
          'Ocorreu um erro ao atualizar o seu perfil. Tente novamente.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView>
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
              error={errors.name && errors.name.message}
            />
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
              error={errors.email && errors.email.message}
            />
          </ViewDescription>

          {/* Campos para alteração de senha */}
          <ViewDescription>
            <TextDescription>Senha Atual:</TextDescription>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              control={control}
              name="currentPassword"
              placeholder="********"
              error={errors.currentPassword && errors.currentPassword.message}
            />
            <TextDescription style={{minHeight: 20, color: 'red'}}>
              {errors.currentPassword?.message || ''}
            </TextDescription>
          </ViewDescription>

          <ViewDescription>
            <TextDescription>Nova Senha:</TextDescription>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              control={control}
              name="newPassword"
              placeholder="********"
              error={errors.newPassword && errors.newPassword.message}
            />
            <TextDescription style={{minHeight: 20, color: 'red'}}>
              {errors.newPassword?.message || ''}
            </TextDescription>
          </ViewDescription>

          <ViewDescription>
            <TextDescription>Confirme a Nova Senha:</TextDescription>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              control={control}
              name="confirmPassword"
              placeholder="********"
              error={errors.confirmPassword && errors.confirmPassword.message}
            />
            <TextDescription style={{minHeight: 20, color: 'red'}}>
              {errors.confirmPassword?.message || ''}
            </TextDescription>
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
  );
};

export default UserProfileEdit;
