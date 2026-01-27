import {useMemo, useState} from 'react';
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
  IconEye,
  ViewSaldo,
  IconView,
  IconViewD,
  IconViewR,
} from './styled';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

interface DataProps {
  saldo: number;
  receita?: number;
  despesa?: number;
  tag: 'saldo' | 'receita' | 'despesa';
  type?: 'receita' | 'despesa';
}

interface BalanceItemProps {
  data: DataProps;
}

export default function BalanceItem({data}: BalanceItemProps) {
  const navigation = useNavigation();
  const [currentSecure, setCurrentSecure] = useState<boolean>(true);

  const labelName = useMemo(() => {
    if (data.tag === 'saldo') {
      return {
        label: 'Saldo Atual',
        color: 'white',
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

  const handleOnPressEye = () => {
    setCurrentSecure(current => !current);
  };

  return (
    <Container>
      <BalanceContainer>
        <BalanceLabel>{labelName.label}</BalanceLabel>
        <ViewSaldo>
          <BalanceAmount style={{color: labelName.color}}>
            {currentSecure
              ? '****'
              : `R$ ${data.saldo.toFixed(2).replace('.', ',')}`}
          </BalanceAmount>
          <IconEye
            onPress={handleOnPressEye}
            name={currentSecure ? 'eye-off' : 'eye'}
            size={25}
            color="white"
          />
        </ViewSaldo>
        <IncomeExpenseContainer>
          <IncomeExpenseItem
            onPress={() => navigation.navigate('BalanceR', {type: 'receita'})}>
            <IconViewR tipo={data.type}>
              <Icon
                name={data.type === 'receita' ? 'arrow-down' : 'arrow-up'}
                size={20}
                color="white"
              />
            </IconViewR>
            <View>
              <LabelText>Receitas</LabelText>
              <AmountText style={{color: '#00b94a'}}>
                R${' '}
                {data.receita
                  ? data.receita.toFixed(2).replace('.', ',')
                  : '0,00'}
              </AmountText>
            </View>
          </IncomeExpenseItem>

          <IncomeExpenseItem
            onPress={() => navigation.navigate('BalanceD', {type: 'despesa'})}>
            <IconViewD tipo={data.type}>
              <Icon
                name={data.type === 'despesa' ? 'arrow-up' : 'arrow-down'}
                size={20}
                color="white"
              />
            </IconViewD>
            <View>
              <LabelText>Despesas</LabelText>
              <AmountText style={{color: '#EF463a'}}>
                R${' '}
                {data.despesa
                  ? data.despesa.toFixed(2).replace('.', ',')
                  : '0,00'}
              </AmountText>
            </View>
          </IncomeExpenseItem>
        </IncomeExpenseContainer>
      </BalanceContainer>
    </Container>
  );
}
