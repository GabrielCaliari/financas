import React from 'react';
import {
  Container,
  IconView,
  TipoText,
  ValorText,
  DescricaoContainer,
  PaymentMethodIconContainer,
  Separator,
  ViewTextAndIcon,
} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ícone para seta de movimentação
import {TouchableWithoutFeedback, Alert} from 'react-native';
import Pix from 'react-native-vector-icons/MaterialIcons';

const HistoricList = ({data, deleteItem}) => {
  function handleDeleteItem() {
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja deletar esse registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => deleteItem(data.id),
        },
      ],
    );
  }

  // Função para determinar o ícone baseado no método de pagamento
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
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <DescricaoContainer>
          <IconView tipo={data.type}>
            <Icon
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              size={16}
              color="white"
            />
          </IconView>

          <PaymentMethodIconContainer>
            {renderPaymentMethodIcon()}
          </PaymentMethodIconContainer>
          <TipoText>{data.description}</TipoText>
        </DescricaoContainer>

        {/* Exibir o valor da transação */}
        <ValorText>
          R$ {data.value ? data.value.toFixed(2).replace('.', ',') : '0,00'}
        </ValorText>

        {/* Linha separadora */}
        <Separator />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HistoricList;
