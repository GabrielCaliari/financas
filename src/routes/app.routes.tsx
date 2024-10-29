import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Modal, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  BottonCustom,
  ModalContainer,
  ModalContent,
} from '../components/CustomDrawer/styled';
import NewTwo from '../pages/NewTwo';
import BalanceR from '../pages/BalanceR';
import BalanceD from '../pages/BalanceD';
import UserProfileEdit from '../pages/UserProfileEdit';

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

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => getTabBarIcon(route, color, size),
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 50, // Ajusta altura da tab bar
            backgroundColor: '#121212',
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
              marginRight: 30, // Aumenta o espaço à direita de Home
            },
          }}
        />

        <Tab.Screen
          name="Add"
          options={{
            tabBarIcon: () => <Icon name="add" size={32} color="white" />,
            tabBarButton: props => (
              <CustomTabButton {...props} onPress={() => setModalVisible(true)}>
                <Icon name="add" size={32} color="white" />
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
              marginLeft: 30, // Aumenta o espaço à esquerda de Profile
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
            <Text style={{fontSize: 18, marginBottom: 20}}>Adicionar:</Text>

            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Receita', {type: 'receita'});
              }}>
              <Text style={{fontSize: 16}}>➕ Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Despesa', {type: 'despesa'});
              }}>
              <Text style={{fontSize: 16}}>➖ Despesa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: 'tomato'}}>Cancelar</Text>
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
    </Stack.Navigator>
  );
}

export default AppRoutes;
