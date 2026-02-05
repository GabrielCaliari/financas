import {db, firebaseAuth, User} from './firebase';
import {getDoc, updateDoc, doc} from '@react-native-firebase/firestore';

export interface UserUpdateData {
  name?: string;
  email?: string;
  avatarUrl?: string | null;
}

// Get user data from Firestore
export const getUserData = async (userId: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', userId));

  if (!userDoc.exists) {
    return null;
  }

  return {
    id: userId,
    ...userDoc.data(),
  } as User;
};

// Update user profile in Firestore
export const updateUserProfile = async (
  userId: string,
  data: UserUpdateData,
): Promise<void> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Update Firestore document
  await updateDoc(doc(db, 'users', userId), data);

  // Update Firebase Auth profile if name changed
  if (data.name) {
    await user.updateProfile({
      displayName: data.name,
    });
  }

  // Update email in Firebase Auth if changed
  if (data.email && data.email !== user.email) {
    await user.updateEmail(data.email);
  }
};

// Get current user ID
export const getCurrentUserId = (): string | null => {
  const user = firebaseAuth().currentUser;
  return user ? user.uid : null;
};
