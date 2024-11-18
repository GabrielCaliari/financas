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
  color: white;
  align-items: center;
  justify-content: center;
  margin: 18px 18px 5px 18px;
`;

export const TextContainer = styled.View`
  flex: 1;
  background-color: #04c200;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px; /* Ajuste para posicionar o botão no final */
`;

export const Text = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  margin: 10px 0 0 0;
`;

export const Button = styled.TouchableOpacity`
  background-color: white;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 60%;
  border-radius: 100px;
  padding: 12px 0; /* Aumentando o padding para garantir a altura mínima de 48dp */
  position: absolute;
  bottom: 30px; /* Posição ajustada para o botão dentro da caixa verde */
  height: 48px; /* Garantindo a altura mínima de 48dp */
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 18px;
`;
