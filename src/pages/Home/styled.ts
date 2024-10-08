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
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  flex-direction: row;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 14px;
  align-items: flex-start;
`;

export const Title = styled.Text`
  margin-left: 4px;
  color: #121212;
  margin-top: 5px;
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 18px;
`;

export const List = styled.FlatList`
  flex: 1;
  background-color: white;
`;
