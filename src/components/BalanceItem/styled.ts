import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

export const Label = styled.Text`
  color: white;
  font-size: 19px;
  font-weight: bold;
`;

export const BalanceContainer = styled.View`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export const Balance = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #f0f4ff;
`;

export const BalanceLabel = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const BalanceAmount = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
`;

export const IncomeExpenseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const IncomeExpenseItem = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;

export const AmountText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
`;

export const LabelText = styled.Text`
  font-size: 14px;
  color: #b0b0b0;
  margin-top: 2px;
`;
