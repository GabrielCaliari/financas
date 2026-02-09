import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
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
  z-index: 1;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  padding: 16px;
  padding-bottom: 40px;
`;

export const Label = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-radius: 8px;
  padding: 14px 16px;
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  margin-bottom: 16px;
`;

export const WalletOption = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${props =>
    props.selected ? (props.theme?.colors?.primary ?? '#04c200') : (props.theme?.colors?.surface ?? '#1e1e1e')};
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WalletOptionName = styled.Text<{ selected?: boolean }>`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  font-weight: ${props => props.theme?.typography?.weights?.medium ?? '500'};
  color: ${props =>
    props.selected ? (props.theme?.colors?.primaryContrast ?? '#FFF') : (props.theme?.colors?.text ?? '#FFF')};
`;

export const WalletOptionBalance = styled.Text<{ selected?: boolean }>`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props =>
    props.selected ? (props.theme?.colors?.primaryContrast ?? '#FFF') : (props.theme?.colors?.textSecondary ?? '#B0B0B0')};
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 16px;
`;

export const SubmitText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFF'};
`;

export const EmptyMessage = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  text-align: center;
  padding: 24px;
`;
