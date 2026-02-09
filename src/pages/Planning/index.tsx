import React from 'react';
import {
  Container,
  Scroll,
  Header,
  Title,
  Section,
  SectionTitle,
  Card,
  CardTitle,
  CardSubtitle,
  EmptyState,
  EmptyText,
} from './styled';
import { useTheme } from '../../contexts/ThemeContext';
import { useBudgets } from '../../hooks/useBudgets';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useCreditCards } from '../../hooks/useCreditCards';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Planning() {
  const { colors } = useTheme();
  const { budgets, loading: loadingBudgets } = useBudgets();
  const { subscriptions } = useSubscriptions(true);
  const { creditCards } = useCreditCards();

  const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <Container>
      <Header>
        <Title>Planejamento</Title>
      </Header>
      <Scroll showsVerticalScrollIndicator={false}>
        <Section>
          <SectionTitle>Orçamentos por categoria</SectionTitle>
          {loadingBudgets ? (
            <EmptyState>
              <EmptyText>Carregando...</EmptyText>
            </EmptyState>
          ) : budgets.filter(b => b.month === currentMonth).length === 0 ? (
            <EmptyState>
              <Icon name="pie-chart" size={40} color={colors.textSecondary} style={{ marginBottom: 8 }} />
              <EmptyText>Defina limites por categoria para controlar gastos no mês.</EmptyText>
            </EmptyState>
          ) : (
            budgets
              .filter(b => b.month === currentMonth)
              .map(b => (
                <Card key={b.id}>
                  <CardTitle>Limite: R$ {b.limit.toFixed(2).replace('.', ',')}</CardTitle>
                  <CardSubtitle>Categoria · {b.month}</CardSubtitle>
                </Card>
              ))
          )}
        </Section>

        <Section>
          <SectionTitle>Assinaturas</SectionTitle>
          {subscriptions.length === 0 ? (
            <EmptyState>
              <Icon name="repeat" size={40} color={colors.textSecondary} style={{ marginBottom: 8 }} />
              <EmptyText>Gastos recorrentes aparecem aqui.</EmptyText>
            </EmptyState>
          ) : (
            subscriptions.map(s => (
              <Card key={s.id}>
                <CardTitle>{s.description}</CardTitle>
                <CardSubtitle>
                  R$ {s.value.toFixed(2).replace('.', ',')} · dia {s.dayOfMonth}
                </CardSubtitle>
              </Card>
            ))
          )}
        </Section>

        <Section>
          <SectionTitle>Cartões e faturas</SectionTitle>
          {creditCards.length === 0 ? (
            <EmptyState>
              <Icon name="credit-card" size={40} color={colors.textSecondary} style={{ marginBottom: 8 }} />
              <EmptyText>Cadastre cartões para acompanhar faturas e vencimentos.</EmptyText>
            </EmptyState>
          ) : (
            creditCards.map(c => (
              <Card key={c.id}>
                <CardTitle>{c.name}</CardTitle>
                <CardSubtitle>
                  Fecha dia {c.closingDay} · Vence dia {c.dueDay}
                </CardSubtitle>
              </Card>
            ))
          )}
        </Section>
      </Scroll>
    </Container>
  );
}
