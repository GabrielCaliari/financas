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
              size={16}
              color="white"
            />
          </IconView>
          <TipoText>{data.description}</TipoText>
        </DescricaoContainer>

        <ValorText>
          R$ {data.value ? data.value.toFixed(2).replace('.', ',') : '0,00'}
        </ValorText>

        {/* Linha separadora abaixo do conteúdo */}
        <Separator />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HistoricList;
