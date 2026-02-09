/**
 * Tipos dos documentos como armazenados no Firestore (com Timestamp).
 * Corpo do documento (sem id); id = document id.
 */

import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Timestamp = FirebaseFirestoreTypes.Timestamp;

type WithTimestamp<T> = {
  [K in keyof T]: T[K] extends Date
    ? Timestamp
    : T[K] extends Date | null | undefined
    ? Timestamp | null | undefined
    : T[K];
};

export type {
  FinancialType,
  TransactionStatus,
  WalletType,
  PaymentMethod,
  InvoiceStatus,
  RecurrenceRule,
} from './entities';

import type {
  User,
  Wallet,
  Category,
  Transaction,
  InvoiceItem,
  Budget,
  Subscription,
  CreditCard,
  Invoice,
} from './entities';

export type UserDocument = WithTimestamp<Omit<User, 'id'>>;
export type WalletDocument = WithTimestamp<Omit<Wallet, 'id'>>;
export type CategoryDocument = WithTimestamp<Omit<Category, 'id'>>;
export type TransactionDocument = WithTimestamp<Omit<Transaction, 'id'>>;
export type InvoiceItemDocument = WithTimestamp<Omit<InvoiceItem, 'id'>>;
export type BudgetDocument = WithTimestamp<Omit<Budget, 'id'>>;
export type SubscriptionDocument = WithTimestamp<Omit<Subscription, 'id'>>;
export type CreditCardDocument = WithTimestamp<Omit<CreditCard, 'id'>>;
export type InvoiceDocument = WithTimestamp<Omit<Invoice, 'id'>>;
