import React, {useContext} from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {AuthContext} from '../contexts/auth';
import {ActivityIndicator, View} from 'react-native';

const Routes = () => {
  const {signed, loadingHome} = useContext(AuthContext);

  if (loadingHome) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
