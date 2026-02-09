import {
  transactionsCollection,
  dateToTimestamp,
  timestampToDate,
} from './firebase';
import { getAuth } from '@react-native-firebase/auth';
import {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from '@react-native-firebase/firestore';
import type {
  Transaction,
  TransactionType,
  PaymentMethod,
  RecurrenceRule,
} from '../types/entities';
import type { TransactionDocument } from '../types/firestore';

function docToTransaction(
  docId: string,
  data: TransactionDocument,
): Transaction {
  return {
    id: docId,
    userId: data.userId,
    walletId: data.walletId,
    type: data.type as TransactionType,
    value: data.value,
    description: data.description,
    categoryId: data.categoryId ?? null,
    paymentMethod: (data.paymentMethod as PaymentMethod | null) ?? null,
    date: timestampToDate(data.date)!,
    createdAt: timestampToDate(data.createdAt)!,
    targetWalletId: data.targetWalletId ?? null,
    creditCardId: data.creditCardId ?? null,
    invoiceId: data.invoiceId ?? null,
    installmentGroupId: data.installmentGroupId ?? null,
    installmentNumber: data.installmentNumber,
    installmentTotal: data.installmentTotal,
    recurrenceRule: (data.recurrenceRule as RecurrenceRule | null) ?? null,
    recurrenceEndDate: data.recurrenceEndDate
      ? timestampToDate(data.recurrenceEndDate) ?? null
      : null,
    recurrenceParentId: data.recurrenceParentId ?? null,
  };
}

export interface CreateTransactionInput {
  walletId: string;
  type: TransactionType;
  value: number;
  description: string;
  categoryId?: string | null;
  paymentMethod?: PaymentMethod | null;
  date: Date;
  targetWalletId?: string | null;
  creditCardId?: string | null;
  invoiceId?: string | null;
  installmentGroupId?: string | null;
  installmentNumber?: number;
  installmentTotal?: number;
  recurrenceRule?: RecurrenceRule | null;
  recurrenceEndDate?: Date | null;
}

export async function createTransaction(
  data: CreateTransactionInput,
): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData: Record<string, unknown> = {
    userId: user.uid,
    walletId: data.walletId,
    type: data.type,
    value: data.value,
    description: data.description,
    categoryId: data.categoryId ?? null,
    paymentMethod: data.paymentMethod ?? null,
    date: dateToTimestamp(data.date),
    createdAt: dateToTimestamp(now),
  };
  if (data.targetWalletId != null) docData.targetWalletId = data.targetWalletId;
  if (data.creditCardId != null) docData.creditCardId = data.creditCardId;
  if (data.invoiceId != null) docData.invoiceId = data.invoiceId;
  if (data.installmentGroupId != null)
    docData.installmentGroupId = data.installmentGroupId;
  if (data.installmentNumber != null)
    docData.installmentNumber = data.installmentNumber;
  if (data.installmentTotal != null)
    docData.installmentTotal = data.installmentTotal;
  if (data.recurrenceRule != null) docData.recurrenceRule = data.recurrenceRule;
  if (data.recurrenceEndDate != null)
    docData.recurrenceEndDate = dateToTimestamp(data.recurrenceEndDate);

  const ref = await addDoc(transactionsCollection, docData);
  return ref.id;
}

export interface TransactionFilters {
  walletId?: string;
  type?: TransactionType;
  categoryId?: string;
  startDate?: Date;
  endDate?: Date;
}

export async function getTransactionsByUserId(
  userId: string,
  filters?: TransactionFilters,
): Promise<Transaction[]> {
  let q = query(
    transactionsCollection,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
  );
  if (filters?.walletId) {
    q = query(q, where('walletId', '==', filters.walletId));
  }
  if (filters?.type) {
    q = query(q, where('type', '==', filters.type));
  }
  if (filters?.categoryId) {
    q = query(q, where('categoryId', '==', filters.categoryId));
  }
  if (filters?.startDate) {
    q = query(q, where('date', '>=', dateToTimestamp(filters.startDate)));
  }
  if (filters?.endDate) {
    q = query(q, where('date', '<=', dateToTimestamp(filters.endDate)));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d =>
    docToTransaction(d.id, d.data() as TransactionDocument),
  );
}

export async function getTransactionsByDateRange(
  userId: string,
  startDate: Date,
  endDate: Date,
  walletId?: string,
): Promise<Transaction[]> {
  return getTransactionsByUserId(userId, {
    startDate,
    endDate,
    walletId,
  });
}

export async function getTransactionById(
  transactionId: string,
): Promise<Transaction | null> {
  const user = getAuth().currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(transactionsCollection, transactionId));
  if (!snap.exists()) return null;
  const data = snap.data() as TransactionDocument;
  if (data.userId !== user.uid) return null;
  return docToTransaction(snap.id, data);
}

export interface UpdateTransactionInput {
  walletId?: string;
  type?: TransactionType;
  value?: number;
  description?: string;
  categoryId?: string | null;
  paymentMethod?: PaymentMethod | null;
  date?: Date;
  targetWalletId?: string | null;
}

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionInput,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const updates: Record<string, unknown> = {};
  if (data.walletId != null) updates.walletId = data.walletId;
  if (data.type != null) updates.type = data.type;
  if (data.value != null) updates.value = data.value;
  if (data.description != null) updates.description = data.description;
  if (data.categoryId !== undefined) updates.categoryId = data.categoryId;
  if (data.paymentMethod !== undefined)
    updates.paymentMethod = data.paymentMethod;
  if (data.date != null) updates.date = dateToTimestamp(data.date);
  if (data.targetWalletId !== undefined)
    updates.targetWalletId = data.targetWalletId;

  if (Object.keys(updates).length === 0) return;
  await updateDoc(doc(transactionsCollection, transactionId), updates);
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteDoc(doc(transactionsCollection, transactionId));
}
