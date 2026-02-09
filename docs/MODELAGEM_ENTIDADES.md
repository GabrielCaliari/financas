# Modelagem de entidades — App financeiro pessoal

Este documento descreve a modelagem de dados do aplicativo (evolução do Finanças). **Uma entidade = uma coleção no Firestore** (nunca misturar tipos em um documento).

> **Modelo definitivo (motor contábil):** O plano técnico orientado ao **motor financeiro** (caixa x competência x fatura) está em **`PLANO_TECNICO_MOTOR_FINANCEIRO.md`**. A **Transaction definitiva** usa `financialType` (cash | commitment | invoice), `status` (pending | posted | paid), `amount` (com sinal) e `accountId`; existe ainda a entidade **invoice_items** para o sub-ledger do cartão. A implementação deve seguir a Fase 2 desse plano antes de novas telas.

---

## Modelo definitivo (Fase 2 — referência)

Resumo do que passa a valer após a Fase 2 (detalhes em `PLANO_TECNICO_MOTOR_FINANCEIRO.md`):

**Transaction (definitiva)**  
- `id`, `userId`, `description`, `amount` (com sinal), `date`, `categoryId`, `accountId`  
- `financialType`: `"cash"` | `"commitment"` | `"invoice"`  
- `status`: `"pending"` | `"posted"` | `"paid"`  
- `parentTransactionId`, `invoiceId`, `recurrenceId` (opcionais)  
- **Regra:** só `financialType === "cash"` e `status === "posted"` alteram saldo da conta.

**InvoiceItem (nova coleção `invoice_items`)**  
- `id`, `userId`, `creditCardId`, `invoiceId` (quando fatura fechada), `description`, `amount`, `date`, `categoryId`, `createdAt`  
- Compra no crédito cria invoice_item; fatura soma itens; pagar fatura gera transação cash.

---

## Visão geral (modelo atual até Fase 2)

| Entidade      | Coleção Firestore | Responsabilidade |
|---------------|-------------------|------------------|
| User          | `users`           | Dados do usuário; já existente, evoluir com `defaultWalletId` |
| Wallet        | `wallets`        | Carteiras (conta corrente, poupança, dinheiro) |
| Category      | `categories`     | Categorias de receita/despesa |
| Transaction   | `transactions`   | Movimentações (receita, despesa, transferência, cartão) |
| Budget        | `budgets`        | Orçamento mensal por categoria |
| Subscription  | `subscriptions` | Assinaturas / gastos recorrentes |
| CreditCard    | `creditCards`    | Cartões de crédito (fechamento e vencimento) |
| Invoice       | `invoices`       | Faturas (aberta, paga, vencida) |

**Parcelamento (Installment):** não é coleção. Modelado via `Transaction` com `installmentGroupId`, `installmentNumber` e `installmentTotal`.

---

## Relacionamentos

```
User 1──* Wallet
User 1──* Category
User 1──* Transaction
User 1──* Budget
User 1──* Subscription
User 1──* CreditCard
User 1──* Invoice

Wallet 1──* Transaction (transaction.walletId)
Category 1──* Transaction (transaction.categoryId)
Category 1──* Budget (budget.categoryId)
CreditCard 1──* Invoice (invoice.creditCardId)
CreditCard 1──* Transaction (quando type = cartao_credito)
```

---

## Detalhamento por entidade

### User (`users`)

- **id:** string (document id)
- **name:** string
- **email:** string
- **avatarUrl:** string | null
- **createdAt:** Timestamp
- **defaultWalletId:** string | null (opcional; para migração)

Mantém compatibilidade com o documento atual. Novos campos opcionais.

---

### Wallet (`wallets`)

- **userId:** string
- **name:** string
- **type:** `checking` | `savings` | `cash`
- **balance:** number (cache do saldo; pode ser recalculado)
- **createdAt:** Timestamp
- **updatedAt:** Timestamp

Saldo total do usuário = soma de `balance` de todas as carteiras + faturas pagas (conforme regra de negócio).

---

### Category (`categories`)

- **userId:** string
- **name:** string
- **type:** `receita` | `despesa`
- **icon:** string | null
- **color:** string | null
- **createdAt:** Timestamp

---

### Transaction (`transactions`)

- **userId:** string
- **walletId:** string (carteira da transação)
- **type:** `receita` | `despesa` | `transferencia` | `cartao_credito`
- **value:** number (sempre positivo; tipo define se soma ou subtrai do saldo)
- **description:** string
- **categoryId:** string | null
- **paymentMethod:** Dinheiro | Crédito | Débito | Pix | null
- **date:** Timestamp
- **createdAt:** Timestamp

Campos condicionais:

- **Transferência:** `targetWalletId`
- **Cartão:** `creditCardId`, `invoiceId`
- **Parcelamento:** `installmentGroupId`, `installmentNumber`, `installmentTotal`
- **Recorrência:** `recurrenceRule`, `recurrenceEndDate`, `recurrenceParentId`

Regras:

- Compra no crédito não altera saldo da carteira imediatamente (impacta fatura).
- Parcelamento gera N transações futuras (mesmo `installmentGroupId`).
- Transferência: débito em uma carteira e crédito em outra (ou 1 doc com `targetWalletId` e o service gera as duas partes).

---

### Budget (`budgets`)

- **userId:** string
- **categoryId:** string
- **month:** string (YYYY-MM)
- **limit:** number (limite em reais)
- **createdAt:** Timestamp
- **updatedAt:** Timestamp

Um orçamento por (usuário, categoria, mês).

---

### Subscription (`subscriptions`)

- **userId:** string
- **description:** string
- **value:** number
- **dayOfMonth:** number (1–31)
- **categoryId:** string | null
- **isActive:** boolean
- **createdAt:** Timestamp
- **updatedAt:** Timestamp
- **nextOccurrenceDate:** Timestamp | null (para scheduler)

---

### CreditCard (`creditCards`)

- **userId:** string
- **name:** string
- **closingDay:** number (1–31)
- **dueDay:** number (1–31)
- **createdAt:** Timestamp
- **updatedAt:** Timestamp

---

### Invoice (`invoices`)

- **userId:** string
- **creditCardId:** string
- **month:** string (YYYY-MM)
- **total:** number
- **status:** `open` | `paid` | `overdue`
- **dueDate:** Timestamp
- **paidAt:** Timestamp | null
- **createdAt:** Timestamp
- **updatedAt:** Timestamp

---

## Estratégia de migração

1. **Não quebrar o que existe**
   - Coleções atuais: `users`, `movements`.
   - `movements` continua sendo usada pela Home/Transações atuais.

2. **Novas coleções**
   - Criar: `wallets`, `categories`, `transactions`, `budgets`, `subscriptions`, `creditCards`, `invoices`.
   - Novas telas (Dashboard, Planejamento, etc.) usam apenas as novas entidades.

3. **Migração gradual de Movement → Transaction**
   - Quando o usuário tiver carteiras cadastradas, novas movimentações podem ser salvas em `transactions` (com `walletId`).
   - Opcional: job ou tela “Importar movimentações” que lê `movements` e cria `transactions` associadas a uma carteira padrão.
   - Manter leitura de `movements` até a migração estar estável; depois deprecar.

4. **Carteira padrão**
   - Ao criar a primeira carteira, definir como `defaultWalletId` no User (ou na primeira wallet criada).
   - Transações antigas (movements) podem ser consideradas “carteira padrão” até haver migração explícita.

---

## Onde está no código

- **Tipos de domínio (Date):** `src/types/entities.ts`
- **Tipos Firestore (Timestamp):** `src/types/firestore.ts`
- **Barrel:** `src/types/index.ts`
- **Coleções:** `src/services/firebase.ts` (users, movements, wallets, categories, transactions, budgets, subscriptions, creditCards, invoices)
- **Serviços (um por entidade):** `src/services/walletService.ts`, `categoryService.ts`, `transactionService.ts`, `budgetService.ts`, `subscriptionService.ts`, `creditCardService.ts`, `invoiceService.ts`
- **Hooks:** `src/hooks/useWallets.ts`, `useCategories.ts`, `useTransactions.ts`, `useBudgets.ts`, `useSubscriptions.ts`, `useCreditCards.ts`, `useInvoices.ts` (barrel: `src/hooks/index.ts`)

Serviços:
- Leem do Firestore e convertem `Timestamp` → `Date` para retornar entidades.
- Recebem inputs com `Date` e convertem `Date` → `Timestamp` ao escrever.

---

## Índices Firestore (a criar conforme uso)

Criar índices compostos quando necessário, seguindo o padrão do app:

- **transactions:** `userId` + `date` (desc), `userId` + `walletId` + `date`, `userId` + `type` + `date`, etc.
- **budgets:** `userId` + `month`
- **invoices:** `userId` + `creditCardId` + `month`
- **subscriptions:** `userId` + `isActive` + `nextOccurrenceDate`

O console do Firebase costuma sugerir o índice exato quando a primeira query rodar.
