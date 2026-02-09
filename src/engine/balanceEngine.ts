/**
 * Motor financeiro — funções puras de cálculo de saldo.
 * Única fonte de verdade: apenas financialType === "cash" e status === "posted" alteram saldo.
 * Sem efeitos colaterais; sem Firestore/UI.
 */

import type { Transaction } from '../types/entities';
import type { Wallet } from '../types/entities';

const AFFECTS_BALANCE: Transaction['financialType'] = 'cash';
const BALANCE_STATUS: Transaction['status'] = 'posted';

/**
 * Filtra transações que alteram o saldo da conta.
 * Apenas cash + posted.
 */
export function getTransactionsThatAffectBalance(
  transactions: Transaction[],
): Transaction[] {
  return transactions.filter(
    t => t.financialType === AFFECTS_BALANCE && t.status === BALANCE_STATUS,
  );
}

/**
 * Calcula o saldo de uma conta a partir das transações.
 * - Transação com accountId = conta: soma amount (entrada positiva, saída negativa).
 * - Transação com targetAccountId = conta (transferência): soma -amount (entrada na destino).
 */
export function calculateAccountBalance(
  accountId: string,
  transactions: Transaction[],
): number {
  const affecting = getTransactionsThatAffectBalance(transactions);
  let balance = 0;
  for (const t of affecting) {
    if (t.accountId === accountId) {
      balance += t.amount;
    }
    if (t.targetAccountId === accountId) {
      balance -= t.amount;
    }
  }
  return balance;
}

/**
 * Saldo total = soma dos saldos de todas as contas.
 * accounts: lista de contas (wallet); transactions: todas as transações.
 */
export function calculateTotalBalance(
  accounts: Wallet[],
  transactions: Transaction[],
): number {
  return accounts.reduce(
    (sum, acc) => sum + calculateAccountBalance(acc.id, transactions),
    0,
  );
}

export interface GetCommitmentsOptions {
  accountId?: string;
  fromDate?: Date;
  toDate?: Date;
}

/**
 * Retorna transações que são compromissos futuros (não afetam saldo atual).
 * financialType === "commitment" (e opcionalmente status === "pending").
 */
export function getCommitments(
  transactions: Transaction[],
  options?: GetCommitmentsOptions,
): Transaction[] {
  let list = transactions.filter(t => t.financialType === 'commitment');
  if (options?.accountId) {
    list = list.filter(
      t =>
        t.accountId === options.accountId ||
        t.targetAccountId === options.accountId,
    );
  }
  if (options?.fromDate != null) {
    list = list.filter(t => t.date >= options.fromDate!);
  }
  if (options?.toDate != null) {
    list = list.filter(t => t.date <= options.toDate!);
  }
  return list;
}

/**
 * Retorna itens de fatura por invoiceId (para total da fatura).
 * Uso: total = items.reduce((s, i) => s + i.amount, 0).
 */
export function getInvoiceItemsForInvoice(
  invoiceId: string,
  items: { id: string; invoiceId: string | null; amount: number }[],
): { id: string; invoiceId: string | null; amount: number }[] {
  return items.filter(i => i.invoiceId === invoiceId);
}
