import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { CreditCard } from '../types/entities';
import * as creditCardService from '../services/creditCardService';

export function useCreditCards() {
  const { user } = useContext(AuthContext);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCreditCards = useCallback(async () => {
    if (!user?.id) {
      setCreditCards([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await creditCardService.getCreditCardsByUserId(user.id);
      setCreditCards(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setCreditCards([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchCreditCards();
  }, [fetchCreditCards]);

  const createCreditCard = useCallback(
    async (input: creditCardService.CreateCreditCardInput) => {
      const id = await creditCardService.createCreditCard(input);
      await fetchCreditCards();
      return id;
    },
    [fetchCreditCards],
  );

  const updateCreditCard = useCallback(
    async (
      creditCardId: string,
      input: creditCardService.UpdateCreditCardInput,
    ) => {
      await creditCardService.updateCreditCard(creditCardId, input);
      await fetchCreditCards();
    },
    [fetchCreditCards],
  );

  const deleteCreditCard = useCallback(
    async (creditCardId: string) => {
      await creditCardService.deleteCreditCard(creditCardId);
      await fetchCreditCards();
    },
    [fetchCreditCards],
  );

  return {
    creditCards,
    loading,
    error,
    refetch: fetchCreditCards,
    createCreditCard,
    updateCreditCard,
    deleteCreditCard,
  };
}
