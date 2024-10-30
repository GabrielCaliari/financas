import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: transparent;
`;

export const Header = styled.View`
  // Estilize seu cabeçalho aqui
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const TitleText = styled.Text`
  font-size: 24px;
  margin-left: 8px;
`;

export const AvatarContainer = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const AvatarLabel = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const HiddenInput = styled.TextInput`
  display: none;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 140px;
`;

export const FormProfile = styled.View`
  margin-bottom: 16px;
`;

export const FormLabel = styled.Text`
  margin-bottom: 8px;
  font-size: 16px;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 16px;
  padding: 8px;
  border: 0;
  border-radius: 5px;
  background-color: #fff;
`;

export const SaveButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: green;
  border-radius: 5px;
  align-items: center;
  margin: 15px 0 15px 0;
`;

export const SaveButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 8px 20px;
  border: 1px solid #121212;
  background-color: transparent;
  border-radius: 5px;
  align-items: center;
  margin-top: 16px;
`;
