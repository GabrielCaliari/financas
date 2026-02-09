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
import { useCategories } from '../../hooks/useCategories';

type RouteParams = { categoryId?: string };

type CategoryType = 'receita' | 'despesa';

export default function CategoryForm() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const categoryId = route.params?.categoryId;
  const { colors } = useTheme();
  const { categories, createCategory, updateCategory } = useCategories();

  const [name, setName] = useState('');
  const [type, setType] = useState<CategoryType>('despesa');
  const [saving, setSaving] = useState(false);

  const category = categoryId ? categories.find(c => c.id === categoryId) : null;

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(category.type);
    }
  }, [category]);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Atenção', 'Informe o nome da categoria.');
      return;
    }
    setSaving(true);
    try {
      if (categoryId) {
        await updateCategory(categoryId, { name: trimmed, type });
      } else {
        await createCategory({ name: trimmed, type });
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
        <Header titulo={categoryId ? 'Editar categoria' : 'Nova categoria'} />
      </ViewHeader>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}>
        <Scroll showsVerticalScrollIndicator={false}>
          <Label>Nome</Label>
          <Input
            placeholder="Ex: Alimentação, Salário"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <Label>Tipo</Label>
          <TypeRow>
            <TypeOption selected={type === 'receita'} onPress={() => setType('receita')}>
              <TypeOptionText selected={type === 'receita'}>Receita</TypeOptionText>
            </TypeOption>
            <TypeOption selected={type === 'despesa'} onPress={() => setType('despesa')}>
              <TypeOptionText selected={type === 'despesa'}>Despesa</TypeOptionText>
            </TypeOption>
          </TypeRow>
          <SubmitButton onPress={handleSubmit} disabled={saving}>
            <SubmitText>{saving ? 'Salvando...' : categoryId ? 'Salvar' : 'Criar categoria'}</SubmitText>
          </SubmitButton>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
