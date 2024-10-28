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

const CustomModal = ({
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
          <Title>Confirmando dados</Title>
          <Info>Tipo: {type}</Info>
          <Info>Valor: R$ {value}</Info>
          <Info>Método de Pagamento: {paymentMethod}</Info>

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

export default CustomModal;
