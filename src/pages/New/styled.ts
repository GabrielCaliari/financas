import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Background = styled.View`
  flex: 1;
  background-color: #121212;
`;

export const InputValue = styled.TextInput`
  background-color: transparent;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-left: 10px;
  width: 100%;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 4px;
`;

export const SubmitText = styled.Text`
  color: white;
  font-size: 21px;
  font-weight: bold;
`;

export const ButtonCancel = styled.TouchableOpacity`
  margin-left: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  color: white;
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-inline: 10px;
`;

export const ViewInput = styled.View`
  height: 50px;
  width: 90%;
  background-color: white;
  font-size: 17px;
  padding: 0 8px;
  margin-bottom: 14px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const InputDescription = styled.TextInput`
  flex: 1;
  height: 100%;
  background-color: white;
  font-size: 17px;
  border-radius: 5px;
`;

export const ViewValue = styled.View`
  margin-top: 10px;
`;

export const TextValue = styled.Text`
  color: white;
  font-size: 18px;
  margin-left: 15px;
`;

/* Estilos para o campo "Carteira" */
export const WalletInputContainer = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid blue;
  padding: 5px 10px;
`;
