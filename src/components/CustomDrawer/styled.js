import styled from 'styled-components/native';

export const BottonCustom = styled.TouchableOpacity`
  top: -30px;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: tomato;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  elevation: 5;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
