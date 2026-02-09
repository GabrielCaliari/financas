import {
  walletsCollection,
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
import type { Wallet, WalletType } from '../types/entities';
import type { WalletDocument } from '../types/firestore';

function docToWallet(docId: string, data: WalletDocument): Wallet {
  return {
    id: docId,
    userId: data.userId,
    name: data.name,
    type: data.type as WalletType,
    balance: data.balance,
    createdAt: timestampToDate(data.createdAt)!,
    updatedAt: timestampToDate(data.updatedAt)!,
  };
}

export interface CreateWalletInput {
  name: string;
  type: WalletType;
  balance?: number;
}

export async function createWallet(data: CreateWalletInput): Promise<string> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const now = new Date();
  const docData = {
    userId: user.uid,
    name: data.name,
    type: data.type,
    balance: data.balance ?? 0,
    createdAt: dateToTimestamp(now),
    updatedAt: dateToTimestamp(now),
  };
  const ref = await addDoc(walletsCollection, docData);
  return ref.id;
}

export async function getWalletsByUserId(userId: string): Promise<Wallet[]> {
  const q = query(
    walletsCollection,
    where('userId', '==', userId),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => docToWallet(d.id, d.data() as WalletDocument));
}

export async function getWalletById(walletId: string): Promise<Wallet | null> {
  const user = getAuth().currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(walletsCollection, walletId));
  if (!snap.exists()) return null;
  const data = snap.data() as WalletDocument;
  if (data.userId !== user.uid) return null;
  return docToWallet(snap.id, data);
}

export interface UpdateWalletInput {
  name?: string;
  type?: WalletType;
  balance?: number;
}

export async function updateWallet(
  walletId: string,
  data: UpdateWalletInput,
): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');

  const updates: Record<string, unknown> = {
    updatedAt: dateToTimestamp(new Date()),
  };
  if (data.name != null) updates.name = data.name;
  if (data.type != null) updates.type = data.type;
  if (data.balance != null) updates.balance = data.balance;

  await updateDoc(doc(walletsCollection, walletId), updates);
}

export async function updateWalletBalance(
  walletId: string,
  newBalance: number,
): Promise<void> {
  await updateWallet(walletId, { balance: newBalance });
}

export async function deleteWallet(walletId: string): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuário não autenticado');
  await deleteDoc(doc(walletsCollection, walletId));
}
