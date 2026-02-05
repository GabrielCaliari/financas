import {db, dateToTimestamp, User} from './firebase';
import {
  getAuth,
  onAuthStateChanged as onAuthStateChangedModular,
  signInWithEmailAndPassword as signInWithEmailAndPasswordModular,
  createUserWithEmailAndPassword as createUserWithEmailAndPasswordModular,
  signOut as signOutModular,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as updatePasswordModular,
} from '@react-native-firebase/auth';
import {getDoc, setDoc, doc} from '@react-native-firebase/firestore';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string,
): Promise<AuthUser> => {
  const userCredential = await signInWithEmailAndPasswordModular(
    getAuth(),
    email,
    password,
  );
  const uid = userCredential.user.uid;

  // Get user data from Firestore (modular API)
  const userDoc = await getDoc(doc(db, 'users', uid));

  if (!userDoc.exists) {
    throw new Error('Usuário não encontrado no banco de dados');
  }

  const userData = userDoc.data() as User;

  return {
    id: uid,
    name: userData.name,
    email: userData.email,
    avatarUrl: userData.avatarUrl,
  };
};

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string,
): Promise<AuthUser> => {
  // Create user in Firebase Auth (modular API)
  const userCredential = await createUserWithEmailAndPasswordModular(
    getAuth(),
    email,
    password,
  );
  const uid = userCredential.user.uid;

  // Create user document in Firestore
  const userData: Omit<User, 'id'> = {
    name,
    email,
    avatarUrl: null,
    createdAt: dateToTimestamp(new Date()),
  };

  await setDoc(doc(db, 'users', uid), userData);

  return {
    id: uid,
    name,
    email,
    avatarUrl: null,
  };
};

// Sign out (modular API)
export const signOut = async (): Promise<void> => {
  await signOutModular(getAuth());
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  const firebaseUser = getAuth().currentUser;
  if (!firebaseUser) {
    return null;
  }

  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    avatarUrl: firebaseUser.photoURL,
  };
};

// Listen to auth state changes (modular API - React Native Firebase v22+)
export const onAuthStateChanged = (
  callback: (user: AuthUser | null) => void,
) => {
  return onAuthStateChangedModular(getAuth(), async firebaseUser => {
    if (firebaseUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists) {
          const userData = userDoc.data() as User;
          callback({
            id: firebaseUser.uid,
            name: userData.name,
            email: userData.email,
            avatarUrl: userData.avatarUrl,
          });
        } else {
          callback(null);
        }
      } catch (error) {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// Update password (modular API)
export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const user = getAuth().currentUser;
  if (!user || !user.email) {
    throw new Error('Usuário não autenticado');
  }

  const credential = EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  await reauthenticateWithCredential(user, credential);
  await updatePasswordModular(user, newPassword);
};
