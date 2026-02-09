import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.overlay ?? 'rgba(34, 34, 34, 0.4)'};
`;

export const ModalContent = styled.View`
  flex: 2;
  justify-content: center;
  background-color: ${props => props.theme?.colors?.surface ?? '#FFFFFF'};
  padding: 14px;
`;

export const ButtonFilter = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  height: 45px;
  align-items: center;
  justify-content: center;
`;

export const ButtonFilterText = styled.Text`
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 19}px;
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
`;
