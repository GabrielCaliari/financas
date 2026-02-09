import React from 'react';
import { Alert } from 'react-native';
import {
  Container,
  ViewHeader,
  ButtonCancel,
  List,
  CardItem,
  CardName,
  CardMeta,
  AddButton,
  AddButtonText,
  EmptyContainer,
  EmptyTitle,
  EmptyMessage,
} from './styled';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCreditCards } from '../../hooks/useCreditCards';

export default function CreditCards() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { creditCards, deleteCreditCard } = useCreditCards();

  const handleLongPress = (id: string, name: string) => {
    Alert.alert(name, 'O que deseja fazer?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Editar', onPress: () => navigation.navigate('CreditCardForm', { creditCardId: id }) },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCreditCard(id);
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir o cartão.');
          }
        },
      },
    ]);
  };

  if (creditCards.length === 0) {
    return (
      <Container>
        <ViewHeader>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <Back name="arrow-back" color={colors.text} size={30} />
          </ButtonCancel>
          <Header titulo="Cartões" />
        </ViewHeader>
        <EmptyContainer>
          <Icon name="credit-card" size={56} color={colors.textSecondary} />
          <EmptyTitle>Nenhum cartão</EmptyTitle>
          <EmptyMessage>Adicione um cartão para acompanhar faturas e vencimentos.</EmptyMessage>
          <AddButton onPress={() => navigation.navigate('CreditCardForm')} style={{ marginTop: 24 }}>
            <AddButtonText>Adicionar cartão</AddButtonText>
          </AddButton>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ViewHeader>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </ButtonCancel>
        <Header titulo="Cartões" />
      </ViewHeader>
      <List
        data={creditCards}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <CardItem
            onPress={() => navigation.navigate('CreditCardForm', { creditCardId: item.id })}
            onLongPress={() => handleLongPress(item.id, item.name)}
            activeOpacity={0.7}>
            <CardName>{item.name}</CardName>
            <CardMeta>Fecha dia {item.closingDay} · Vence dia {item.dueDay}</CardMeta>
          </CardItem>
        )}
      />
      <AddButton onPress={() => navigation.navigate('CreditCardForm')}>
        <AddButtonText>+ Adicionar cartão</AddButtonText>
      </AddButton>
    </Container>
  );
}
