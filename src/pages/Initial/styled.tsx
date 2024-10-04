import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #38a69d;
`;

export const Header = styled.View`
  flex: 2;
  padding-top: 14px;
  background-color: #38a68d;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
  padding-top: 15px;
  margin-bottom: 15px;
`;

export const Text = styled.Text`
  color: gray;
`;

export const Button = styled.TouchableOpacity`
  background-color: #38a68d;
  position: absolute;
  align-items: center;
  align-self: center;
  justify-content: center;
  bottom: 15%;
  width: 60%;
  border-radius: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;
