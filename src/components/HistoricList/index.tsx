import React from 'react';
import {
  Container,
  IconView,
  Tipo,
  TipoText,
  ValorText,
  ViewDescription,
  DescricaoContainer,
} from './styled';
import Icon from 'react-native-vector-icons/Feather';
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

  return (
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <DescricaoContainer>
          <IconView tipo={data.type}>
            <Icon
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              size={20}
              color="white"
            />
          </IconView>
          <TipoText>{data.description}</TipoText>
        </DescricaoContainer>

        {/* Valor alinhado à direita com espaçamento da descrição */}
        <ValorText>R$ {data.value}</ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HistoricList;
