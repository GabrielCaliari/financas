// Firebase configuration and types - API modular (React Native Firebase v22+)
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  Timestamp,
  type FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {getApp} from '@react-native-firebase/app';
import {getStorage} from '@react-native-firebase/storage';

// Export Firebase instances (modular API)
export const firebaseAuth = auth;
export const db = getFirestore();
export const firebaseStorage = getStorage(getApp());

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

// Novas coleções (modelagem evoluída)
export const walletsCollection = collection(db, 'wallets');
export const categoriesCollection = collection(db, 'categories');
export const transactionsCollection = collection(db, 'transactions');
export const budgetsCollection = collection(db, 'budgets');
export const subscriptionsCollection = collection(db, 'subscriptions');
export const creditCardsCollection = collection(db, 'creditCards');
export const invoicesCollection = collection(db, 'invoices');

// Helper to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: FirebaseTimestamp): Date => {
  return timestamp.toDate();
};

// Helper to convert Date to Firestore timestamp (modular)
export const dateToTimestamp = (date: Date): FirebaseTimestamp => {
  return Timestamp.fromDate(date);
};
