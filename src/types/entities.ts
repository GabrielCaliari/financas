/**
 * Modelagem de entidades do app financeiro.
 * Modelo definitivo orientado ao motor contábil (caixa x competência x fatura).
 * Serviços convertem Date <-> Firebase Timestamp na persistência.
 */

// ============== ENUMS — MOTOR FINANCEIRO ==============

/** Tipo financeiro: só "cash" + "posted" alteram saldo da conta */
export type FinancialType = 'cash' | 'commitment' | 'invoice';

/** Status: apenas "posted" (com cash) altera saldo */
export type TransactionStatus = 'pending' | 'posted' | 'paid';

// ============== ENUMS — LEGADO / UI ==============

export type WalletType = 'checking' | 'savings' | 'cash';

export type PaymentMethod = 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';

export type InvoiceStatus = 'open' | 'closed' | 'paid' | 'overdue';

export type RecurrenceRule = 'weekly' | 'biweekly' | 'monthly' | 'yearly';

// ============== USER ==============

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: Date;
  defaultWalletId?: string | null;
}

// ============== ACCOUNT (Carteira) ==============
// Coleção: wallets. No motor contábil = "conta".

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  type: WalletType;
  /** Cache do saldo; recalculado pelo motor (balanceEngine) */
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============== CATEGORY ==============

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'receita' | 'despesa';
  icon?: string | null;
  color?: string | null;
  createdAt: Date;
}

// ============== TRANSACTION (MODELO DEFINITIVO) ==============
// Coleção: transactions
// Regra: apenas financialType === "cash" e status === "posted" alteram saldo.

export interface Transaction {
  id: string;
  userId: string;
  description: string;
  /** Valor com sinal: positivo = entrada na conta, negativo = saída */
  amount: number;
  date: Date;
  categoryId: string | null;
  /** Conta (carteira) afetada — id em wallets */
  accountId: string;
  financialType: FinancialType;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;

  /** Parcela/recorrência: id da transação mãe */
  parentTransactionId: string | null;
  /** Se vinculada a fatura (ex.: pagamento de fatura) */
  invoiceId: string | null;
  /** Grupo de recorrência */
  recurrenceId: string | null;

  /** Transferência: conta de destino (valor sai de accountId e entra aqui) */
  targetAccountId: string | null;
}

// ============== INVOICE ITEM (Sub-ledger cartão) ==============
// Coleção: invoice_items. Compra no crédito cria item; fatura soma itens.

export interface InvoiceItem {
  id: string;
  userId: string;
  creditCardId: string;
  /** Preenchido quando a fatura é fechada */
  invoiceId: string | null;
  description: string;
  /** Valor da dívida (positivo) */
  amount: number;
  date: Date;
  categoryId: string | null;
  createdAt: Date;
}

// ============== BUDGET ==============

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  month: string;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============== SUBSCRIPTION ==============

export interface Subscription {
  id: string;
  userId: string;
  description: string;
  value: number;
  dayOfMonth: number;
  categoryId?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  nextOccurrenceDate?: Date | null;
}

// ============== CREDIT CARD ==============

export interface CreditCard {
  id: string;
  userId: string;
  name: string;
  closingDay: number;
  dueDay: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============== INVOICE (Fatura) ==============

export interface Invoice {
  id: string;
  userId: string;
  creditCardId: string;
  month: string;
  total: number;
  status: InvoiceStatus;
  dueDate: Date;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
