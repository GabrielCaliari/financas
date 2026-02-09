import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  ViewHeader,
  ButtonCancel,
  Scroll,
  Label,
  Input,
  WalletOption,
  WalletOptionName,
  WalletOptionBalance,
  SubmitButton,
  SubmitText,
  EmptyMessage,
} from './styled';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { useWallets } from '../../hooks/useWallets';
import { useToast } from '../../contexts/ToastContext';
import * as transactionService from '../../services/transactionService';
import * as walletService from '../../services/walletService';

const formatCurrency = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, '');
  if (onlyNums === '') return '';
  const n = parseFloat(onlyNums) / 100;
  return `R$ ${n.toFixed(2).replace('.', ',')}`;
};

export default function Transfer() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const toast = useToast();
  const { wallets, refetch: refetchWallets } = useWallets();

  const [sourceWalletId, setSourceWalletId] = useState<string | null>(null);
  const [targetWalletId, setTargetWalletId] = useState<string | null>(null);
  const [valueStr, setValueStr] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const numericValue = valueStr ? parseFloat(valueStr.replace(/[^0-9]/g, '')) / 100 : 0;
  const displayValue = valueStr ? formatCurrency(valueStr) : '';

  const handleValueChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setValueStr(numeric);
  };

  const handleSubmit = async () => {
    if (!sourceWalletId || !targetWalletId) {
      Alert.alert('Atenção', 'Selecione a carteira de origem e a de destino.');
      return;
    }
    if (sourceWalletId === targetWalletId) {
      Alert.alert('Atenção', 'Origem e destino devem ser carteiras diferentes.');
      return;
    }
    if (numericValue <= 0) {
      Alert.alert('Atenção', 'Informe um valor maior que zero.');
      return;
    }

    const sourceWallet = wallets.find(w => w.id === sourceWalletId);
    const targetWallet = wallets.find(w => w.id === targetWalletId);
    if (!sourceWallet || !targetWallet) return;
    if (sourceWallet.balance < numericValue) {
      Alert.alert('Saldo insuficiente', `A carteira "${sourceWallet.name}" tem R$ ${sourceWallet.balance.toFixed(2).replace('.', ',')}.`);
      return;
    }

    setSaving(true);
    try {
      await transactionService.createTransaction({
        walletId: sourceWalletId,
        type: 'transferencia',
        value: numericValue,
        description: description.trim() || `Transferência para ${targetWallet.name}`,
        date: new Date(),
        targetWalletId,
      });

      await walletService.updateWalletBalance(sourceWalletId, sourceWallet.balance - numericValue);
      await walletService.updateWalletBalance(targetWalletId, targetWallet.balance + numericValue);

      refetchWallets();
      toast.show('Transferência realizada');
      navigation.navigate('Dashboard' as never);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível realizar a transferência. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (wallets.length < 2) {
    return (
      <Container>
        <ViewHeader>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <Back name="arrow-back" color={colors.text} size={30} />
          </ButtonCancel>
          <Header titulo="Transferência" />
        </ViewHeader>
        <EmptyMessage>
          Você precisa de pelo menos duas carteiras para transferir. Crie uma em Perfil → Carteiras.
        </EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <ViewHeader>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </ButtonCancel>
        <Header titulo="Transferência" />
      </ViewHeader>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <Scroll showsVerticalScrollIndicator={false}>
          <Label>De (carteira de origem)</Label>
          {wallets.map(w => (
            <WalletOption
              key={w.id}
              selected={sourceWalletId === w.id}
              onPress={() => setSourceWalletId(w.id)}>
              <WalletOptionName selected={sourceWalletId === w.id}>{w.name}</WalletOptionName>
              <WalletOptionBalance selected={sourceWalletId === w.id}>
                R$ {w.balance.toFixed(2).replace('.', ',')}
              </WalletOptionBalance>
            </WalletOption>
          ))}

          <Label style={{ marginTop: 8 }}>Para (carteira de destino)</Label>
          {wallets.map(w => (
            <WalletOption
              key={w.id}
              selected={targetWalletId === w.id}
              onPress={() => setTargetWalletId(w.id)}>
              <WalletOptionName selected={targetWalletId === w.id}>{w.name}</WalletOptionName>
              <WalletOptionBalance selected={targetWalletId === w.id}>
                R$ {w.balance.toFixed(2).replace('.', ',')}
              </WalletOptionBalance>
            </WalletOption>
          ))}

          <Label style={{ marginTop: 8 }}>Valor (R$)</Label>
          <Input
            placeholder="0,00"
            placeholderTextColor={colors.textSecondary}
            value={displayValue}
            onChangeText={handleValueChange}
            keyboardType="numeric"
          />

          <Label>Descrição (opcional)</Label>
          <Input
            placeholder="Ex: Transferência mensal"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
          />

          <SubmitButton onPress={handleSubmit} disabled={saving}>
            <SubmitText>{saving ? 'Transferindo...' : 'Transferir'}</SubmitText>
          </SubmitButton>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
