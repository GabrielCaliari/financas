import Feather from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme?.colors?.background ?? '#121212'};
  padding-top: 20px;
`;

export const Label = styled.Text`
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
  font-size: ${props => props.theme?.typography?.sizes?.lg ?? 19}px;
  font-weight: ${props => props.theme?.typography?.weights?.bold ?? '700'};
`;

export const BalanceContainer = styled.View`
  background-color: ${props => props.theme?.colors?.surface ?? '#1e1e1e'};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  align-items: center;
  height: 250px;
  width: 396px;
`;

export const Balance = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: ${props => props.theme?.colors?.text ?? '#f0f4ff'};
`;

export const BalanceLabel = styled.Text`
  font-size: 18px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const BalanceAmount = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.primary ?? '#04c200'};
  text-align: center;
  margin-bottom: 10px;
  padding-top: 5px;
`;

export const IncomeExpenseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  padding-left: 25px;
`;

export const IncomeExpenseItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

export const AmountText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  color: ${props => props.theme?.colors?.text ?? '#FFFFFF'};
`;

export const LabelText = styled.Text`
  font-size: 14px;
  color: ${props => props.theme?.colors?.textSecondary ?? '#b0b0b0'};
  margin-top: 2px;
`;

export const IconEye = styled(Feather)`
  margin-left: 5px;
`;

export const ViewSaldo = styled.View`
  align-items: center;
`;

export const IconViewD = styled.View`
  background-color: ${props => props.theme?.colors?.expense ?? '#C62828'};
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
`;

export const IconViewR = styled.View`
  background-color: ${props => props.theme?.colors?.income ?? '#049301'};
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
