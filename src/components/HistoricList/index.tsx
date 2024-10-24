import React from 'react';
import {
  Container,
  IconView,
  TipoText,
  ValorText,
  DescricaoContainer,
  PaymentMethodIconContainer,
  Separator,
} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableWithoutFeedback, Alert} from 'react-native';
import Pix from 'react-native-vector-icons/MaterialIcons';

const HistoricList = ({data, deleteItem, editItem}) => {
  function handleDeleteItem() {
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja deletar esse registro?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Continuar', onPress: () => deleteItem(data.id)},
      ],
    );
  }

  // Função para determinar o ícone baseado no método de pagamento
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
    <TouchableWithoutFeedback
      onPress={() => editItem(data)} // Ação de editar
      onLongPress={handleDeleteItem} // Ação de excluir ao segurar
      accessible={true}>
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

        <ValorText>
          R$ {data.value?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
        </ValorText>

        <Separator />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HistoricList;
