import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
  padding-left: 10px;
  width: 100%; /* Garante que o header ocupe toda a largura */
  justify-content: space-between; /* Ajusta o layout para espaço entre os elementos */
`;

export const ButtonCancel = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 20px;
  align-items: center;
  justify-content: center;
  padding: 9px 0 0 5px;
`;

export const AreaColor = styled.View`
  flex: 1;
  background-color: #1e1e1e;
  margin: 50px 14px 50px 14px;
  border-radius: 18px;
  align-items: center;
`;

export const ViewInput = styled.View`
  height: 50px;
  width: 90%;
  background-color: transparent;
  font-size: 17px;
  padding: 0 8px;
  margin-bottom: 14px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center; /* Alinhar o ícone e o input no centro vertical */
  justify-content: flex-start; /* Alinhar ícone e input à esquerda */
`;

export const InputDescription = styled.TextInput`
  flex: 1; /* Flexível para preencher o restante do espaço */
  height: 100%;
  font-size: 17px;
  border-radius: 4px;
  color: white;
  padding-left: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: white;
  margin: 18px 18px 25px 18px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: #04c200;
  border-radius: 18px;
  margin: 20px 0 20px 0;
`;

export const SubmitText = styled.Text`
  color: white;
  font-size: 21px;
  font-weight: bold;
`;

export const TextDescription = styled.Text`
  color: white;
  top: 5px;
`;

export const ViewDescription = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%; /* Alinhamento completo */
  padding-left: 14px; /* Espaçamento opcional para alinhar o conteúdo */
`;

export const ErrorTextWrapper = styled.Text`
  color: #ff4747;
  font-size: 12px;
  position: absolute;
  bottom: -8px; /* Posiciona o erro logo abaixo do campo de entrada */
  left: 14px; /* Alinha com o campo */
  width: 100%; /* Limita a largura para que o erro não saia da tela */
  text-align: left;
`;

export const IconEye = styled(Feather)`
  position: absolute;
  right: 14px;
  top: 23px;
`;
