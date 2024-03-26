import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home';
import New from '../pages/New';
import Profile from '../pages/Profile';
import CustomDrawer from '../components/CustomDrawer';

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: 'white',
          paddingTop: 20,
        },

        drawerActiveBackgroundColor: '#3b3dbf',
        drawerActiveTintColor: 'white',

        drawerInactiveBackgroundColor: '#f0f2ff',
        drawerInactiveTintColor: '#121212',
      }}>
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Registrar" component={New} />
      <AppDrawer.Screen name="Profile" component={Profile} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
