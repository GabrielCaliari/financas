import React, {useContext, useState} from 'react';
import {
  AreaColor,
  ButtonCancel,
  Container,
  InputDescription,
  SubmitButton,
  SubmitText,
  Title,
  ViewHeader,
  ViewInput,
} from './styled';
import Back from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AuthContext} from '../../contexts/auth';
import {Alert, Text} from 'react-native';
import {useForm, FieldValues} from 'react-hook-form';
import api from '../../services/api';
import {InputControl} from '../../components/InputControl';

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
    };

    try {
      const response = await api.put(`/users/${user.id}`, data);
      updateUser(response.data);
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

        <InputControl
          autoCapitalize="none"
          autoCorrect={false}
          control={control}
          name="name"
          placeholder="Nome completo"
          error={errors.name && errors.name.message}
        />

        <Text style={{color: 'white'}}>{user && user.name}</Text>

        <InputControl
          autoCapitalize="none"
          autoCorrect={false}
          control={control}
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          error={errors.email && errors.email.message}
        />

        <SubmitButton
          onPress={handleSubmit(handleProfileEdit)}
          disabled={!!errors.name || !!errors.email}>
          <SubmitText>Salvar alterações</SubmitText>
        </SubmitButton>
      </AreaColor>
    </Container>
  );
};

export default UserProfileEdit;
