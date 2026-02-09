import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Planning from '../pages/Planning';
import Profile from '../pages/Profile';
import New from '../pages/New';
import NewTwo from '../pages/NewTwo';
import BalanceR from '../pages/BalanceR';
import BalanceD from '../pages/BalanceD';
import UserProfileEdit from '../pages/UserProfileEdit';
import Info from '../pages/Info';
import Wallets from '../pages/Wallets';
import WalletForm from '../pages/WalletForm';
import CreditCards from '../pages/CreditCards';
import CreditCardForm from '../pages/CreditCardForm';
import Categories from '../pages/Categories';
import CategoryForm from '../pages/CategoryForm';
import Transfer from '../pages/Transfer';

import { BottonCustom, ModalContainer, ModalContent } from '../components/CustomDrawer/styled';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function getTabIcon(routeName: string, color: string, size: number) {
  switch (routeName) {
    case 'Dashboard':
      return 'dashboard';
    case 'Transactions':
      return 'list';
    case 'Add':
      return 'add';
    case 'Planning':
      return 'pie-chart';
    case 'Profile':
      return 'person-outline';
    default:
      return 'circle';
  }
}

function AddModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const navigation = useNavigation();
  const { colors, typography } = useAppTheme();

  const closeAndNavigate = (screen: string, params?: object) => {
    onClose();
    navigation.navigate(screen as never, params as never);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Text
            style={{
              fontSize: typography.sizes.title,
              marginBottom: 8,
              color: colors.text,
              fontWeight: typography.weights.semibold,
            }}>
            O que deseja adicionar?
          </Text>
          <Text
            style={{
              fontSize: typography.sizes.sm,
              marginBottom: 24,
              color: colors.textSecondary,
            }}>
            Escolha o tipo de movimentação
          </Text>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, paddingVertical: 12, paddingHorizontal: 4 }}
            activeOpacity={0.7}
            onPress={() => closeAndNavigate('Receita', { type: 'receita' })}>
            <Icon name="add-circle-outline" size={24} color={colors.income} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: typography.sizes.body, color: colors.text, fontWeight: typography.weights.medium }}>
              Receita
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, paddingVertical: 12, paddingHorizontal: 4 }}
            activeOpacity={0.7}
            onPress={() => closeAndNavigate('Despesa', { type: 'despesa' })}>
            <Icon name="remove-circle-outline" size={24} color={colors.expense} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: typography.sizes.body, color: colors.text, fontWeight: typography.weights.medium }}>
              Despesa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, paddingVertical: 12, paddingHorizontal: 4 }}
            activeOpacity={0.7}
            onPress={() => closeAndNavigate('Transfer')}>
            <Icon name="swap-horiz" size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: typography.sizes.body, color: colors.text, fontWeight: typography.weights.medium }}>
              Transferência
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, paddingVertical: 12, paddingHorizontal: 4 }}
            activeOpacity={0.7}
            onPress={() => { onClose(); }}>
            <Icon name="credit-card" size={24} color={colors.textSecondary} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: typography.sizes.body, color: colors.textSecondary, fontWeight: typography.weights.medium }}>
              Cartão de crédito (em breve)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 24, paddingVertical: 8 }} onPress={onClose}>
            <Text style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Cancelar</Text>
          </TouchableOpacity>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}

function Tabs() {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors } = useAppTheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name={getTabIcon(route.name, color, size)} size={size} color={color} />
          ),
          tabBarLabel:
            route.name === 'Dashboard'
              ? 'Início'
              : route.name === 'Transactions'
              ? 'Transações'
              : route.name === 'Add'
              ? ''
              : route.name === 'Planning'
              ? 'Planejamento'
              : 'Perfil',
          tabBarActiveTintColor: colors.tabActive,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: {
            height: 56,
            backgroundColor: colors.tabBar,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 5,
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen
          name="Transactions"
          component={Transactions}
          options={{ tabBarLabel: 'Transações' }}
        />
        <Tab.Screen
          name="Add"
          options={{
            tabBarIcon: () => <Icon name="add" size={32} color={colors.primaryContrast} />,
            tabBarButton: (props) => (
              <BottonCustom {...props} onPress={() => setModalVisible(true)}>
                <Icon name="add" size={32} color={colors.primaryContrast} />
              </BottonCustom>
            ),
            tabBarLabel: '',
          }}>
          {() => null}
        </Tab.Screen>
        <Tab.Screen
          name="Planning"
          component={Planning}
          options={{ tabBarLabel: 'Planejamento' }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ tabBarLabel: 'Perfil' }}
        />
      </Tab.Navigator>
      <AddModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}

function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Receita" component={New} />
      <Stack.Screen name="Despesa" component={NewTwo} />
      <Stack.Screen name="BalanceR" component={BalanceR} />
      <Stack.Screen name="BalanceD" component={BalanceD} />
      <Stack.Screen name="ProfileEdit" component={UserProfileEdit} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Wallets" component={Wallets} />
      <Stack.Screen name="WalletForm" component={WalletForm} />
      <Stack.Screen name="CreditCards" component={CreditCards} />
      <Stack.Screen name="CreditCardForm" component={CreditCardForm} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoryForm" component={CategoryForm} />
      <Stack.Screen name="Transfer" component={Transfer} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
