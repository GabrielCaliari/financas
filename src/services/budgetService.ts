import {
  budgetsCollection,
  dateToTimestamp,
  timestampToDate,
} from './firebase';
import { getAuth } from '@react-native-firebase/auth';
import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from '@react-native-firebase/firestore';
import type { Budget } from '../types/entities';
import type { BudgetDocument } from '../types/firestore';

function docToBudget(docId: string, data: BudgetDocument): Budget {
  return {
    id: docId,
    userId: data.userId,
    categoryId: data.categoryId,
    month: data.month,
    limit: data.limit,
    createdAt: timestampToDate(data.createdAt)!,
    updatedAt: timestampToDate(data.updatedAt)!,
  };
}

export interface CreateBudgetInput {
  categoryId: string;
  month: string; // YYYY-MM
  limit: number;
}

export async function createBudget(data: CreateBudgetInput): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData = {
    userId: user.uid,
    categoryId: data.categoryId,
    month: data.month,
    limit: data.limit,
    createdAt: dateToTimestamp(now),
    updatedAt: dateToTimestamp(now),
  };
  const ref = await addDoc(budgetsCollection, docData);
  return ref.id;
}

export async function getBudgetsByUserId(
  userId: string,
  month?: string,
): Promise<Budget[]> {
  let q = query(budgetsCollection, where('userId', '==', userId));
  if (month) {
    q = query(q, where('month', '==', month));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => docToBudget(d.id, d.data() as BudgetDocument));
}

export async function updateBudget(
  budgetId: string,
  limit: number,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await updateDoc(doc(budgetsCollection, budgetId), {
    limit,
    updatedAt: dateToTimestamp(new Date()),
  });
}

export async function deleteBudget(budgetId: string): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteDoc(doc(budgetsCollection, budgetId));
}
