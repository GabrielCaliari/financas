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

const FilterD = ({data}) => {
  // Transformar o dado único em um array, caso não seja um array
  const dataArray = Array.isArray(data) ? data : [data];

  const despesa = dataArray.filter(item => item.type === 'despesa');

  function renderPaymentMethodIcon() {
    if (data.payment_method === 'dinheiro') {
      return <Icon name="dollar" size={17} color="white" />; // Tamanho pequeno
    } else if (data.payment_method === 'Cartao de credito') {
      return <Icon name="credit-card" size={17} color="white" />; // Tamanho pequeno
    } else if (data.payment_method === 'Cartao de debito') {
      return <Icon name="credit-card" size={17} color="white" />; // Tamanho pequeno
    } else if (data.payment_method === 'Pix') {
      return <Pix name="pix" size={17} color="white" />; // Tamanho pequeno
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

            <Separator />
          </Container>
        </TouchableWithoutFeedback>
      ))}
    </>
  );
};

export default FilterD;
