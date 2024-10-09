import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, color, size) => {
  let iconName;

  if (route.name === 'Home') {
    iconName = 'home';
  } else if (route.name === 'Registrar') {
    iconName = 'arrow-upward';
  } else if (route.name === 'Profile') {
    iconName = 'person-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => getTabBarIcon(route, color, size), // Usa a função externa para o ícone
        tabBarActiveTintColor: 'tomato', // Cor dos ícones ativos
        tabBarInactiveTintColor: 'gray', // Cor dos ícones inativos
        headerShown: false, // Esconder o cabeçalho se necessário
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Registrar" component={New} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>

    // <AppDrawer.Navigator
    //   drawerContent={props => <CustomDrawer {...props} />}
    //   screenOptions={{
    //     headerShown: false,

    //     drawerStyle: {
    //       backgroundColor: 'white',
    //       paddingTop: 20,
    //     },

    //     drawerActiveBackgroundColor: '#3b3dbf',
    //     drawerActiveTintColor: 'white',

    //     drawerInactiveBackgroundColor: '#f0f2ff',
    //     drawerInactiveTintColor: '#121212',
    //   }}>
    //   <AppDrawer.Screen name="Home" component={Home} />
    //   <AppDrawer.Screen name="Registrar" component={New} />
    //   <AppDrawer.Screen name="Profile" component={Profile} />
    // </AppDrawer.Navigator>
  );
}

export default AppRoutes;
