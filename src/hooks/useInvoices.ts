import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import type { Invoice, InvoiceStatus } from '../types/entities';
import * as invoiceService from '../services/invoiceService';

export function useInvoices(creditCardId?: string, month?: string) {
  const { user } = useContext(AuthContext);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvoices = useCallback(async () => {
    if (!user?.id) {
      setInvoices([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await invoiceService.getInvoicesByUserId(
        user.id,
        creditCardId,
        month,
      );
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, creditCardId, month]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const createInvoice = useCallback(
    async (input: invoiceService.CreateInvoiceInput) => {
      const id = await invoiceService.createInvoice(input);
      await fetchInvoices();
      return id;
    },
    [fetchInvoices],
  );

  const updateInvoiceStatus = useCallback(
    async (invoiceId: string, status: InvoiceStatus, paidAt?: Date | null) => {
      await invoiceService.updateInvoiceStatus(invoiceId, status, paidAt);
      await fetchInvoices();
    },
    [fetchInvoices],
  );

  return {
    invoices,
    loading,
    error,
    refetch: fetchInvoices,
    createInvoice,
    updateInvoiceStatus,
  };
}
