import React from 'react';
import {Modal} from 'react-native';
import {
  ButtonContainer,
  Info,
  ModalContainer,
  Overlay,
  Title,
  ContinueButton,
  ContinueButtonText,
} from './styled';

const CustomModalUpdate = ({visible, title, info, onCancel, onContinue}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}>
      <Overlay>
        <ModalContainer>
          <Title>{title}</Title>
          <Info>{info}</Info>
          <ButtonContainer>
            <ContinueButton onPress={onContinue}>
              <ContinueButtonText>Continuar</ContinueButtonText>
            </ContinueButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

export default CustomModalUpdate;
