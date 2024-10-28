import React from 'react';
import {Modal} from 'react-native';
import {
  ButtonContainer,
  Info,
  ModalContainer,
  Overlay,
  Title,
  CancelButton,
  CancelButtonText,
  ContinueButton,
  ContinueButtonText,
} from './styled';

const CustomModalDelete = ({
  visible,
  onCancel,
  onContinue,
  type,
  value,
  paymentMethod,
  title,
  info,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Title>{title}</Title>
          <Info>{info}</Info>

          <ButtonContainer>
            <CancelButton onPress={onCancel}>
              <CancelButtonText>Cancelar</CancelButtonText>
            </CancelButton>
            <ContinueButton onPress={onContinue}>
              <ContinueButtonText>Continuar</ContinueButtonText>
            </ContinueButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

export default CustomModalDelete;
