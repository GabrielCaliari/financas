// Firebase configuration and types
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Export Firebase instances
export const firebaseAuth = auth;
export const db = firestore();
export const firebaseStorage = storage();

// Types
export type FirebaseUser = FirebaseAuthTypes.User;
export type FirebaseTimestamp = FirebaseFirestoreTypes.Timestamp;

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: FirebaseTimestamp;
}

export interface Movement {
  id: string;
  userId: string;
  description: string;
  value: number;
  type: 'receita' | 'despesa';
  payment_method: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';
  date: FirebaseTimestamp;
  createdAt: FirebaseTimestamp;
}

// Collections references
export const usersCollection = db.collection('users');
export const movementsCollection = db.collection('movements');

// Helper to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: FirebaseTimestamp): Date => {
  return timestamp.toDate();
};

// Helper to convert Date to Firestore timestamp
export const dateToTimestamp = (date: Date): FirebaseTimestamp => {
  return firestore.Timestamp.fromDate(date);
};
