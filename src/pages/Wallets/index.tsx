import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
  Container,
  ViewHeader,
  ButtonCancel,
  List,
  WalletCard,
  WalletInfo,
  WalletName,
  WalletMeta,
  WalletBalance,
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
import { useWallets } from '../../hooks/useWallets';
import type { Wallet } from '../../types/entities';

const WALLET_TYPE_LABEL: Record<string, string> = {
  checking: 'Conta corrente',
  savings: 'Poupança',
  cash: 'Dinheiro',
};

export default function Wallets() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { wallets, loading, deleteWallet, refetch } = useWallets();

  const handleDelete = (w: Wallet) => {
    Alert.alert(
      'Excluir carteira',
      `Excluir "${w.name}"? O saldo será perdido.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteWallet(w.id);
            } catch {
              Alert.alert('Erro', 'Não foi possível excluir a carteira.');
            }
          },
        },
      ],
    );
  };

  const handleLongPress = (w: Wallet) => {
    Alert.alert(w.name, 'O que deseja fazer?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Editar', onPress: () => navigation.navigate('WalletForm', { walletId: w.id }) },
      { text: 'Excluir', style: 'destructive', onPress: () => handleDelete(w) },
    ]);
  };

  if (loading) {
    return (
      <Container>
        <ViewHeader>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <Back name="arrow-back" color={colors.text} size={30} />
          </ButtonCancel>
          <Header titulo="Carteiras" />
        </ViewHeader>
        <EmptyContainer>
          <ActivityIndicator size="large" color={colors.primary} />
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
        <Header titulo="Carteiras" />
      </ViewHeader>

      {wallets.length === 0 ? (
        <EmptyContainer>
          <Icon name="account-balance-wallet" size={56} color={colors.textSecondary} />
          <EmptyTitle>Nenhuma carteira</EmptyTitle>
          <EmptyMessage>Adicione uma carteira para organizar seu dinheiro e ver o saldo no Dashboard.</EmptyMessage>
          <AddButton onPress={() => navigation.navigate('WalletForm')} style={{ marginTop: 24 }}>
            <AddButtonText>Adicionar carteira</AddButtonText>
          </AddButton>
        </EmptyContainer>
      ) : (
        <>
          <List
            data={wallets}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <WalletCard
                onPress={() => navigation.navigate('WalletForm', { walletId: item.id })}
                onLongPress={() => handleLongPress(item)}
                activeOpacity={0.7}>
                <WalletInfo>
                  <WalletName>{item.name}</WalletName>
                  <WalletMeta>{WALLET_TYPE_LABEL[item.type] ?? item.type}</WalletMeta>
                </WalletInfo>
                <WalletBalance>
                  R$ {item.balance.toFixed(2).replace('.', ',')}
                </WalletBalance>
              </WalletCard>
            )}
          />
          <AddButton onPress={() => navigation.navigate('WalletForm')}>
            <AddButtonText>+ Adicionar carteira</AddButtonText>
          </AddButton>
        </>
      )}
    </Container>
  );
}
