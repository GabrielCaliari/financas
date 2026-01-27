import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number | string;
  name: string;
  email: string;
  token: string;
  avatarUrl?: string | null;
};

type AuthContextData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  loadingHome: boolean;
  signUp: (email: string, password: string, nome: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingHome, setLoadingHome] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      try {
        const storageUser = await AsyncStorage.getItem('@userData');

        if (storageUser) {
          const userData: User = JSON.parse(storageUser);
          api.defaults.headers.Authorization = `Bearer ${userData.token}`;
          setUser(userData);
        } else {
          setUser(null);
          delete api.defaults.headers.Authorization;
        }
      } catch (error) {
        setUser(null);
        delete api.defaults.headers.Authorization;
      } finally {
        setLoadingHome(false);
      }
    }
    loadStorage();
  }, []); // Adicione [] para evitar loops infinitos

  async function signUp(email: string, password: string, nome: string) {
    try {
      setLoading(true);
      await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      });
      navigation.goBack();
    } catch (err) {
      const message =
        (err as Error)?.message ||
        'Ocorreu um erro ao cadastrar. Tente novamente.';
      Alert.alert('Erro ao cadastrar', message);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);
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
    } catch (err) {
      const message =
        (err as Error)?.message ||
        'Ocorreu um erro ao entrar. Verifique seus dados.';
      Alert.alert('Erro ao entrar', message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@userData');
    delete api.defaults.headers.Authorization;
    setUser(null);
  }

  async function updateUser(data: Partial<User>) {
    try {
      if (!user) {
        return;
      }

      const nextUser: User = {
        ...user,
        ...data,
        token: user.token,
      };

      await AsyncStorage.setItem('@userData', JSON.stringify(nextUser));
      setUser(nextUser);
    } catch (error) {
      const message =
        (error as Error)?.message ||
        'Ocorreu um erro ao atualizar o usuário.';
      Alert.alert('Erro ao atualizar usuário', message);
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
