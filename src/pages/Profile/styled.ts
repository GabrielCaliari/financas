import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
  align-items: center;
`;

export const Message = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
  margin-top: 24px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const Name = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.headline ?? 24}px;
  margin-bottom: 24px;
  margin-top: 8px;
  padding: 0 14px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const NewLink = styled.TouchableOpacity`
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  width: 90%;
  height: 45px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const NewText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFFFFF'};
`;

export const LogoutButton = styled.TouchableOpacity`
  justify-content: start;
  width: 90%;
  height: 45px;
  border-radius: 18px;
`;

export const LogoutText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
  padding-left: 10px;
  width: 100%;
  justify-content: space-between;
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
  justify-content: start;
  width: 90%;
  height: 35px;
  border-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
`;

export const EditText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 50px;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

export const UserInfo = styled.View`
  align-items: center;
`;

export const ViewInput = styled.View`
  flex-direction: row;
  padding: 18px 18px 0px 18px;
  align-items: flex-start;
  margin: 0 14px 0 14px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${props => props.theme?.colors?.border ?? 'rgba(255, 255, 255, 0.3)'};
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 14px 0 14px;
`;

export const Area = styled.View`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-radius: 18px;
  padding: 18px;
  align-items: flex-start;
  margin: 18px 18px 0 18px;
`;
