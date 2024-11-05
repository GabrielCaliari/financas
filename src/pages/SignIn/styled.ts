import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Logo = styled.Image`
  margin-bottom: 25px;
`;

export const AreaInput = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput`
  background-color: white;
  width: 90%;
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: #121212;
  margin-bottom: 15px;
  padding-left: 15px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #04c200;
  justify-content: center;
  align-items: center;
  bottom: 15%;
  width: 100%;
  border-radius: 12px;
  padding: 16px;
  margin-top: 40px;
`;

export const SubmitText = styled.Text`
  color: white;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: white;
`;

export const Header = styled.View`
  margin-top: 14%;
  margin-bottom: 8%;
  padding-inline-start: 5%;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: white;
  margin: 0 0 0 10px;
  align-items: center;
  justify-content: center;
`;

export const MidText = styled.Text`
  font-size: 25px;
  padding-top: 15px;
`;

export const TextInput = styled.TextInput`
  font-size: 15px;
  padding-top: 10px;

  color: white;
  border-color: transparent;
`;

export const IconEye = styled(Feather)`
  position: absolute;
  right: 14px;
  top: 38px;
`;

export const ImageLogo = styled.Image`
  height: 150px;
  width: 150px;
  justify-content: center;
  align-items: center;
`;

export const ViewInput = styled.View`
  margin-top: 22px;
  background-color: #1e1e1e;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  flex-direction: row;
  padding: 18px 0 0 0;
  align-items: flex-start;
  margin: 0 14px 0 14px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3); /* Branco com 30% de opacidade */
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;
