import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  Header,
  Title,
  List,
  ItemCard,
  ItemDescription,
  ItemMeta,
  ItemValue,
  EmptyContainer,
  EmptyTitle,
  EmptyMessage,
} from './styled';
import { useTheme } from '../../contexts/ThemeContext';
import { useTransactions } from '../../hooks/useTransactions';
import { useWallets } from '../../hooks/useWallets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Transactions() {
  const { colors } = useTheme();
  const { transactions, loading, error } = useTransactions();
  const { wallets } = useWallets();

  const getWalletName = (accountId: string) =>
    wallets.find(w => w.id === accountId)?.name ?? 'Carteira';

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Transações</Title>
        </Header>
        <EmptyContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </EmptyContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Transações</Title>
        </Header>
        <EmptyContainer>
          <EmptyTitle>Erro ao carregar</EmptyTitle>
          <EmptyMessage>{error.message}</EmptyMessage>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Transações</Title>
      </Header>
      <List
        data={transactions}
        keyExtractor={item => item.id}
        contentContainerStyle={
          transactions.length === 0 ? { flex: 1 } : { paddingBottom: 24 }
        }
        ListEmptyComponent={
          <EmptyContainer>
            <Icon name="list" size={56} color={colors.textSecondary} />
            <EmptyTitle>Nenhuma transação</EmptyTitle>
            <EmptyMessage>
              Suas receitas, despesas e transferências aparecem aqui. Use o botão + para adicionar.
            </EmptyMessage>
          </EmptyContainer>
        }
        renderItem={({ item }) => {
          const isTransfer = !!item.targetAccountId;
          const isIncome = item.amount >= 0 && !isTransfer;
          return (
            <ItemCard>
              <ItemDescription>{item.description}</ItemDescription>
              <ItemMeta>
                {format(item.date, "dd MMM yyyy", { locale: ptBR })} · {getWalletName(item.accountId)}
              </ItemMeta>
              <ItemValue
                style={{
                  color: isIncome ? colors.income : colors.expense,
                  marginTop: 4,
                }}>
                {isIncome ? '+' : isTransfer ? '→' : '-'} R${' '}
                {Math.abs(item.amount).toFixed(2).replace('.', ',')}
              </ItemValue>
            </ItemCard>
          );
        }}
      />
    </Container>
  );
}
