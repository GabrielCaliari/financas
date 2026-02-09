import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
`;

export const InputValue = styled.TextInput`
  background-color: transparent;
  font-size: 30px;
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  margin-left: 10px;
  width: 100%;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  border-radius: 4px;
  margin-top: 20px;
`;

export const SubmitText = styled.Text`
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFFFFF'};
  font-size: 21px;
  font-weight: bold;
`;

export const ButtonCancel = styled.TouchableOpacity`
  margin-left: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  padding-top: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-inline: 10px;
`;

export const ViewInput = styled.View`
  height: 50px;
  width: 90%;
  background-color: transparent;
  font-size: 17px;
  padding: 0 8px;
  margin-bottom: 14px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const InputDescription = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 17px;
  border-radius: 4px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  padding-left: 10px;
`;

export const ViewValue = styled.View`
  margin-top: 10px;
  padding: 18px;
`;

export const TextValue = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  margin-left: 15px;
`;

export const WalletInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border-radius: 5px;
  padding-left: 22px;
`;

export const WalletInputText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  margin-left: 10px;
`;

export const ViewPicker = styled.View`
  padding-left: 65px;
`;

export const AreaColor = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 50px;
  border-radius: 18px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${props => props.theme?.colors?.border ?? 'rgba(255, 255, 255, 0.3)'};
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const PaymentOption = styled.View`
  padding: 10px;
  margin-bottom: 5px;
  align-items: center;
  width: 140px;
  border-radius: 5px;
  height: 40px;
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
`;

export const SelectedPaymentOption = styled(PaymentOption)`
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
`;

export const PaymentText = styled.Text`
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
`;

export const ViweFlat = styled.View`
  padding-left: 15px;
`;
