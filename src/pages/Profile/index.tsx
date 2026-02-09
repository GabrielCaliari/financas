import React, {useContext} from 'react';
import {Switch, View, ScrollView} from 'react-native';
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
import {useTheme} from '../../contexts/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import IconUser from 'react-native-vector-icons/AntDesign';
import IconInfo from 'react-native-vector-icons/Feather';
import IconLogOut from 'react-native-vector-icons/Feather';
import IconWallet from 'react-native-vector-icons/MaterialIcons';
import IconCreditCard from 'react-native-vector-icons/MaterialIcons';
import IconCategory from 'react-native-vector-icons/MaterialIcons';

const Profile = () => {
  const {user, signOut} = useContext(AuthContext);
  const navigation = useNavigation();
  const {colors, isDark, toggleTheme} = useTheme();

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit');
  };

  const handleInfo = () => {
    navigation.navigate('Info');
  };

  const handleWallets = () => {
    navigation.navigate('Wallets');
  };

  const handleCreditCards = () => {
    navigation.navigate('CreditCards');
  };

  const handleCategories = () => {
    navigation.navigate('Categories');
  };

  return (
    <Container>
      <ViewHeader>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </ButtonCancel>
        <Header titulo="Perfil" />
      </ViewHeader>

      <ScrollView
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: 16,
            paddingHorizontal: 4,
          }}>
          <EditText>Modo escuro</EditText>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{false: colors.border, true: colors.primary}}
            thumbColor={colors.primaryContrast}
          />
        </View>

        <Area>
        <ViewInput>
          <IconWallet
            name="account-balance-wallet"
            size={20}
            color={colors.text}
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <EditButton onPress={handleWallets}>
            <EditText>Carteiras</EditText>
          </EditButton>
          <Separator />
        </ViewInput>

        <ViewInput>
          <IconCreditCard
            name="credit-card"
            size={20}
            color={colors.text}
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <EditButton onPress={handleCreditCards}>
            <EditText>Cartões</EditText>
          </EditButton>
          <Separator />
        </ViewInput>

        <ViewInput>
          <IconCategory
            name="category"
            size={20}
            color={colors.text}
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <EditButton onPress={handleCategories}>
            <EditText>Categorias</EditText>
          </EditButton>
          <Separator />
        </ViewInput>

        <ViewInput>
          <IconUser
            name="user"
            size={20}
            color={colors.text}
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <EditButton onPress={handleEditProfile}>
            <EditText>Editar perfil</EditText>
          </EditButton>
          <Separator />
        </ViewInput>

        <ViewInput>
          <IconInfo
            name="info"
            size={20}
            color={colors.text}
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
            color={colors.text}
            style={{paddingTop: 2, paddingRight: 8}}
          />
          <LogoutButton onPress={() => signOut()}>
            <LogoutText>Sair</LogoutText>
          </LogoutButton>
        </ViewInput>
      </Area>
      </ScrollView>
    </Container>
  );
};

export default Profile;
