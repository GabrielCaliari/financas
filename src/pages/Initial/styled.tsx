import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: black;
`;

export const Header = styled.View`
  flex: 2;
  padding-top: 14px;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
  padding-top: 15px;
  margin-bottom: 15px;
  color: black;
  align-items: center;
  justify-content: center;
  margin: 18px 18px 5px 18px;
`;

export const Text = styled.Text`
  color: black;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 19px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #ffd600;
  position: absolute;
  align-items: center;
  align-self: center;
  justify-content: center;
  bottom: 15%;
  width: 60%;
  border-radius: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 18px;
`;
