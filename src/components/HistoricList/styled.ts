import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f0f3ff;
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 12px;
`;
export const Tipo = styled.View`
  flex-direction: row;
`;

export const TipoText = styled.Text`
  color: white;
  font-size: 16px;
  font-style: italic;
`;

export const IconView = styled.View`
  flex-direction: row;
  background-color: ${props =>
    `${props.tipo === 'despesa' ? 'red' : '#049301'}`};
  padding-bottom: 4px;
  padding-top: 4px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
  margin-bottom: 2%;
`;

export const ValorText = styled.Text`
  color: #121212;
  font-size: 22px;
`;
