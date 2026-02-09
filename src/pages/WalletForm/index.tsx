import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  ViewHeader,
  ButtonCancel,
  Scroll,
  Label,
  Input,
  TypeRow,
  TypeOption,
  TypeOptionText,
  SubmitButton,
  SubmitText,
} from './styled';
import Header from '../../components/Header';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { useWallets } from '../../hooks/useWallets';
import type { WalletType } from '../../types/entities';

type RouteParams = { walletId?: string };

export default function WalletForm() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const walletId = route.params?.walletId;
  const { colors } = useTheme();
  const { wallets, createWallet, updateWallet } = useWallets();

  const [name, setName] = useState('');
  const [type, setType] = useState<WalletType>('checking');
  const [balanceStr, setBalanceStr] = useState('');
  const [saving, setSaving] = useState(false);

  const wallet = walletId ? wallets.find(w => w.id === walletId) : null;

  useEffect(() => {
    if (wallet) {
      setName(wallet.name);
      setType(wallet.type);
      setBalanceStr(wallet.balance > 0 ? wallet.balance.toFixed(2).replace('.', ',') : '');
    }
  }, [wallet]);

  const parseBalance = (): number => {
    const n = parseFloat(balanceStr.replace(',', '.').replace(/[^\d.,-]/g, ''));
    return isNaN(n) ? 0 : n;
  };

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Atenção', 'Informe o nome da carteira.');
      return;
    }
    setSaving(true);
    try {
      if (walletId) {
        await updateWallet(walletId, {
          name: trimmed,
          type,
          balance: parseBalance(),
        });
      } else {
        await createWallet({
          name: trimmed,
          type,
          balance: parseBalance(),
        });
      }
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const types: { value: WalletType; label: string }[] = [
    { value: 'checking', label: 'Conta corrente' },
    { value: 'savings', label: 'Poupança' },
    { value: 'cash', label: 'Dinheiro' },
  ];

  return (
    <Container>
      <ViewHeader>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </ButtonCancel>
        <Header titulo={walletId ? 'Editar carteira' : 'Nova carteira'} />
      </ViewHeader>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <Scroll showsVerticalScrollIndicator={false}>
          <Label>Nome</Label>
          <Input
            placeholder="Ex: Nubank, Carteira"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Label>Tipo</Label>
          <TypeRow>
            {types.map(t => (
              <TypeOption
                key={t.value}
                selected={type === t.value}
                onPress={() => setType(t.value)}>
                <TypeOptionText selected={type === t.value}>{t.label}</TypeOptionText>
              </TypeOption>
            ))}
          </TypeRow>
          <Label>Saldo inicial (R$)</Label>
          <Input
            placeholder="0,00"
            placeholderTextColor={colors.textSecondary}
            value={balanceStr}
            onChangeText={setBalanceStr}
            keyboardType="decimal-pad"
          />
          <SubmitButton onPress={handleSubmit} disabled={saving}>
            <SubmitText>{saving ? 'Salvando...' : walletId ? 'Salvar' : 'Criar carteira'}</SubmitText>
          </SubmitButton>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
