import {
  movementsCollection,
  dateToTimestamp,
  timestampToDate,
  Movement,
} from './firebase';
import {getAuth} from '@react-native-firebase/auth';
import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from '@react-native-firebase/firestore';

export interface MovementInput {
  description: string;
  value: number;
  type: 'receita' | 'despesa';
  payment_method: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';
  date: Date;
  categoryId?: string | null;
}

export interface MovementDisplay {
  id: string;
  description: string;
  value: number;
  type: 'receita' | 'despesa';
  payment_method: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';
  date: string; // formatted as dd/MM/yyyy
  categoryId?: string | null;
}

// Create a new movement
export const createMovement = async (
  data: MovementInput,
): Promise<string> => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const movementData: Record<string, unknown> = {
    userId: user.uid,
    description: data.description,
    value: data.value,
    type: data.type,
    payment_method: data.payment_method,
    date: dateToTimestamp(data.date),
    createdAt: dateToTimestamp(new Date()),
  };
  if (data.categoryId != null) movementData.categoryId = data.categoryId;

  const docRef = await addDoc(movementsCollection, movementData);
  return docRef.id;
};

// Update an existing movement
export const updateMovement = async (
  id: string,
  data: MovementInput,
): Promise<void> => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const updates: Record<string, unknown> = {
    description: data.description,
    value: data.value,
    type: data.type,
    payment_method: data.payment_method,
    date: dateToTimestamp(data.date),
  };
  if (data.categoryId !== undefined) updates.categoryId = data.categoryId;
  await updateDoc(doc(movementsCollection, id), updates);
};

// Delete a movement
export const deleteMovement = async (id: string): Promise<void> => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  await deleteDoc(doc(movementsCollection, id));
};

// Get movements for a specific date
export const getMovementsByDate = async (
  date: Date,
): Promise<MovementDisplay[]> => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Create start and end of day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const q = query(
    movementsCollection,
    where('userId', '==', user.uid),
    where('date', '>=', dateToTimestamp(startOfDay)),
    where('date', '<=', dateToTimestamp(endOfDay)),
    orderBy('date', 'desc'),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map(docSnap => {
    const data = docSnap.data() as Omit<Movement, 'id'>;
    const dateObj = timestampToDate(data.date);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}/${dateObj.getFullYear()}`;

    return {
      id: docSnap.id,
      description: data.description,
      value: data.value,
      type: data.type,
      payment_method: data.payment_method,
      date: formattedDate,
      categoryId: data.categoryId ?? null,
    };
  });
};

// Get movements by type for a specific date
export const getMovementsByTypeAndDate = async (
  type: 'receita' | 'despesa',
  date: Date,
): Promise<MovementDisplay[]> => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const q = query(
    movementsCollection,
    where('userId', '==', user.uid),
    where('type', '==', type),
    where('date', '>=', dateToTimestamp(startOfDay)),
    where('date', '<=', dateToTimestamp(endOfDay)),
    orderBy('date', 'desc'),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map(docSnap => {
    const data = docSnap.data() as Omit<Movement, 'id'>;
    const dateObj = timestampToDate(data.date);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}/${dateObj.getFullYear()}`;

    return {
      id: docSnap.id,
      description: data.description,
      value: data.value,
      type: data.type,
      payment_method: data.payment_method,
      date: formattedDate,
      categoryId: data.categoryId ?? null,
    };
  });
};

// Calculate balance for a specific date
export const getBalanceByDate = async (
  date: Date,
): Promise<{saldo: number; tag: string}> => {
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const q = query(
    movementsCollection,
    where('userId', '==', user.uid),
    where('date', '>=', dateToTimestamp(startOfDay)),
    where('date', '<=', dateToTimestamp(endOfDay)),
  );
  const snapshot = await getDocs(q);

  let totalReceita = 0;
  let totalDespesa = 0;

  snapshot.docs.forEach(docSnap => {
    const data = docSnap.data() as Omit<Movement, 'id'>;
    if (data.type === 'receita') {
      totalReceita += data.value;
    } else {
      totalDespesa += data.value;
    }
  });

  return {
    saldo: totalReceita - totalDespesa,
    tag: 'saldo',
  };
};
