import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import Back from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  AvatarContainer,
  AvatarImage,
  AvatarLabel,
  Container,
  FormInput,
  FormLabel,
  FormProfile,
  Header,
  HiddenInput,
  LogoutButton,
  SaveButton,
  SaveButtonText,
} from './styled';

const Avatar = () => {
  const {user, updateUser} = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateUser({...user, avatarUrl}); // Passa todos os dados do usuário junto com o avatarUrl
      Alert.alert(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados',
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível atualizar seu perfil, tente novamente mais tarde.',
      );
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const source = response.assets[0].uri;
        setAvatarUrl(source);
      }
    });
  };

  return (
    <Container>
      <AvatarContainer>
        <AvatarLabel onPress={handleSelectImage}>
          <Back name="arrow-back" size={25} color="#FFF" />
          <HiddenInput accept="image/*" />
          <AvatarImage
            source={
              avatarUrl ? {uri: avatarUrl} : require('../../assets/avatar.png')
            }
            alt="Foto de perfil"
          />
        </AvatarLabel>
      </AvatarContainer>
      <SaveButton onPress={handleSave} disabled={isLoading}>
        <SaveButtonText>{isLoading ? 'Salvando...' : 'Salvar'}</SaveButtonText>
      </SaveButton>
    </Container>
  );
};

export default Avatar;
