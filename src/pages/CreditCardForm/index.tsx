import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  ViewHeader,
  ButtonCancel,
  Scroll,
  Label,
  Input,
  SubmitButton,
  SubmitText,
} from './styled';
import Header from '../../components/Header';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Back from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { useCreditCards } from '../../hooks/useCreditCards';

type RouteParams = { creditCardId?: string };

export default function CreditCardForm() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const creditCardId = route.params?.creditCardId;
  const { colors } = useTheme();
  const { creditCards, createCreditCard, updateCreditCard } = useCreditCards();

  const [name, setName] = useState('');
  const [closingDayStr, setClosingDayStr] = useState('');
  const [dueDayStr, setDueDayStr] = useState('');
  const [saving, setSaving] = useState(false);

  const card = creditCardId ? creditCards.find(c => c.id === creditCardId) : null;

  useEffect(() => {
    if (card) {
      setName(card.name);
      setClosingDayStr(String(card.closingDay));
      setDueDayStr(String(card.dueDay));
    }
  }, [card]);

  const parseDay = (s: string): number => {
    const n = parseInt(s.replace(/\D/g, ''), 10);
    if (isNaN(n)) return 1;
    if (n < 1) return 1;
    if (n > 31) return 31;
    return n;
  };

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Atenção', 'Informe o nome do cartão.');
      return;
    }
    const closing = parseDay(closingDayStr) || 1;
    const due = parseDay(dueDayStr) || 10;
    setSaving(true);
    try {
      if (creditCardId) {
        await updateCreditCard(creditCardId, { name: trimmed, closingDay: closing, dueDay: due });
      } else {
        await createCreditCard({ name: trimmed, closingDay: closing, dueDay: due });
      }
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <ViewHeader>
        <ButtonCancel onPress={() => navigation.goBack()}>
          <Back name="arrow-back" color={colors.text} size={30} />
        </ButtonCancel>
        <Header titulo={creditCardId ? 'Editar cartão' : 'Novo cartão'} />
      </ViewHeader>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <Scroll showsVerticalScrollIndicator={false}>
          <Label>Nome do cartão</Label>
          <Input
            placeholder="Ex: Nubank, Itaú"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Label>Dia do fechamento (1-31)</Label>
          <Input
            placeholder="Ex: 15"
            placeholderTextColor={colors.textSecondary}
            value={closingDayStr}
            onChangeText={setClosingDayStr}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Label>Dia do vencimento (1-31)</Label>
          <Input
            placeholder="Ex: 22"
            placeholderTextColor={colors.textSecondary}
            value={dueDayStr}
            onChangeText={setDueDayStr}
            keyboardType="number-pad"
            maxLength={2}
          />
          <SubmitButton onPress={handleSubmit} disabled={saving}>
            <SubmitText>{saving ? 'Salvando...' : creditCardId ? 'Salvar' : 'Adicionar cartão'}</SubmitText>
          </SubmitButton>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
