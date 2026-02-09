/**
 * Modelagem de entidades do app financeiro.
 * Uma entidade = uma coleção no Firestore (nunca misturar tipos em um documento).
 *
 * Para persistência: serviços convertem Date <-> Firebase Timestamp.
 */

// ============== ENUMS / UNION TYPES ==============

export type TransactionType = 'receita' | 'despesa' | 'transferencia' | 'cartao_credito';

export type WalletType = 'checking' | 'savings' | 'cash';

export type PaymentMethod = 'Dinheiro' | 'Crédito' | 'Débito' | 'Pix';

export type InvoiceStatus = 'open' | 'paid' | 'overdue';

export type RecurrenceRule = 'weekly' | 'biweekly' | 'monthly' | 'yearly';

// ============== USER ==============
// Evolução do usuário atual. Coleção: users

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  createdAt: Date; // Firestore: Timestamp
  /** ID da carteira padrão (opcional, para migração gradual) */
  defaultWalletId?: string | null;
}

// ============== WALLET (Carteira) ==============
// Coleção: wallets

export interface Wallet {
  id: string;
  userId: string;
  name: string;
  type: WalletType;
  /** Saldo atual (mantido em cache; pode ser recalculado a partir de transações) */
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============== CATEGORY ==============
// Coleção: categories

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'receita' | 'despesa';
  icon?: string | null;
  color?: string | null;
  createdAt: Date;
}

// ============== TRANSACTION ==============
// Substitui conceitualmente Movement. Coleção: transactions
// Regras: uma transação = um documento. Transferência = 2 documentos (saída + entrada) ou 1 com targetWalletId.

export interface Transaction {
  id: string;
  userId: string;
  walletId: string;
  type: TransactionType;
  value: number;
  description: string;
  categoryId?: string | null;
  paymentMethod?: PaymentMethod | null;
  date: Date;
  createdAt: Date;

  // Transferência: carteira de destino
  targetWalletId?: string | null;

  // Cartão de crédito: vincula à fatura
  creditCardId?: string | null;
  invoiceId?: string | null;

  // Parcelamento: mesmo grupo = mesma compra
  installmentGroupId?: string | null;
  installmentNumber?: number; // 1-based, ex: 3 de 12
  installmentTotal?: number;

  // Recorrência
  recurrenceRule?: RecurrenceRule | null;
  recurrenceEndDate?: Date | null;
  /** ID da transação "mãe" que gerou esta (em recorrência) */
  recurrenceParentId?: string | null;
}

// ============== BUDGET (Orçamento por categoria) ==============
// Coleção: budgets

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  /** Mês no formato YYYY-MM */
  month: string;
  /** Limite em reais */
  limit: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============== SUBSCRIPTION (Assinatura / gasto recorrente) ==============
// Coleção: subscriptions
// Pode ser detectado automaticamente ou cadastrado manualmente.

export interface Subscription {
  id: string;
  userId: string;
  description: string;
  value: number;
  /** Dia do mês em que vence (1-31) */
  dayOfMonth: number;
  categoryId?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  /** Próxima data de cobrança (para scheduler) */
  nextOccurrenceDate?: Date | null;
}

// ============== CREDIT CARD ==============
// Coleção: creditCards

export interface CreditCard {
  id: string;
  userId: string;
  name: string;
  /** Dia do fechamento (1-31) */
  closingDay: number;
  /** Dia do vencimento (1-31) */
  dueDay: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============== INVOICE (Fatura) ==============
// Coleção: invoices

export interface Invoice {
  id: string;
  userId: string;
  creditCardId: string;
  /** Mês de referência YYYY-MM */
  month: string;
  /** Total da fatura em reais */
  total: number;
  status: InvoiceStatus;
  /** Data de vencimento */
  dueDate: Date;
  /** Data em que foi paga (se status === 'paid') */
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============== INSTALLMENT (Parcelamento) ==============
// Não é uma coleção separada. Parcelamento é modelado via Transaction:
// - Uma compra parcelada gera N transações com mesmo installmentGroupId,
//   installmentNumber 1..N e installmentTotal = N.
// Estes tipos auxiliares podem ser usados na lógica de negócio.

export interface InstallmentGroup {
  groupId: string;
  totalInstallments: number;
  valuePerInstallment: number;
  firstDueDate: Date;
}

export type TransactionWithInstallment = Transaction & {
  installmentGroupId: string;
  installmentNumber: number;
  installmentTotal: number;
};
