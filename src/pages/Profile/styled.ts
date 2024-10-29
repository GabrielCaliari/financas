import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  align-items: center;
`;

export const Message = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 24px;
  color: white;
`;

export const Name = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  margin-top: 8px;
  padding: 0 14px;
  color: white;
`;

export const NewLink = styled.TouchableOpacity`
  background-color: #3b3dbf;
  width: 90%;
  height: 45px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const NewText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const LogoutButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 45px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #c62c36;
`;

export const LogoutText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #c62c36;
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
  padding-left: 10px;
  width: 100%; /* Garante que o header ocupe toda a largura */
  justify-content: space-between; /* Ajusta o layout para espaço entre os elementos */
`;

export const ButtonCancel = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 20px;
  align-items: center;
  justify-content: center;
  padding: 9px 0 0 5px;
`;

export const EditButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 45px;
  border-width: 1px;
  border-radius: 8px;
  border-color: #c62c36;
  margin: 10px;
`;

export const EditText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #c62c36;
`;
