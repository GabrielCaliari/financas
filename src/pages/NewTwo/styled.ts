import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #262626;
`;

export const InputValue = styled.TextInput`
  background-color: transparent; /* Fundo transparente */
  font-size: 30px; /* Tamanho maior para o valor */
  font-weight: bold; /* Deixar o valor em negrito */
  color: #fff; /* Cor branca para o texto */
  margin-left: 10px;
  width: 100%; /* Ocupa toda a largura */
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
  align-items: center; /* Alinhar o ícone e o input no centro vertical */
  justify-content: flex-start; /* Alinhar ícone e input à esquerda */
`;

export const InputDescription = styled.TextInput`
  flex: 1; /* Flexível para preencher o restante do espaço */
  height: 100%;
  background-color: white;
  font-size: 17px;
  border-radius: 5px;
  border-radius: 4px;
`;

export const ViewValue = styled.View`
  margin-top: 10px;
`;

export const TextValue = styled.Text`
  color: white;
  font-size: 18px;
  margin-left: 15px;
`;
