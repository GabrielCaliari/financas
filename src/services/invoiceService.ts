import {
  invoicesCollection,
  dateToTimestamp,
  timestampToDate,
} from './firebase';
import { getAuth } from '@react-native-firebase/auth';
import {
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from '@react-native-firebase/firestore';
import type { Invoice, InvoiceStatus } from '../types/entities';
import type { InvoiceDocument } from '../types/firestore';

function docToInvoice(docId: string, data: InvoiceDocument): Invoice {
  return {
    id: docId,
    userId: data.userId,
    creditCardId: data.creditCardId,
    month: data.month,
    total: data.total,
    status: data.status as InvoiceStatus,
    dueDate: timestampToDate(data.dueDate)!,
    paidAt: data.paidAt ? timestampToDate(data.paidAt) ?? null : null,
    createdAt: timestampToDate(data.createdAt)!,
    updatedAt: timestampToDate(data.updatedAt)!,
  };
}

export interface CreateInvoiceInput {
  creditCardId: string;
  month: string; // YYYY-MM
  total: number;
  dueDate: Date;
}

export async function createInvoice(
  data: CreateInvoiceInput,
): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData = {
    userId: user.uid,
    creditCardId: data.creditCardId,
    month: data.month,
    total: data.total,
    status: 'open' as const,
    dueDate: dateToTimestamp(data.dueDate),
    paidAt: null,
    createdAt: dateToTimestamp(now),
    updatedAt: dateToTimestamp(now),
  };
  const ref = await addDoc(invoicesCollection, docData);
  return ref.id;
}

export async function getInvoicesByUserId(
  userId: string,
  creditCardId?: string,
  month?: string,
): Promise<Invoice[]> {
  let q = query(invoicesCollection, where('userId', '==', userId));
  if (creditCardId) {
    q = query(q, where('creditCardId', '==', creditCardId));
  }
  if (month) {
    q = query(q, where('month', '==', month));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d =>
    docToInvoice(d.id, d.data() as InvoiceDocument),
  );
}

export async function getInvoicesByCreditCard(
  creditCardId: string,
): Promise<Invoice[]> {
  const user = getAuth().currentUser;
  if (!user) return [];
  return getInvoicesByUserId(user.uid, creditCardId);
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus,
  paidAt?: Date | null,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const updates: Record<string, unknown> = {
    status,
    updatedAt: dateToTimestamp(new Date()),
  };
  if (status === 'paid' && paidAt != null) {
    updates.paidAt = dateToTimestamp(paidAt);
  } else if (status !== 'paid') {
    updates.paidAt = null;
  }
  await updateDoc(doc(invoicesCollection, invoiceId), updates);
}
