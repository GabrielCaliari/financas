import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { Wallet } from '../types/entities';
import * as walletService from '../services/walletService';

export function useWallets() {
  const { user } = useContext(AuthContext);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWallets = useCallback(async () => {
    if (!user?.id) {
      setWallets([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await walletService.getWalletsByUserId(user.id);
      setWallets(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setWallets([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  const createWallet = useCallback(
    async (input: walletService.CreateWalletInput) => {
      const id = await walletService.createWallet(input);
      await fetchWallets();
      return id;
    },
    [fetchWallets],
  );

  const updateWallet = useCallback(
    async (walletId: string, input: walletService.UpdateWalletInput) => {
      await walletService.updateWallet(walletId, input);
      await fetchWallets();
    },
    [fetchWallets],
  );

  const deleteWallet = useCallback(
    async (walletId: string) => {
      await walletService.deleteWallet(walletId);
      await fetchWallets();
    },
    [fetchWallets],
  );

  return {
    wallets,
    loading,
    error,
    refetch: fetchWallets,
    createWallet,
    updateWallet,
    deleteWallet,
  };
}
