import {
  movementsCollection,
  dateToTimestamp,
  timestampToDate,
  Movement,
  firebaseAuth,
} from './firebase';
import firestore from '@react-native-firebase/firestore';

export interface MovementInput {
  description: string;
  value: number;
  type: 'receita' | 'despesa';
  payment_method: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';
  date: Date;
}

export interface MovementDisplay {
  id: string;
  description: string;
  value: number;
  type: 'receita' | 'despesa';
  payment_method: 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';
  date: string; // formatted as dd/MM/yyyy
}

// Create a new movement
export const createMovement = async (
  data: MovementInput,
): Promise<string> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const movementData = {
    userId: user.uid,
    description: data.description,
    value: data.value,
    type: data.type,
    payment_method: data.payment_method,
    date: dateToTimestamp(data.date),
    createdAt: dateToTimestamp(new Date()),
  };

  const docRef = await movementsCollection.add(movementData);
  return docRef.id;
};

// Update an existing movement
export const updateMovement = async (
  id: string,
  data: MovementInput,
): Promise<void> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  await movementsCollection.doc(id).update({
    description: data.description,
    value: data.value,
    type: data.type,
    payment_method: data.payment_method,
    date: dateToTimestamp(data.date),
  });
};

// Delete a movement
export const deleteMovement = async (id: string): Promise<void> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  await movementsCollection.doc(id).delete();
};

// Get movements for a specific date
export const getMovementsByDate = async (
  date: Date,
): Promise<MovementDisplay[]> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  // Create start and end of day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const snapshot = await movementsCollection
    .where('userId', '==', user.uid)
    .where('date', '>=', dateToTimestamp(startOfDay))
    .where('date', '<=', dateToTimestamp(endOfDay))
    .orderBy('date', 'desc')
    .get();

  return snapshot.docs.map(doc => {
    const data = doc.data() as Omit<Movement, 'id'>;
    const dateObj = timestampToDate(data.date);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}/${dateObj.getFullYear()}`;

    return {
      id: doc.id,
      description: data.description,
      value: data.value,
      type: data.type,
      payment_method: data.payment_method,
      date: formattedDate,
    };
  });
};

// Get movements by type for a specific date
export const getMovementsByTypeAndDate = async (
  type: 'receita' | 'despesa',
  date: Date,
): Promise<MovementDisplay[]> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const snapshot = await movementsCollection
    .where('userId', '==', user.uid)
    .where('type', '==', type)
    .where('date', '>=', dateToTimestamp(startOfDay))
    .where('date', '<=', dateToTimestamp(endOfDay))
    .orderBy('date', 'desc')
    .get();

  return snapshot.docs.map(doc => {
    const data = doc.data() as Omit<Movement, 'id'>;
    const dateObj = timestampToDate(data.date);
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(
      dateObj.getMonth() + 1,
    ).padStart(2, '0')}/${dateObj.getFullYear()}`;

    return {
      id: doc.id,
      description: data.description,
      value: data.value,
      type: data.type,
      payment_method: data.payment_method,
      date: formattedDate,
    };
  });
};

// Calculate balance for a specific date
export const getBalanceByDate = async (
  date: Date,
): Promise<{saldo: number; tag: string}> => {
  const user = firebaseAuth().currentUser;
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const snapshot = await movementsCollection
    .where('userId', '==', user.uid)
    .where('date', '>=', dateToTimestamp(startOfDay))
    .where('date', '<=', dateToTimestamp(endOfDay))
    .get();

  let totalReceita = 0;
  let totalDespesa = 0;

  snapshot.docs.forEach(doc => {
    const data = doc.data() as Omit<Movement, 'id'>;
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
