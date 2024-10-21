import React from 'react';
import {
  Container,
  IconView,
  TipoText,
  ValorText,
  DescricaoContainer,
  Separator,
} from './styled';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableWithoutFeedback} from 'react-native';
import {
  ViewTextAndIcon,
  PaymentMethodIconContainer,
} from '../HistoricList/styled';

const FilterD = ({data}) => {
  // Transformar o dado único em um array, caso não seja um array
  const dataArray = Array.isArray(data) ? data : [data];

  const despesa = dataArray.filter(item => item.type === 'despesa');

  function renderPaymentMethodIcon() {
    if (data.payment_method === 'dinheiro') {
      return <Icon name="dollar-sign" size={15} color="green" />; // Tamanho pequeno
    } else if (data.payment_method === 'cartao') {
      return <Icon name="credit-card" size={15} color="blue" />; // Tamanho pequeno
    }
    return null;
  }

  return (
    <>
      {despesa.map(item => (
        <TouchableWithoutFeedback key={item.id}>
          <Container>
            <DescricaoContainer>
              <IconView tipo={item.type}>
                <Icon
                  name={item.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
                  size={16}
                  color="white"
                />
              </IconView>
              <ViewTextAndIcon>
                <TipoText>{item.description}</TipoText>
                <PaymentMethodIconContainer>
                  {renderPaymentMethodIcon()}
                </PaymentMethodIconContainer>
              </ViewTextAndIcon>
            </DescricaoContainer>

            <ValorText>
              R$ {item.value ? item.value.toFixed(2).replace('.', ',') : '0,00'}
            </ValorText>

            <Separator />
          </Container>
        </TouchableWithoutFeedback>
      ))}
    </>
  );
};

export default FilterD;
