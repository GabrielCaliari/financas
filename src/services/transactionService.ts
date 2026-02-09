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
import type { Transaction } from '../types/entities';
import type { TransactionDocument } from '../types/firestore';
import { calculateAccountBalance } from '../engine/balanceEngine';
import * as walletService from './walletService';

/** Documento no Firestore pode ser novo (accountId, amount, financialType, status) ou legado (walletId, value, type) */
type TransactionDoc = TransactionDocument & {
  walletId?: string;
  value?: number;
  type?: string;
};

function docToTransaction(docId: string, data: TransactionDoc): Transaction {
  const date = timestampToDate(data.date)!;
  const createdAt = timestampToDate(data.createdAt)!;
  const updatedAt = data.updatedAt ? timestampToDate(data.updatedAt)! : createdAt;

  if (data.financialType != null && data.status != null && data.amount != null && data.accountId != null) {
    return {
      id: docId,
      userId: data.userId,
      description: data.description ?? '',
      amount: data.amount,
      date,
      categoryId: data.categoryId ?? null,
      accountId: data.accountId,
      financialType: data.financialType,
      status: data.status,
      createdAt,
      updatedAt,
      parentTransactionId: data.parentTransactionId ?? null,
      invoiceId: data.invoiceId ?? null,
      recurrenceId: data.recurrenceId ?? null,
      targetAccountId: data.targetAccountId ?? null,
    };
  }

  const accountId = (data.accountId ?? data.walletId) ?? '';
  const value = data.value ?? 0;
  const type = data.type ?? 'despesa';
  const amount = type === 'receita' ? value : -(value || 0);
  if (data.targetWalletId != null || (data as { targetAccountId?: string }).targetAccountId != null) {
    const targetId = (data as { targetAccountId?: string }).targetAccountId ?? data.targetWalletId;
    return {
      id: docId,
      userId: data.userId,
      description: data.description ?? '',
      amount: -Math.abs(value),
      date,
      categoryId: data.categoryId ?? null,
      accountId,
      financialType: 'cash',
      status: 'posted',
      createdAt,
      updatedAt,
      parentTransactionId: null,
      invoiceId: data.invoiceId ?? null,
      recurrenceId: null,
      targetAccountId: targetId ?? null,
    };
  }
  return {
    id: docId,
    userId: data.userId,
    description: data.description ?? '',
    amount,
    date,
    categoryId: data.categoryId ?? null,
    accountId,
    financialType: 'cash',
    status: 'posted',
    createdAt,
    updatedAt,
    parentTransactionId: null,
    invoiceId: null,
    recurrenceId: null,
    targetAccountId: null,
  };
}

export interface CreateTransactionInput {
  accountId: string;
  amount: number;
  description: string;
  date: Date;
  categoryId?: string | null;
  financialType?: Transaction['financialType'];
  status?: Transaction['status'];
  targetAccountId?: string | null;
  parentTransactionId?: string | null;
  invoiceId?: string | null;
  recurrenceId?: string | null;
}

export async function createTransaction(
  data: CreateTransactionInput,
): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const financialType = data.financialType ?? 'cash';
  const status = data.status ?? 'posted';

  const docData: Record<string, unknown> = {
    userId: user.uid,
    accountId: data.accountId,
    amount: data.amount,
    description: data.description,
    date: dateToTimestamp(data.date),
    categoryId: data.categoryId ?? null,
    financialType,
    status,
    createdAt: dateToTimestamp(now),
    updatedAt: dateToTimestamp(now),
    parentTransactionId: data.parentTransactionId ?? null,
    invoiceId: data.invoiceId ?? null,
    recurrenceId: data.recurrenceId ?? null,
    targetAccountId: data.targetAccountId ?? null,
  };

  const ref = await addDoc(transactionsCollection, docData);

  if (financialType === 'cash' && status === 'posted') {
    await recomputeAndUpdateBalances(user.uid, [
      data.accountId,
      ...(data.targetAccountId ? [data.targetAccountId] : []),
    ]);
  }
  return ref.id;
}

export interface TransactionFilters {
  accountId?: string;
  financialType?: Transaction['financialType'];
  categoryId?: string;
  startDate?: Date;
  endDate?: Date;
}

function buildBaseQuery(
  userId: string,
  filters?: TransactionFilters,
  accountField?: 'accountId' | 'walletId',
  accountValue?: string,
) {
  let q = query(
    transactionsCollection,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
  );
  if (accountField && accountValue) {
    q = query(q, where(accountField, '==', accountValue));
  }
  if (filters?.financialType) {
    q = query(q, where('financialType', '==', filters.financialType));
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
  return q;
}

export async function getTransactionsByUserId(
  userId: string,
  filters?: TransactionFilters,
): Promise<Transaction[]> {
  const accountId = filters?.accountId;
  let list: Transaction[];

  if (accountId) {
    const [snapNew, snapLegacy] = await Promise.all([
      getDocs(buildBaseQuery(userId, filters, 'accountId', accountId)),
      getDocs(buildBaseQuery(userId, filters, 'walletId', accountId)),
    ]);
    const byId = new Map<string, Transaction>();
    for (const d of snapNew.docs) {
      const t = docToTransaction(d.id, d.data() as TransactionDoc);
      byId.set(t.id, t);
    }
    for (const d of snapLegacy.docs) {
      if (!byId.has(d.id)) {
        byId.set(d.id, docToTransaction(d.id, d.data() as TransactionDoc));
      }
    }
    list = Array.from(byId.values());
  } else {
    const snapshot = await getDocs(buildBaseQuery(userId, filters));
    list = snapshot.docs.map(d =>
      docToTransaction(d.id, d.data() as TransactionDoc),
    );
  }
  list.sort((a, b) => b.date.getTime() - a.date.getTime());
  return list;
}

async function recomputeAndUpdateBalances(
  userId: string,
  accountIds: string[],
): Promise<void> {
  const [transactions, wallets] = await Promise.all([
    getTransactionsByUserId(userId),
    walletService.getWalletsByUserId(userId),
  ]);
  const toUpdate = accountIds.length ? accountIds : wallets.map(w => w.id);
  for (const accountId of toUpdate) {
    const balance = calculateAccountBalance(accountId, transactions);
    await walletService.updateWalletBalance(accountId, balance);
  }
}

export async function getTransactionsByDateRange(
  userId: string,
  startDate: Date,
  endDate: Date,
  accountId?: string,
): Promise<Transaction[]> {
  return getTransactionsByUserId(userId, {
    startDate,
    endDate,
    accountId,
  });
}

export async function getTransactionById(
  transactionId: string,
): Promise<Transaction | null> {
  const user = getAuth().currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(transactionsCollection, transactionId));
  if (!snap.exists()) return null;
  const data = snap.data() as TransactionDoc;
  if (data.userId !== user.uid) return null;
  return docToTransaction(snap.id, data);
}

export interface UpdateTransactionInput {
  accountId?: string;
  amount?: number;
  description?: string;
  categoryId?: string | null;
  date?: Date;
  targetAccountId?: string | null;
}

export async function updateTransaction(
  transactionId: string,
  data: UpdateTransactionInput,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const current = await getTransactionById(transactionId);
  if (!current) return;

  const updates: Record<string, unknown> = {
    updatedAt: dateToTimestamp(new Date()),
  };
  if (data.accountId != null) updates.accountId = data.accountId;
  if (data.amount != null) updates.amount = data.amount;
  if (data.description != null) updates.description = data.description;
  if (data.categoryId !== undefined) updates.categoryId = data.categoryId;
  if (data.date != null) updates.date = dateToTimestamp(data.date);
  if (data.targetAccountId !== undefined)
    updates.targetAccountId = data.targetAccountId;

  if (Object.keys(updates).length <= 1) return;
  await updateDoc(doc(transactionsCollection, transactionId), updates);

  const affected = [current.accountId, current.targetAccountId].filter(Boolean);
  if (data.accountId) affected.push(data.accountId);
  if (data.targetAccountId) affected.push(data.targetAccountId);
  await recomputeAndUpdateBalances(user.uid, [...new Set(affected)]);
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const current = await getTransactionById(transactionId);
  if (!current) return;

  await deleteDoc(doc(transactionsCollection, transactionId));

  const affected = [current.accountId, current.targetAccountId].filter(Boolean);
  await recomputeAndUpdateBalances(user.uid, affected);
}
