import React, {useContext} from 'react';
import {Image, View, Text} from 'react-native';
import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {AuthContext} from '../../contexts/auth';

const CustomDrawer = props => {
  const {user} = useContext(AuthContext);

  return (
    <DrawerContentScrollView>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
        <Image
          source={require('../../assets/Logo.png')}
          style={{width: 90, height: 90}}
          resizeMode="contain"
        />
        <Text style={{fontSize: 18, marginTop: 14}}>Bem vindo</Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 14,
            paddingHorizontal: 20,
          }}>
          {user && user.name}
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
