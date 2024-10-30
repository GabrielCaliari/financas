import React, {useContext} from 'react';
import {
  ButtonCancel,
  Container,
  EditButton,
  EditText,
  LogoutButton,
  LogoutText,
  Message,
  Name,
  UserAvatar,
  UserAvatarButton,
  UserInfo,
  UserWrapper,
  ViewHeader,
} from './styled';
import Header from '../../components/Header';
import {AuthContext} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  return (
    <Container>
      <ViewHeader>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color="white" size={30} />
        </ButtonCancel>
        <Header titulo="Perfil" />
      </ViewHeader>

      <UserWrapper>
        <UserInfo>
          <UserAvatarButton>
            <UserAvatar
              source={
                user.avatarUrl
                  ? {uri: user.avatarUrl}
                  : require('../../assets/avatar.png')
              }
              resizeMethod="auto"
            />
          </UserAvatarButton>
        </UserInfo>
      </UserWrapper>

      <Message>Hey, bem vindo de volta!</Message>

      <Name numberOfLines={1}>{user && user.name}</Name>

      <EditButton onPress={handleEditProfile}>
        <EditText>Editar perfil</EditText>
      </EditButton>

      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </Container>
  );
};

export default Profile;
