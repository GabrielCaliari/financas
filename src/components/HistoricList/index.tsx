import React from 'react';
import {Container, IconView, Tipo, TipoText, ValorText} from './styled';
import Icon from 'react-native-vector-icons/Feather';

const HistoricList = ({data}) => {
  return (
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

      <ValorText>{data.value}</ValorText>
    </Container>
  );
};

export default HistoricList;
