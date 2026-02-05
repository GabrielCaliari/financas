import {
  firebaseAuth,
  db,
  dateToTimestamp,
  User,
} from './firebase';
import {getAuth, onAuthStateChanged as onAuthStateChangedModular} from '@react-native-firebase/auth';
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
  const userCredential = await firebaseAuth().signInWithEmailAndPassword(
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
  // Create user in Firebase Auth
  const userCredential = await firebaseAuth().createUserWithEmailAndPassword(
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

// Sign out
export const signOut = async (): Promise<void> => {
  await firebaseAuth().signOut();
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  const firebaseUser = firebaseAuth().currentUser;
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

// Update password
export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const user = firebaseAuth().currentUser;
  if (!user || !user.email) {
    throw new Error('Usuário não autenticado');
  }

  // Re-authenticate user before changing password
  const credential = firebaseAuth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  await user.reauthenticateWithCredential(credential);

  // Update password
  await user.updatePassword(newPassword);
};
