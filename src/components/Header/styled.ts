import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  margin-left: 60px;
  margin-bottom: 15px;
  width: 100%;
  max-height: 60px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: white;
`;

export const ButtonMenu = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
