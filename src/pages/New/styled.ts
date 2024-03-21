import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #f0f4ff;
`;

export const Input = styled.TextInput`
  height: 50px;
  width: 90%;
  background-color: white;
  font-size: 17px;
  padding: 0 8px;
  margin-bottom: 14px;
  border-radius: 4px;
`;
export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: green;
  border-radius: 4px;
`;
export const SubmitText = styled.Text`
  color: white;
  font-size: 21px;
  font-weight: bold;
`;
