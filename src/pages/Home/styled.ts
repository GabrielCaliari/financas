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

export const Header = styled.View`
  width: 100%;
  height: 80px;
  background-color: #1e1e1e;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  margin-top: 10px;
  border-radius: 18px;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 18px;
`;

export const UserInfoDetail = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
