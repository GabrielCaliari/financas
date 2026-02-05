import {db, User} from './firebase';
import {getAuth, updateProfile, updateEmail} from '@react-native-firebase/auth';
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
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  await updateDoc(doc(db, 'users', userId), data);

  if (data.name) {
    await updateProfile(user, {displayName: data.name});
  }

  if (data.email && data.email !== user.email) {
    await updateEmail(user, data.email);
  }
};

// Get current user ID
export const getCurrentUserId = (): string | null => {
  const user = getAuth().currentUser;
  return user ? user.uid : null;
};
