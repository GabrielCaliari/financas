import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { Budget } from '../types/entities';
import * as budgetService from '../services/budgetService';

export function useBudgets(month?: string) {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBudgets = useCallback(async () => {
    if (!user?.id) {
      setBudgets([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await budgetService.getBudgetsByUserId(user.id, month);
      setBudgets(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, month]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const createBudget = useCallback(
    async (input: budgetService.CreateBudgetInput) => {
      const id = await budgetService.createBudget(input);
      await fetchBudgets();
      return id;
    },
    [fetchBudgets],
  );

  const updateBudget = useCallback(
    async (budgetId: string, limit: number) => {
      await budgetService.updateBudget(budgetId, limit);
      await fetchBudgets();
    },
    [fetchBudgets],
  );

  const deleteBudget = useCallback(
    async (budgetId: string) => {
      await budgetService.deleteBudget(budgetId);
      await fetchBudgets();
    },
    [fetchBudgets],
  );

  return {
    budgets,
    loading,
    error,
    refetch: fetchBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
  };
}
