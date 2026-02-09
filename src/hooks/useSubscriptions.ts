import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { Subscription } from '../types/entities';
import * as subscriptionService from '../services/subscriptionService';

export function useSubscriptions(activeOnly?: boolean) {
  const { user } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    if (!user?.id) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getSubscriptionsByUserId(
        user.id,
        activeOnly,
      );
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, activeOnly]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const createSubscription = useCallback(
    async (input: subscriptionService.CreateSubscriptionInput) => {
      const id = await subscriptionService.createSubscription(input);
      await fetchSubscriptions();
      return id;
    },
    [fetchSubscriptions],
  );

  const updateSubscription = useCallback(
    async (
      subscriptionId: string,
      input: subscriptionService.UpdateSubscriptionInput,
    ) => {
      await subscriptionService.updateSubscription(subscriptionId, input);
      await fetchSubscriptions();
    },
    [fetchSubscriptions],
  );

  const deleteSubscription = useCallback(
    async (subscriptionId: string) => {
      await subscriptionService.deleteSubscription(subscriptionId);
      await fetchSubscriptions();
    },
    [fetchSubscriptions],
  );

  return {
    subscriptions,
    loading,
    error,
    refetch: fetchSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  };
}
