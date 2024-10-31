import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #38a69d;
  justify-content: center;
`;

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
  background-color: #ffd600;
  justify-content: center;
  align-items: center;
  bottom: 15%;
  width: 100%;
  border-radius: 12px;
  padding: 16px;
  margin-top: 40px;
`;

export const SubmitText = styled.Text`
  color: black;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const LinkText = styled.Text`
  color: #171717;
`;

export const Header = styled.View`
  margin-top: 14%;
  margin-bottom: 8%;
  padding-inline-start: 5%;
`;

export const HeaderText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin: 0 0 0 10px;
`;

export const MidText = styled.Text`
  font-size: 25px;
  padding-top: 15px;
`;

export const TextInput = styled.TextInput`
  font-size: 15px;
  padding-top: 10px;
  border-bottom-width: 1px;
`;

export const IconEye = styled(Feather)`
  position: absolute;
  right: 14px;
  top: 16px;
`;
