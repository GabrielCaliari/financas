import styled from 'styled-components/native';

export const BottonCustom = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 53%;
  transform: translateX(-37.5px);
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 37.5px;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-offset: 0px 4px;
  shadow-radius: 5px;
  elevation: 5;
  z-index: 10;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colors?.overlay ?? 'rgba(0, 0, 0, 0.5)'};
`;

export const ModalContent = styled.View`
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme?.colors?.surface ?? '#FFFFFF'};
  align-items: center;
`;
