import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin-horizontal: 10px;
  margin-bottom: 5px; /* Reduzido para padronizar */
  padding: 10px;
`;

export const IconView = styled.View`
  background-color: ${props => (props.tipo === 'despesa' ? 'red' : '#049301')};
  padding: 5px;
  border-radius: 50px;
  width: 35px; /* Aumentar para maior consistência */
  height: 35px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const ViewTextAndIcon = styled.View``;

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
  flex: 1; /* Garante que este container ocupe o espaço necessário */
  flex-direction: row;
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
  margin-top: 5px; /* Pequeno espaço superior para distanciar do conteúdo */
`;
