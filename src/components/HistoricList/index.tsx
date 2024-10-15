import React from 'react';
import {
  Container,
  IconView,
  Separator,
  Tipo,
  TipoText,
  ValorText,
  ViewDescription,
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
        <Tipo>
          <IconView tipo={data.type}>
            <Icon
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              size={20}
              color="white"
            />
            <TipoText>{data.type}</TipoText>
          </IconView>
        </Tipo>
        <ViewDescription>
          <ValorText>{data.description}</ValorText>
          <ValorText>R$ {data.value}</ValorText>
        </ViewDescription>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default HistoricList;
