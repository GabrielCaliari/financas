import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalContainer = styled.View`
  width: 80%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Info = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  color: black;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex: 1;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  margin-right: 5px;
`;

export const ContinueButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #4caf50;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  margin-left: 5px;
`;

export const CancelButtonText = styled.Text`
  color: #333;
`;

export const ContinueButtonText = styled.Text`
  color: white;
`;
