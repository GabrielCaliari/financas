import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin-horizontal: 10px;
  margin-bottom: 5px;
  padding: 10px;
`;

export const IconView = styled.View`
  background-color: ${props =>
    props.tipo === 'despesa'
      ? (props.theme?.colors?.expense ?? 'red')
      : (props.theme?.colors?.income ?? '#049301')};
  padding: 5px;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const ViewTextAndIcon = styled.View``;

export const TipoText = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  line-height: 22px;
`;

export const ValorText = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
`;

export const DescricaoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const PaymentMethodIconContainer = styled.View`
  margin-top: 2px;
  align-self: center;
  justify-content: center;
  margin-right: 5px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${props => props.theme?.colors?.border ?? 'rgba(255, 255, 255, 0.3)'};
  width: 100%;
  margin-top: 5px;
`;
