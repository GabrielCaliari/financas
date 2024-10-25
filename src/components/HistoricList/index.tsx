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
import {Alert, Animated} from 'react-native';
import Pix from 'react-native-vector-icons/MaterialIcons';
import {Swipeable} from 'react-native-gesture-handler'; // Importando Swipeable

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

  // Função que renderiza os botões de ação ao arrastar para a esquerda
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <>
        <Animated.View
          style={{
            transform: [{scale}],
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            marginVertical: 7,
            borderRadius: 8,
          }}>
          <Icon
            name="trash"
            size={24}
            color="white"
            onPress={handleDeleteItem}
          />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{scale}],
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            marginVertical: 7,
            borderRadius: 8,
          }}>
          <Icon
            name="edit"
            size={24}
            color="white"
            onPress={() => editItem(data)}
          />
        </Animated.View>
      </>
    );
  };

  return (
    <Swipeable
      friction={2} // Controla a resistência ao arrastar
      renderRightActions={renderRightActions} // Renderiza os botões ao arrastar
    >
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
      </Container>
    </Swipeable>
  );
};

export default HistoricList;
