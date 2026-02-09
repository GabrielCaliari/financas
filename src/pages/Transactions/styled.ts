import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
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

export const List = styled.FlatList`
  flex: 1;
  padding: 8px;
  padding-bottom: 80px;
`;

export const ItemCard = styled.View`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 8px;
`;

export const ItemDescription = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.medium ?? '500'};
`;

export const ItemMeta = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  margin-top: 4px;
`;

export const ItemValue = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const EmptyTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  margin-top: 16px;
  text-align: center;
`;

export const EmptyMessage = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.sm ?? 14}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  margin-top: 8px;
  text-align: center;
`;
