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
  font-size: ${props => props.theme?.typography?.sizes?.title ?? 20}px;
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const ButtonMenu = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
