import styled from 'styled-components/native';

export const BottonCustom = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px; /* Ajuste para ficar próximo da tab bar */
  left: 53%;
  transform: translateX(-37.5px); /* Centraliza o botão */
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 37.5px;
  background-color: #6200ea;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-offset: 0px 4px;
  shadow-radius: 5px;
  elevation: 5;
  z-index: 10; /* Garante que fique acima dos ícones */
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
`;
