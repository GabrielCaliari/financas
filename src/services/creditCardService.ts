import {
  creditCardsCollection,
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
} from '@react-native-firebase/firestore';
import type { CreditCard } from '../types/entities';
import type { CreditCardDocument } from '../types/firestore';

function docToCreditCard(
  docId: string,
  data: CreditCardDocument,
): CreditCard {
  return {
    id: docId,
    userId: data.userId,
    name: data.name,
    closingDay: data.closingDay,
    dueDay: data.dueDay,
    createdAt: timestampToDate(data.createdAt)!,
    updatedAt: timestampToDate(data.updatedAt)!,
  };
}

export interface CreateCreditCardInput {
  name: string;
  closingDay: number;
  dueDay: number;
}

export async function createCreditCard(
  data: CreateCreditCardInput,
): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData = {
    userId: user.uid,
    name: data.name,
    closingDay: data.closingDay,
    dueDay: data.dueDay,
    createdAt: dateToTimestamp(now),
    updatedAt: dateToTimestamp(now),
  };
  const ref = await addDoc(creditCardsCollection, docData);
  return ref.id;
}

export async function getCreditCardsByUserId(
  userId: string,
): Promise<CreditCard[]> {
  const q = query(
    creditCardsCollection,
    where('userId', '==', userId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d =>
    docToCreditCard(d.id, d.data() as CreditCardDocument),
  );
}

export async function getCreditCardById(
  creditCardId: string,
): Promise<CreditCard | null> {
  const user = getAuth().currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(creditCardsCollection, creditCardId));
  if (!snap.exists()) return null;
  const data = snap.data() as CreditCardDocument;
  if (data.userId !== user.uid) return null;
  return docToCreditCard(snap.id, data);
}

export interface UpdateCreditCardInput {
  name?: string;
  closingDay?: number;
  dueDay?: number;
}

export async function updateCreditCard(
  creditCardId: string,
  data: UpdateCreditCardInput,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const updates: Record<string, unknown> = {
    updatedAt: dateToTimestamp(new Date()),
  };
  if (data.name != null) updates.name = data.name;
  if (data.closingDay != null) updates.closingDay = data.closingDay;
  if (data.dueDay != null) updates.dueDay = data.dueDay;
  await updateDoc(doc(creditCardsCollection, creditCardId), updates);
}

export async function deleteCreditCard(
  creditCardId: string,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteDoc(doc(creditCardsCollection, creditCardId));
}
