import React, {useContext} from 'react';
import {
  Container,
  LogoutButton,
  LogoutText,
  Message,
  Name,
  NewLink,
  NewText,
} from './styled';
import Header from '../../components/Header';
import {AuthContext} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Header titulo="Meu perfil" />
      <Message>Hey, bem vindo de volta!</Message>

      <Name numberOfLines={1}>{user && user.name}</Name>

      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </Container>
  );
};

export default Profile;
