import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  signInWithEmail,
  signUpWithEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  AuthUser,
} from '../services/authService';
import {updateUserProfile} from '../services/userService';

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

type AuthContextData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  loadingHome: boolean;
  signUp: (email: string, password: string, nome: string) => Promise<boolean>;
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

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged((authUser: AuthUser | null) => {
      if (authUser) {
        setUser({
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          avatarUrl: authUser.avatarUrl,
        });
      } else {
        setUser(null);
      }
      setLoadingHome(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  async function signUp(
    email: string,
    password: string,
    nome: string,
  ): Promise<boolean> {
    try {
      setLoading(true);
      await signUpWithEmail(email, password, nome);
      return true;
    } catch (err: any) {
      let message = 'Ocorreu um erro ao cadastrar. Tente novamente.';

      if (err.code === 'auth/email-already-in-use') {
        message = 'Este email já está em uso.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Email inválido.';
      } else if (err.code === 'auth/weak-password') {
        message = 'A senha deve ter pelo menos 6 caracteres.';
      }

      Alert.alert('Erro ao cadastrar', message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);
      const authUser = await signInWithEmail(email, password);

      setUser({
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        avatarUrl: authUser.avatarUrl,
      });
    } catch (err: any) {
      let message = 'Ocorreu um erro ao entrar. Verifique seus dados.';

      if (err.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado.';
      } else if (err.code === 'auth/wrong-password') {
        message = 'Senha incorreta.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Email inválido.';
      } else if (err.code === 'auth/invalid-credential') {
        message = 'Email ou senha incorretos.';
      }

      Alert.alert('Erro ao entrar', message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut();
      setUser(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  }

  async function updateUser(data: Partial<User>) {
    try {
      if (!user) {
        return;
      }

      await updateUserProfile(user.id, {
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      });

      setUser(prev => (prev ? {...prev, ...data} : null));
    } catch (error: any) {
      let message = 'Ocorreu um erro ao atualizar o usuário.';

      if (error.code === 'auth/requires-recent-login') {
        message = 'Por favor, faça login novamente para atualizar seu perfil.';
      }

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
