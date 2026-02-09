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
  padding-top: 10px;
`;
export const Tipo = styled.View`
  flex-direction: row;
`;

export const TipoText = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.body ?? 16}px;
  margin-left: 10px;
  line-height: 22px;
`;

export const IconView = styled.View`
  flex-direction: row;
  background-color: ${props =>
    props.tipo === 'despesa'
      ? (props.theme?.colors?.expense ?? 'red')
      : (props.theme?.colors?.income ?? '#049301')};
  padding: 5px; /* Reduz o preenchimento interno para diminuir o tamanho do fundo */
  border-radius: 50px; /* Mantém o formato redondo */
  width: 30px; /* Ajuste o tamanho para ser proporcional ao ícone */
  height: 30px;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  margin-bottom: 2%;
`;

export const ValorText = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
  margin-left: 20px;
`;

export const ViewDescription = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme?.colors?.border ?? '#FFFFFF'};
`;

export const DescricaoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${props => props.theme?.colors?.border ?? 'rgba(255, 255, 255, 0.3)'};
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const List = styled.FlatList`
  flex: 1;
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 70px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
`;

export const ViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-inline: 10px;
`;

export const ButtonCancel = styled.TouchableOpacity`
  margin-left: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 25px;
  padding-top: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  padding-left: 10px;
`;
export const Area = styled.View`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  flex-direction: row;
  padding: 18px;
  align-items: flex-start;
  margin: 18px 18px 0 18px;
`;

export const Title = styled.Text`
  margin-left: 4px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  margin-top: 5px;
  margin-bottom: 14px;
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 18}px;
`;
