import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../contexts/ThemeContext';

import {
  BottonCustom,
  ModalContainer,
  ModalContent,
} from '../components/CustomDrawer/styled';
import NewTwo from '../pages/NewTwo';
import BalanceR from '../pages/BalanceR';
import BalanceD from '../pages/BalanceD';
import UserProfileEdit from '../pages/UserProfileEdit';
import Info from '../pages/Info';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getTabBarIcon = (route, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Profile') {
    iconName = 'person-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const CustomTabButton = ({children, onPress}) => (
  <BottonCustom onPress={onPress} activeOpacity={0.7}>
    {children}
  </BottonCustom>
);

function Tabs() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const {colors, typography} = useTheme();

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => getTabBarIcon(route, color, size),
          tabBarActiveTintColor: colors.tabActive,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: {
            height: 50,
            backgroundColor: colors.tabBar,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 5,
            elevation: 5,
          },
          headerShown: false,
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarItemStyle: {
              marginRight: 30,
            },
          }}
        />

        <Tab.Screen
          name="Add"
          options={{
            tabBarIcon: () => (
              <Icon name="add" size={32} color={colors.primaryContrast} />
            ),
            tabBarButton: props => (
              <CustomTabButton {...props} onPress={() => setModalVisible(true)}>
                <Icon name="add" size={32} color={colors.primaryContrast} />
              </CustomTabButton>
            ),
          }}>
          {() => null}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarItemStyle: {
              marginLeft: 30,
            },
          }}
        />
      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
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
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12,
                paddingVertical: 12,
                paddingHorizontal: 4,
              }}
              activeOpacity={0.7}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Receita', {type: 'receita'});
              }}>
              <Icon
                name="add-circle-outline"
                size={24}
                color={colors.income}
                style={{marginRight: 12}}
              />
              <Text
                style={{
                  fontSize: typography.sizes.body,
                  color: colors.text,
                  fontWeight: typography.weights.medium,
                }}>
                Receita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12,
                paddingVertical: 12,
                paddingHorizontal: 4,
              }}
              activeOpacity={0.7}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Despesa', {type: 'despesa'});
              }}>
              <Icon
                name="remove-circle-outline"
                size={24}
                color={colors.expense}
                style={{marginRight: 12}}
              />
              <Text
                style={{
                  fontSize: typography.sizes.body,
                  color: colors.text,
                  fontWeight: typography.weights.medium,
                }}>
                Despesa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginTop: 24, paddingVertical: 8}}
              onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.textSecondary,
                }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
}

function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Receita" component={New} />
      <Stack.Screen name="Despesa" component={NewTwo} />
      <Stack.Screen name="BalanceR" component={BalanceR} />
      <Stack.Screen name="BalanceD" component={BalanceD} />
      <Stack.Screen name="ProfileEdit" component={UserProfileEdit} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
