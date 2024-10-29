import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingHome, setLoadingHome] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@finToken');

      if (storageUser) {
        const response = await api
          .get('/me', {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          })
          .catch(() => {
            setUser(null);
          });
        api.defaults.headers.Authorization = `Bearer ${storageUser}`;
        setUser(response.data);
        setLoadingHome(false);
      }
      setLoadingHome(false);
    }
    loadStorage();
  });

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
      await AsyncStorage.setItem('@finToken', token);
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

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  async function updateUser(user) {
    try {
      // Faz a chamada para o backend para atualizar os dados do usuário
      const response = await api.put(`/users/${user.id}`, {
        name: user.name,
        email: user.email,
        password: user.password, // Inclua apenas se for atualizar a senha
      });

      // Armazena o usuário atualizado no AsyncStorage
      await AsyncStorage.setItem('@userData', JSON.stringify(response.data));

      // Atualiza o estado local do usuário com os dados atualizados
      setUser({
        id: response.data.id, // Certifique-se de incluir o ID atualizado, se necessário
        name: response.data.name,
        email: response.data.email,
        token: response.data.token || user.token, // Mantenha o token anterior se não estiver retornando um novo
      });
    } catch (error) {
      console.log('Erro ao atualizar usuário:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loading,
        loadingHome,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
