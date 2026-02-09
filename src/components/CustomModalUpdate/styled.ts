import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colors?.overlay ?? 'rgba(0, 0, 0, 0.5)'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalContainer = styled.View`
  width: 80%;
  padding: 20px;
  background-color: ${props => props.theme?.colors?.surface ?? '#FFFFFF'};
  border-radius: 10px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
  margin-bottom: 15px;
  color: ${props => props.theme?.colors?.text ?? '#333'};
`;

export const Info = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  margin-bottom: 10px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#333'};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  border-color: ${props => props.theme?.colors?.border ?? '#ccc'};
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  margin-right: 5px;
`;

export const ContinueButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  margin-left: 5px;
`;

export const CancelButtonText = styled.Text`
  color: ${props => props.theme?.colors?.textSecondary ?? '#333'};
`;

export const ContinueButtonText = styled.Text`
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFFFFF'};
`;
