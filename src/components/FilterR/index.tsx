import React from 'react';
import {
  Container,
  IconView,
  TipoText,
  ValorText,
  DescricaoContainer,
  Separator,
  PaymentMethodIconContainer,
} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pix from 'react-native-vector-icons/MaterialIcons';
import {TouchableWithoutFeedback} from 'react-native';

const FilterR = ({data}) => {
  // Transformar o dado único em um array, caso não seja um array
  const dataArray = Array.isArray(data) ? data : [data];

  const despesa = dataArray.filter(item => item.type === 'receita');

  function renderPaymentMethodIcon() {
    if (data.payment_method === 'Dinheiro') {
      return <Icon name="dollar" size={17} color="white" />;
    } else if (
      data.payment_method === 'Crédito' ||
      data.payment_method === 'Débito'
    ) {
      return <Icon name="credit-card" size={17} color="white" />;
    } else if (data.payment_method === 'Pix') {
      return <Pix name="pix" size={17} color="white" />;
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
              <PaymentMethodIconContainer>
                {renderPaymentMethodIcon()}
              </PaymentMethodIconContainer>
              <TipoText>{item.description}</TipoText>
            </DescricaoContainer>

            <ValorText>
              R$ {item.value ? item.value.toFixed(2).replace('.', ',') : '0,00'}
            </ValorText>
          </Container>
        </TouchableWithoutFeedback>
      ))}
    </>
  );
};

export default FilterR;
