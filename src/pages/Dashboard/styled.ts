import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
`;

export const Header = styled.View`
  width: 100%;
  min-height: 80px;
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  justify-content: center;
  padding: 16px 24px;
  padding-top: 24px;
  border-radius: 0 0 18px 18px;
`;

export const UserRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Greeting = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.medium ?? '500'};
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;

export const Content = styled.View`
  padding: 16px;
  padding-bottom: 80px;
`;

export const Card = styled.View`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const CardTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  margin-bottom: 4px;
`;

export const CardValue = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.headline ?? 24}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
`;

export const SectionTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
  margin: 16px 0 12px 0;
`;

export const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
`;

export const EmptyTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  margin-bottom: 8px;
  text-align: center;
`;

export const EmptyMessage = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  text-align: center;
`;
