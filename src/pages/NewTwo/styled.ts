import styled from 'styled-components/native';

// Estilo de fundo da tela
export const Background = styled.View`
  flex: 1;
  background-color: #121212;
`;

// Estilo do campo de entrada de valor
export const InputValue = styled.TextInput`
  background-color: transparent; /* Fundo transparente */
  font-size: 30px; /* Tamanho maior para o valor */
  font-weight: bold; /* Deixar o valor em negrito */
  color: #fff; /* Cor branca para o texto */
  margin-left: 10px;
  width: 100%; /* Ocupa toda a largura */
`;

// Estilo do botão de enviar
export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 4px;
  margin-top: 20px;
`;

// Estilo do texto do botão de enviar
export const SubmitText = styled.Text`
  color: white;
  font-size: 21px;
  font-weight: bold;
`;

// Estilo do botão de cancelar
export const ButtonCancel = styled.TouchableOpacity`
  margin-left: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  padding-top: 20px;
`;

// Estilo do texto do botão de cancelar
export const ButtonText = styled.Text`
  font-size: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  color: white;
`;

// Estilo do cabeçalho da tela
export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-inline: 10px;
`;

// Estilo da área de entrada
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

// Estilo do campo de entrada de descrição
export const InputDescription = styled.TextInput`
  flex: 1; /* Flexível para preencher o restante do espaço */
  height: 100%;
  font-size: 17px;
  border-radius: 4px;
  color: white;
  padding-left: 10px;
`;

// Estilo da área para valor
export const ViewValue = styled.View`
  margin-top: 10px;
  padding: 18px;
`;

// Estilo do texto do valor
export const TextValue = styled.Text`
  color: white;
  font-size: 18px;
  margin-left: 15px;
`;

// Estilo do container da carteira
export const WalletInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: transparent; /* Cor de fundo clara */
  border-radius: 5px; /* Bordas arredondadas */
  padding-left: 22px;
`;

// Estilo do texto da carteira
export const WalletInputText = styled.Text`
  font-size: 18px;
  color: white; /* Cor do texto */
  margin-left: 10px; /* Espaçamento à esquerda do texto */
`;

export const ViewPicker = styled.View`
  padding-left: 65px;
`;

export const AreaColor = styled.View`
  flex: 1;
  background-color: #1e1e1e;
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 50px;
  border-radius: 18px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;
