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
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Title>Confirmação de Exclusão</Title>
          <Info>Você tem certeza que deseja deletar esse registro?</Info>

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
