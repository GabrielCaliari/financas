/**
 * Tipos dos documentos como armazenados no Firestore (com Timestamp).
 * Use estes tipos ao ler/escrever nas coleções.
 * Converta para as entidades de domínio (Date) na camada de serviço.
 */

import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type Timestamp = FirebaseFirestoreTypes.Timestamp;

/** Substitui Date por Timestamp em T */
type WithTimestamp<T> = {
  [K in keyof T]: T[K] extends Date
    ? Timestamp
    : T[K] extends Date | null | undefined
    ? Timestamp | null | undefined
    : T[K];
};

// Re-export dos enums (não mudam)
export type {
  TransactionType,
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
  Budget,
  Subscription,
  CreditCard,
  Invoice,
} from './entities';

/**
 * Corpo do documento no Firestore (sem id; o id é o document id).
 * Use: doc.data() as WalletDocument; entity = { id: doc.id, ...data } + conversão Timestamp -> Date.
 */

export type UserDocument = WithTimestamp<Omit<User, 'id'>>;
export type WalletDocument = WithTimestamp<Omit<Wallet, 'id'>>;
export type CategoryDocument = WithTimestamp<Omit<Category, 'id'>>;
export type TransactionDocument = WithTimestamp<Omit<Transaction, 'id'>>;
export type BudgetDocument = WithTimestamp<Omit<Budget, 'id'>>;
export type SubscriptionDocument = WithTimestamp<Omit<Subscription, 'id'>>;
export type CreditCardDocument = WithTimestamp<Omit<CreditCard, 'id'>>;
export type InvoiceDocument = WithTimestamp<Omit<Invoice, 'id'>>;
