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

export const List = styled.FlatList`
  flex: 1;
  padding: 16px;
`;

export const CategoryCard = styled.TouchableOpacity`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
`;

export const CategoryName = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  font-weight: ${props => props.theme?.typography?.weights?.medium ?? '500'};
  color: ${props => props.theme?.colors?.text ?? '#FFF'};
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`;

export const AddButtonText = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  color: ${props => props.theme?.colors?.primaryContrast ?? '#FFF'};
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
