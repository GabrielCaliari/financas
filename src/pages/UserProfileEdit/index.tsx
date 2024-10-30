// UserProfileEdit.js
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

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido.').required('Informe o email.'),
});

const UserProfileEdit = () => {
  const navigation = useNavigation();
  const {user, updateUser} = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl); // Gerencie o avatarUrl aqui
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
      avatarUrl, // Inclua o avatarUrl
    };

    try {
      setIsLoading(true);
      const response = await api.put(`/users/${user.id}`, data);
      updateUser(response.data); // Atualize o contexto com todos os dados do perfil
      Alert.alert(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados',
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erro ao atualizar',
        'Ocorreu um erro ao atualizar o seu perfil. Tente novamente.',
      );
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

        <SubmitButton
          onPress={handleSubmit(handleProfileEdit)}
          disabled={isLoading || !!errors.name || !!errors.email}>
          <SubmitText>
            {isLoading ? 'Salvando...' : 'Salvar alterações'}
          </SubmitText>
        </SubmitButton>
      </AreaColor>
    </Container>
  );
};

export default UserProfileEdit;
