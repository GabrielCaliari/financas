import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  padding-top: 10px;
`;

export const IconView = styled.View`
  background-color: ${props => (props.tipo === 'despesa' ? 'red' : '#049301')};
  padding: 5px;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-right: 10px; /* Deixa espaço entre o ícone e a descrição */
`;

export const ViewTextAndIcon = styled.View`
  flex-direction: column; /* Descrição e ícone de pagamento na vertical */
`;

export const TipoText = styled.Text`
  color: white;
  font-size: 16px;
  line-height: 22px;
`;

export const ValorText = styled.Text`
  color: white;
  font-size: 18px;
`;

export const DescricaoContainer = styled.View`
  flex-direction: row; /* Alinha a seta e a descrição lado a lado */
  align-items: center;
`;

export const PaymentMethodIconContainer = styled.View`
  margin-top: 2px; /* Pequeno espaço entre a descrição e o ícone de pagamento */
  align-self: center; /* Alinha o ícone à esquerda */
  justify-content: center;
  margin-right: 5px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;
