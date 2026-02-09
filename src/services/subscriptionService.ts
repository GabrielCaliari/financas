import {
  subscriptionsCollection,
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
import type { Subscription } from '../types/entities';
import type { SubscriptionDocument } from '../types/firestore';

function docToSubscription(
  docId: string,
  data: SubscriptionDocument,
): Subscription {
  return {
    id: docId,
    userId: data.userId,
    description: data.description,
    value: data.value,
    dayOfMonth: data.dayOfMonth,
    categoryId: data.categoryId ?? null,
    isActive: data.isActive,
    createdAt: timestampToDate(data.createdAt)!,
    updatedAt: timestampToDate(data.updatedAt)!,
    nextOccurrenceDate: data.nextOccurrenceDate
      ? timestampToDate(data.nextOccurrenceDate) ?? null
      : null,
  };
}

export interface CreateSubscriptionInput {
  description: string;
  value: number;
  dayOfMonth: number;
  categoryId?: string | null;
  nextOccurrenceDate?: Date | null;
}

export async function createSubscription(
  data: CreateSubscriptionInput,
): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData: Record<string, unknown> = {
    userId: user.uid,
    description: data.description,
    value: data.value,
    dayOfMonth: data.dayOfMonth,
    categoryId: data.categoryId ?? null,
    isActive: true,
    createdAt: dateToTimestamp(now),
    updatedAt: dateToTimestamp(now),
  };
  if (data.nextOccurrenceDate != null) {
    docData.nextOccurrenceDate = dateToTimestamp(data.nextOccurrenceDate);
  }
  const ref = await addDoc(subscriptionsCollection, docData);
  return ref.id;
}

export async function getSubscriptionsByUserId(
  userId: string,
  activeOnly?: boolean,
): Promise<Subscription[]> {
  let q = query(subscriptionsCollection, where('userId', '==', userId));
  if (activeOnly) {
    q = query(q, where('isActive', '==', true));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d =>
    docToSubscription(d.id, d.data() as SubscriptionDocument),
  );
}

export interface UpdateSubscriptionInput {
  description?: string;
  value?: number;
  dayOfMonth?: number;
  categoryId?: string | null;
  isActive?: boolean;
  nextOccurrenceDate?: Date | null;
}

export async function updateSubscription(
  subscriptionId: string,
  data: UpdateSubscriptionInput,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const updates: Record<string, unknown> = {
    updatedAt: dateToTimestamp(new Date()),
  };
  if (data.description != null) updates.description = data.description;
  if (data.value != null) updates.value = data.value;
  if (data.dayOfMonth != null) updates.dayOfMonth = data.dayOfMonth;
  if (data.categoryId !== undefined) updates.categoryId = data.categoryId;
  if (data.isActive !== undefined) updates.isActive = data.isActive;
  if (data.nextOccurrenceDate !== undefined) {
    updates.nextOccurrenceDate = data.nextOccurrenceDate
      ? dateToTimestamp(data.nextOccurrenceDate)
      : null;
  }
  await updateDoc(doc(subscriptionsCollection, subscriptionId), updates);
}

export async function deleteSubscription(
  subscriptionId: string,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteDoc(doc(subscriptionsCollection, subscriptionId));
}
