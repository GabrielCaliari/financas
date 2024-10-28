import React, {useState} from 'react';
import {
  Container,
  IconView,
  TipoText,
  ValorText,
  DescricaoContainer,
  PaymentMethodIconContainer,
} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pix from 'react-native-vector-icons/MaterialIcons';
import {Swipeable} from 'react-native-gesture-handler';
import CustomModalDelete from '../CustomModalDelete';
import {Animated} from 'react-native';

const HistoricList = ({data, deleteItem, editItem}) => {
  const [modalVisible, setModalVisible] = useState(false);

  function handleConfirmDelete() {
    deleteItem(data.id);
    setModalVisible(false);
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
            onPress={() => setModalVisible(true)} // Abre o modal para confirmação de exclusão
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
    <Swipeable friction={2} renderRightActions={renderRightActions}>
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

      {/* Modal de confirmação para exclusão */}
      <CustomModalDelete
        visible={modalVisible}
        title="Confirmação de Exclusão"
        info="Você tem certeza que deseja deletar esse registro?"
        onCancel={() => setModalVisible(false)}
        onContinue={handleConfirmDelete}
      />
    </Swipeable>
  );
};

export default HistoricList;
