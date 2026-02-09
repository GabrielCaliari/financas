import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  UserRow,
  Greeting,
  Scroll,
  Content,
  Card,
  CardTitle,
  CardValue,
  SectionTitle,
  EmptyState,
  EmptyTitle,
  EmptyMessage,
} from './styled';
import { AuthContext } from '../../contexts/auth';
import { useTheme } from '../../contexts/ThemeContext';
import { useWallets } from '../../hooks/useWallets';
import { useTransactions } from '../../hooks/useTransactions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../Home';

/**
 * Dashboard: visão financeira principal.
 * Se o usuário não tem carteiras, mostra a Home legada (movimentos).
 * Se tem carteiras, mostra saldo consolidado e últimas transações.
 */
export default function Dashboard() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const { wallets, loading: loadingWallets } = useWallets();
  const { transactions, loading: loadingTransactions } = useTransactions();

  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const hasWallets = wallets.length > 0;
  const recentTransactions = transactions.slice(0, 10);

  if (!hasWallets && !loadingWallets) {
    return <Home />;
  }

  return (
    <Container>
      <Header>
        <UserRow>
          <Greeting>Olá, {user?.name ?? 'usuário'}</Greeting>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-outline" size={24} color={colors.primaryContrast} />
          </TouchableOpacity>
        </UserRow>
      </Header>

      <Scroll showsVerticalScrollIndicator={false}>
        <Content>
          <Card>
            <CardTitle>Saldo total</CardTitle>
            <CardValue>
              {loadingWallets
                ? '...'
                : `R$ ${totalBalance.toFixed(2).replace('.', ',')}`}
            </CardValue>
          </Card>

          <SectionTitle>Últimas movimentações</SectionTitle>
          {loadingTransactions ? (
            <EmptyState>
              <EmptyMessage>Carregando...</EmptyMessage>
            </EmptyState>
          ) : recentTransactions.length === 0 ? (
            <EmptyState>
              <Icon name="receipt-long" size={48} color={colors.textSecondary} style={{ marginBottom: 12 }} />
              <EmptyTitle>Nenhuma movimentação</EmptyTitle>
              <EmptyMessage>
                Use o botão + para adicionar receita, despesa ou transferência.
              </EmptyMessage>
            </EmptyState>
          ) : (
            recentTransactions.map(t => {
              const isTransfer = !!t.targetAccountId;
              const isIncome = t.amount >= 0 && !isTransfer;
              return (
                <Card key={t.id} style={{ marginBottom: 8 }}>
                  <CardTitle>{t.description}</CardTitle>
                  <CardValue
                    style={{
                      fontSize: 16,
                      color: isIncome ? colors.income : colors.expense,
                    }}>
                    {isIncome ? '+' : isTransfer ? '→' : '-'} R$ {Math.abs(t.amount).toFixed(2).replace('.', ',')}
                  </CardValue>
                </Card>
              );
            })
          )}
        </Content>
      </Scroll>
    </Container>
  );
}
