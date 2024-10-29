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
  const {user} = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  const handleSave = () => {
    // Lógica para salvar as alterações
    Alert.alert(
      'Perfil atualizado',
      'Os dados do seu perfil foram atualizados',
    );
  };

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false, // ou true se você quiser a imagem como base64
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const source = response.assets[0].uri; // A URL da imagem selecionada
        setAvatarUrl(source); // Atualiza o estado com a nova URL da imagem
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
    </Container>
  );
};

export default Avatar;
