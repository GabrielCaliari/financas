import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Modal, Text, TouchableOpacity} from 'react-native';
import {
  BottonCustom,
  ModalContainer,
  ModalContent,
} from '../components/CustomDrawer/styled';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Função para obter ícones da barra de navegação inferior
const getTabBarIcon = (route, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Profile') {
    iconName = 'person-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

// Botão customizado central
const CustomTabButton = ({children, onPress}) => (
  <BottonCustom onPress={onPress}>{children}</BottonCustom>
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
          headerShown: false, // Esconder o cabeçalho
        })}>
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen
          name="Add"
          options={{
            tabBarIcon: () => <Icon name="add" size={32} color="black" />,
            tabBarButton: props => (
              <BottonCustom {...props} onPress={() => setModalVisible(true)}>
                <Icon name="add" size={32} color="black" />
              </BottonCustom>
            ),
          }}>
          {() => null}
        </Tab.Screen>

        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      {/* Modal para adicionar Receita/Despesa */}
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
                // Navegar para a tela de Receita
                navigation.navigate('Registrar', {type: 'receita'});
              }}>
              <Text style={{fontSize: 16}}>➕ Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginVertical: 10}}
              onPress={() => {
                setModalVisible(false);
                // Navegar para a tela de Despesa
                navigation.navigate('Registrar', {type: 'despesa'});
              }}>
              <Text style={{fontSize: 16}}>➖ Despesa</Text>
            </TouchableOpacity>

            {/* Botão de Cancelar */}
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

// Função principal que combina o Tab.Navigator e Stack.Navigator
function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* `Tabs` contém a barra de navegação inferior */}
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* A tela `Registrar` é acessível pelo Stack Navigator */}
      <Stack.Screen name="Registrar" component={New} />
    </Stack.Navigator>
  );
}

export default AppRoutes;
