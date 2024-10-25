import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #121212;
`;

export const ListBalance = styled.FlatList`
  max-height: 300px;
`;

export const Area = styled.View`
  margin-top: 22px;
  background-color: #1e1e1e;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  flex-direction: row;
  padding: 18px;
  align-items: flex-start;
  margin: 0 14px 0 14px;
`;

export const Title = styled.Text`
  margin-left: 4px;
  color: white;
  margin-top: 5px;
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 18px;
`;

export const List = styled.FlatList`
  flex: 1;
  background-color: #1e1e1e;
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 50px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 95%;
  align-self: center;
`;
