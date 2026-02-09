import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  padding-bottom: 80px;
`;

export const Header = styled.View`
  padding: 16px;
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme?.colors?.border ?? 'rgba(255,255,255,0.12)'};
`;

export const Title = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.title ?? 20}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
`;

export const Section = styled.View`
  padding: 16px;
  margin-top: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  margin-bottom: 12px;
`;

export const Card = styled.View`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const CardTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.medium ?? '500'};
`;

export const CardSubtitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  margin-top: 4px;
`;

export const EmptyState = styled.View`
  align-items: center;
  padding: 24px;
`;

export const EmptyText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  text-align: center;
`;
