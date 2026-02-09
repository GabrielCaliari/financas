import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
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

export const AreaColor = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  margin: 50px 14px 50px 14px;
  border-radius: 18px;
  align-items: center;
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

export const Title = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  margin: 18px 18px 25px 18px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  border-radius: 18px;
  margin: 20px 0 20px 0;
`;

export const SubmitText = styled.Text`
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFFFFF'};
  font-size: 21px;
  font-weight: bold;
`;

export const TextDescription = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  top: 5px;
`;

export const ViewDescription = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: 14px;
`;

export const ErrorTextWrapper = styled.Text`
  color: ${props => props.theme?.colors?.error ?? '#E53935'};
  font-size: 12px;
  position: absolute;
  bottom: -8px;
  left: 14px;
  width: 100%;
  text-align: left;
`;

export const IconEye = styled(Feather)`
  position: absolute;
  right: 14px;
  top: 23px;
`;
