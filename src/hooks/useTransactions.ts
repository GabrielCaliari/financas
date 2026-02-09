import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { Transaction } from '../types/entities';
import type { TransactionFilters } from '../services/transactionService';
import * as transactionService from '../services/transactionService';

export function useTransactions(filters?: TransactionFilters) {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!user?.id) {
      setTransactions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactionsByUserId(
        user.id,
        filters,
      );
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(
    async (input: transactionService.CreateTransactionInput) => {
      const id = await transactionService.createTransaction(input);
      await fetchTransactions();
      return id;
    },
    [fetchTransactions],
  );

  const updateTransaction = useCallback(
    async (
      transactionId: string,
      input: transactionService.UpdateTransactionInput,
    ) => {
      await transactionService.updateTransaction(transactionId, input);
      await fetchTransactions();
    },
    [fetchTransactions],
  );

  const deleteTransaction = useCallback(
    async (transactionId: string) => {
      await transactionService.deleteTransaction(transactionId);
      await fetchTransactions();
    },
    [fetchTransactions],
  );

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
