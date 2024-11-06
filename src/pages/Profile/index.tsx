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
  ViewInput,
  Separator,
  Area,
} from './styled';
import Header from '../../components/Header';
import {AuthContext} from '../../contexts/auth';
import {useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import IconUser from 'react-native-vector-icons/AntDesign';
import IconLogOut from 'react-native-vector-icons/Feather';

const Profile = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  const handleInfo = () => {
    navigation.navigate('Info');
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
          <UserAvatarButton disabled={true}>
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

      <Area>
        <ViewInput>
          <IconUser
            name="user"
            size={20}
            color="white"
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <EditButton onPress={handleEditProfile}>
            <EditText>Editar perfil</EditText>
          </EditButton>
          <Separator />
        </ViewInput>

        <ViewInput>
          <IconUser
            name="info"
            size={20}
            color="white"
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <EditButton onPress={handleInfo}>
            <EditText>Sobre</EditText>
          </EditButton>
          <Separator />
        </ViewInput>

        <ViewInput>
          <IconLogOut
            name="log-out"
            size={20}
            color="white"
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <LogoutButton onPress={() => signOut()}>
            <LogoutText>Sair</LogoutText>
          </LogoutButton>
        </ViewInput>
      </Area>
    </Container>
  );
};

export default Profile;
