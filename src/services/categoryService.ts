import {
  categoriesCollection,
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
import type { Category } from '../types/entities';
import type { CategoryDocument } from '../types/firestore';

function docToCategory(docId: string, data: CategoryDocument): Category {
  return {
    id: docId,
    userId: data.userId,
    name: data.name,
    type: data.type,
    icon: data.icon ?? null,
    color: data.color ?? null,
    createdAt: timestampToDate(data.createdAt)!,
  };
}

export type CategoryType = 'receita' | 'despesa';

export interface CreateCategoryInput {
  name: string;
  type: CategoryType;
  icon?: string | null;
  color?: string | null;
}

export async function createCategory(data: CreateCategoryInput): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData = {
    userId: user.uid,
    name: data.name,
    type: data.type,
    icon: data.icon ?? null,
    color: data.color ?? null,
    createdAt: dateToTimestamp(now),
  };
  const ref = await addDoc(categoriesCollection, docData);
  return ref.id;
}

export async function getCategoriesByUserId(
  userId: string,
  type?: CategoryType,
): Promise<Category[]> {
  let q = query(categoriesCollection, where('userId', '==', userId));
  if (type) {
    q = query(q, where('type', '==', type));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d =>
    docToCategory(d.id, d.data() as CategoryDocument),
  );
}

export interface UpdateCategoryInput {
  name?: string;
  type?: CategoryType;
  icon?: string | null;
  color?: string | null;
}

export async function updateCategory(
  categoryId: string,
  data: UpdateCategoryInput,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const updates: Record<string, unknown> = {};
  if (data.name != null) updates.name = data.name;
  if (data.type != null) updates.type = data.type;
  if (data.icon !== undefined) updates.icon = data.icon;
  if (data.color !== undefined) updates.color = data.color;

  if (Object.keys(updates).length === 0) return;
  await updateDoc(doc(categoriesCollection, categoryId), updates);
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteDoc(doc(categoriesCollection, categoryId));
}
