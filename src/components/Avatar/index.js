// Avatar.js
import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import Back from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {AvatarContainer, AvatarImage, AvatarLabel, Container} from './styled';

const Avatar = ({setAvatarUrl, avatarUrl}) => {
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
        setAvatarUrl(source); // Atualiza o avatarUrl no estado do UserProfileEdit
      }
    });
  };

  return (
    <Container>
      <AvatarContainer>
        <AvatarLabel onPress={handleSelectImage}>
          <AvatarImage
            source={
              avatarUrl ? {uri: avatarUrl} : require('../../assets/avatar.png')
            }
          />
          <Back
            name="camera"
            size={30}
            color="#FFF"
            style={{
              position: 'absolute',
              bottom: 5,
              right: 35,
              top: 35,
            }}
          />
        </AvatarLabel>
      </AvatarContainer>
    </Container>
  );
};

export default Avatar;
