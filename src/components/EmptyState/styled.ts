import styled from 'styled-components/native';

export const EmptyTitle = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.title ?? 18}px;
  font-weight: ${props => props.theme?.typography?.weights?.semibold ?? '600'};
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  text-align: center;
  margin-bottom: 8px;
`;

export const EmptyMessage = styled.Text`
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#B0B0B0'};
  text-align: center;
  line-height: 22px;
`;
