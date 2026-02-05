// Firebase configuration and types - API modular (React Native Firebase v22+)
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  Timestamp,
  type FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Export Firebase instances
export const firebaseAuth = auth;
export const db = getFirestore();
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

// Collection references (modular)
export const usersCollection = collection(db, 'users');
export const movementsCollection = collection(db, 'movements');

// Helper to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: FirebaseTimestamp): Date => {
  return timestamp.toDate();
};

// Helper to convert Date to Firestore timestamp (modular)
export const dateToTimestamp = (date: Date): FirebaseTimestamp => {
  return Timestamp.fromDate(date);
};
