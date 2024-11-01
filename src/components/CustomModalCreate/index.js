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

const CustomModalCreate = ({
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
            <ContinueButton onPress={onContinue}>
              <ContinueButtonText>Continuar</ContinueButtonText>
            </ContinueButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

export default CustomModalCreate;
