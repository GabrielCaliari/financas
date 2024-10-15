import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between; /* Mantém a descrição e o valor separados */
  align-items: center; /* Alinha verticalmente ao centro */
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
`;
export const Tipo = styled.View`
  flex-direction: row;
`;

export const TipoText = styled.Text`
  color: white;
  font-size: 16px;
  font-style: italic;
  margin-left: 10px; /* Adiciona um pequeno espaçamento entre o ícone e a descrição */
  line-height: 22px; /* Ajusta a altura da linha para melhor alinhamento */
`;

export const IconView = styled.View`
  flex-direction: row;
  background-color: ${props => (props.tipo === 'despesa' ? 'red' : '#049301')};
  padding: 10px; /* Tamanho do preenchimento interno */
  border-radius: 50px; /* Torna o elemento redondo */
  width: 40px; /* Define a largura e altura iguais */
  height: 40px;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  margin-bottom: 2%;
`;

export const ValorText = styled.Text`
  color: white;
  font-size: 22px;
  margin-left: 20px; /* Adiciona espaçamento entre a descrição e o valor */
`;

export const ViewDescription = styled.View`
  flex-direction: row;
  justify-content: space-between; /* Distribui o espaço entre os elementos */
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: white;
`;

export const DescricaoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
