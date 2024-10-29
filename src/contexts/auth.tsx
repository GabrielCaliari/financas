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
      const storageUser = await AsyncStorage.getItem('@userData'); // Altera para @userData

      if (storageUser) {
        const userData = JSON.parse(storageUser);
        console.log('Token armazenado:', userData.token); // Verifica se o token é recuperado corretamente
        api.defaults.headers.Authorization = `Bearer ${userData.token}`; // Define o cabeçalho de autorização com o token
        setUser(userData); // Define o usuário no estado
      } else {
        setUser(null); // Se não houver usuário, define como nulo
      }

      setLoadingHome(false); // Finaliza o carregamento
    }
    loadStorage();
  }, []); // Adicione [] para evitar loops infinitos
  async function signUp(email, password, nome) {
    setLoading(true);
    try {
      await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      });
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro ao cadastrar', err.message); // Exibir mensagem de erro
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

      const {id, name, token, avatarUrl} = response.data;

      const userData = {
        id,
        name,
        token,
        email,
        avatarUrl, // Inclui avatarUrl
      };
      await AsyncStorage.setItem('@userData', JSON.stringify(userData)); // Armazena dados completos do usuário
      api.defaults.headers.Authorization = `Bearer ${token}`; // Define o cabeçalho de autorização

      setUser(userData); // Define o usuário no estado
      setLoading(false);
    } catch (err) {
      console.log('Erro ao entrar', err.message); // Exibir mensagem de erro
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
      const response = await api.put(`/users/${user.id}`, {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl, // Inclui o avatarUrl
      });

      // Armazena o usuário atualizado no AsyncStorage
      await AsyncStorage.setItem('@userData', JSON.stringify(response.data)); // Armazena os dados completos do usuário

      // Atualiza o estado local do usuário com os dados atualizados
      setUser({
        ...response.data, // Usar o spread operator para pegar todos os dados
        token: user.token, // Mantém o token anterior
      });
    } catch (error) {
      console.log('Erro ao atualizar usuário:', error.message); // Exibir mensagem de erro
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
