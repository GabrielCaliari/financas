import {useMemo} from 'react';
import React from 'react';
import {
  Container,
  BalanceContainer,
  BalanceLabel,
  BalanceAmount,
  AmountText,
  IncomeExpenseContainer,
  IncomeExpenseItem,
  LabelText,
} from './styled';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BalanceItem({data}) {
  const labelName = useMemo(() => {
    if (data.tag === 'saldo') {
      return {
        label: 'Saldo Atual',
        color: 'gray',
      };
    } else if (data.tag === 'receita') {
      return {
        label: 'Receitas',
        color: '#00b94a',
      };
    } else {
      return {
        label: 'Despesas',
        color: '#EF463a',
      };
    }
  }, [data]);

  return (
    <Container>
      <BalanceContainer>
        <BalanceLabel>{labelName.label}</BalanceLabel>
        <BalanceAmount style={{color: labelName.color}}>
          {data.saldo}
        </BalanceAmount>
        <Icon name="visibility" size={24} color="#FFF" />
        <IncomeExpenseContainer>
          <IncomeExpenseItem>
            <Icon name="arrow-upward" size={32} color="#00b94a" />
            <AmountText style={{color: '#00b94a'}}>
              {' '}
              R${' '}
              {data.receita
                ? data.receita.toFixed(2).replace('.', ',')
                : '0,00'}
            </AmountText>
            <LabelText>Receitas</LabelText>
          </IncomeExpenseItem>

          <IncomeExpenseItem>
            <Icon name="arrow-downward" size={32} color="#EF463a" />
            <AmountText style={{color: '#EF463a'}}>
              R${' '}
              {data.despesa
                ? data.despesa.toFixed(2).replace('.', ',')
                : '0,00'}
            </AmountText>
            <LabelText>Despesas</LabelText>
          </IncomeExpenseItem>
        </IncomeExpenseContainer>
      </BalanceContainer>
    </Container>
  );
}
