import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import {
  Container,
  ViewHeader,
  ButtonCancel,
  List,
  CategoryCard,
  CategoryName,
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
import { useCategories } from '../../hooks/useCategories';
import type { Category } from '../../types/entities';

const TYPE_LABEL = { receita: 'Receita', despesa: 'Despesa' };

export default function Categories() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { categories, loading, deleteCategory, refetch } = useCategories();

  const handleLongPress = (c: Category) => {
    Alert.alert(c.name, 'O que deseja fazer?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Editar', onPress: () => navigation.navigate('CategoryForm', { categoryId: c.id }) },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteCategory(c.id);
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir a categoria.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <Container>
        <ViewHeader>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <Back name="arrow-back" color={colors.text} size={30} />
          </ButtonCancel>
          <Header titulo="Categorias" />
        </ViewHeader>
        <EmptyContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </EmptyContainer>
      </Container>
    );
  }

  if (categories.length === 0) {
    return (
      <Container>
        <ViewHeader>
          <ButtonCancel onPress={() => navigation.goBack()}>
            <Back name="arrow-back" color={colors.text} size={30} />
          </ButtonCancel>
          <Header titulo="Categorias" />
        </ViewHeader>
        <EmptyContainer>
          <Icon name="category" size={56} color={colors.textSecondary} />
          <EmptyTitle>Nenhuma categoria</EmptyTitle>
          <EmptyMessage>Crie categorias para organizar receitas e despesas.</EmptyMessage>
          <AddButton onPress={() => navigation.navigate('CategoryForm')} style={{ marginTop: 24 }}>
            <AddButtonText>Adicionar categoria</AddButtonText>
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
        <Header titulo="Categorias" />
      </ViewHeader>
      <List
        data={categories}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <CategoryCard
            onPress={() => navigation.navigate('CategoryForm', { categoryId: item.id })}
            onLongPress={() => handleLongPress(item)}
            activeOpacity={0.7}>
            <CategoryName>{item.name}</CategoryName>
            <CategoryName style={{ marginLeft: 8, fontSize: 14, color: colors.textSecondary }}>
              · {TYPE_LABEL[item.type]}
            </CategoryName>
          </CategoryCard>
        )}
      />
      <AddButton onPress={() => navigation.navigate('CategoryForm')}>
        <AddButtonText>+ Adicionar categoria</AddButtonText>
      </AddButton>
    </Container>
  );
}
