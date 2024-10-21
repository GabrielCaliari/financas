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
import Icon from 'react-native-vector-icons/Feather'; // Ícone para seta de movimentação
import {TouchableWithoutFeedback, Alert} from 'react-native';

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
      return <Icon name="dollar-sign" size={15} color="green" />; // Tamanho pequeno
    } else if (data.payment_method === 'cartao') {
      return <Icon name="credit-card" size={15} color="blue" />; // Tamanho pequeno
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

          {/* Descrição ao lado da seta, ícone de pagamento abaixo */}
          <ViewTextAndIcon>
            <TipoText>{data.description}</TipoText>
            <PaymentMethodIconContainer>
              {renderPaymentMethodIcon()}
            </PaymentMethodIconContainer>
          </ViewTextAndIcon>
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
