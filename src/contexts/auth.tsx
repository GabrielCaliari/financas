import React, {createContext, useState} from 'react';
import api from '../services/api';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function signUp(email, password, nome) {
    setLoading(true);
    try {
      const response = await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      });
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro ao cadastrar', err);
      setLoading(false);
    }
  }

  async function signIn(email, password) {
    setLoading(true);
    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });

      const {id, name, token} = response.data;

      const data = {
        id,
        name,
        token,
        email,
      };
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });

      setLoading(false);
    } catch (err) {
      console.log('Erro ao entrar', err);
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, signUp, signIn, loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
