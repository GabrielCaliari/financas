# Plano técnico — Motor financeiro (contabilidade Caixa x Competência)

Este documento substitui a orientação por telas por uma **arquitetura orientada ao motor contábil**. O app separa **caixa** (saldo real) de **competência** (compromissos futuros e crédito). Nenhuma tela nova deve ser implementada antes do motor financeiro estar em vigor.

---

## Princípios obrigatórios

1. **Não tratar todas as transações como iguais** — diferenciar por `financialType` e `status`.
2. **Cálculo único de saldo** — uma única fonte de verdade (funções puras), sem lógica duplicada.
3. **Substituir o modelo atual** — não adaptar; migrar para o modelo definitivo.
4. **Não implementar telas novas antes do motor** — Fase 2 (motor) precede Fase 3 (UI de transações).

---

# 1 — Modelo definitivo de transação

## 1.1 Campos obrigatórios

Toda transação possui:

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | string | sim | Identificador único (document id no Firestore) |
| `userId` | string | sim | Dono da transação |
| `description` | string | sim | Descrição |
| `amount` | number | sim | Valor em reais (positivo = entrada no caixa da conta; negativo = saída) |
| `date` | Date (Timestamp) | sim | Data da transação |
| `categoryId` | string \| null | sim | Categoria (receita/despesa) |
| `accountId` | string | sim | Conta (carteira) afetada — no código atual: `walletId` |
| `financialType` | enum | sim | Ver 1.2 |
| `status` | enum | sim | Ver 1.2 |
| `parentTransactionId` | string \| null | não | Parcela ou ocorrência de recorrência: aponta para a transação “mãe” |
| `invoiceId` | string \| null | não | Preenchido se a transação pertence ao fluxo de fatura (ex.: pagamento de fatura) |
| `recurrenceId` | string \| null | não | Se recorrente: identificador do grupo de recorrência |

Campos de auditoria (recomendado):

- `createdAt`: Date
- `updatedAt`: Date

## 1.2 Enums

**financialType**

- `"cash"` — movimentação de caixa (entrada/saída real na conta).
- `"commitment"` — compromisso futuro (parcela futura, recorrência futura). Não altera saldo até virar `cash` (ex.: quando a data chega e é “lançada”).
- `"invoice"` — item de fatura de cartão (compra no crédito) ou pagamento de fatura. Compra no crédito não mexe no saldo da conta; pagamento de fatura gera uma transação `cash` de saída.

**status**

- `"pending"` — agendada / não lançada (ex.: parcela futura, recorrência futura).
- `"posted"` — lançada; para `financialType === "cash"`, esta é a que altera saldo.
- `"paid"` — usada no contexto de fatura (fatura paga). Pagar fatura gera transação `cash` + `posted`.

## 1.3 Regras de impacto no saldo

- **Apenas `financialType === "cash"` e `status === "posted"`** alteram o saldo da conta (`accountId`).
- **Compra no crédito** não altera saldo da conta — gera `invoice_item` no sub-ledger do cartão.
- **Pagamento de fatura** gera uma transação `cash` com `status === "posted"` (saída do saldo).
- **Parcelas futuras** são `commitment` + `pending` (ou equivalente); **não entram no saldo atual**.
- **Recorrências futuras** idem: não entram no saldo até serem “realizadas” como `cash` + `posted`.

Convenção de sinal para `amount`:

- Entrada na conta: `amount > 0`.
- Saída da conta: `amount < 0`.
- Transferência: duas transações `cash` + `posted` (uma saída na origem, uma entrada no destino), ou modelo explícito de transfer com `targetAccountId` conforme definição da Fase 2.

---

# 2 — Sistema de cartão de crédito (sub-ledger)

O cartão de crédito é um **sub-ledger**: não é uma “conta” de saldo no mesmo sentido que conta corrente; fatura e itens são entidades separadas.

## 2.1 Entidades

### credit_cards (já existe como `creditCards`)

- `id`, `userId`, `name`, `closingDay`, `dueDay`, `createdAt`, `updatedAt`.
- Sem alteração de regra; apenas garantir vínculo com `invoices` e `invoice_items`.

### invoices (já existe como `invoices`)

- `id`, `userId`, `creditCardId`, `month` (YYYY-MM), `total`, `status`, `dueDate`, `paidAt`, `createdAt`, `updatedAt`.
- **Regras:**
  - Fatura **soma** os `invoice_items` daquele cartão naquele mês (ou período da fatura).
  - **Fechar fatura** = congela a lista de itens e o total (status passa a “closed” ou equivalente).
  - **Pagar fatura** = cria uma transação **cash** + **posted** (saída) na conta escolhida pelo usuário e marca a fatura como paga.

### invoice_items (NOVA — criar coleção `invoice_items`)

- `id`, `userId`, `creditCardId`, `invoiceId` (quando já fechada), `description`, `amount` (positivo = dívida), `date`, `categoryId`, `createdAt`.
- **Regras:**
  - **Compra no crédito** cria um `invoice_item` (e opcionalmente uma transação com `financialType === "invoice"` apenas para histórico, sem alterar saldo).
  - Cada item pertence a uma fatura (quando a fatura é fechada, `invoiceId` é preenchido).
  - Fatura em aberto: itens com `creditCardId` e data no período; ao fechar, `invoiceId` é atribuído e o `total` da fatura é calculado a partir dos itens.

## 2.2 Fluxo resumido

1. Compra no crédito → criar `invoice_item` (e eventualmente transação `invoice` sem impacto em saldo).
2. Fechar fatura → somar itens do período, definir `total`, congelar (status “closed”).
3. Pagar fatura → criar transação `cash` + `posted` (saída) na conta; marcar fatura como `paid`.

---

# 3 — Motor financeiro (cálculo único de saldo)

## 3.1 Objetivo

- **Uma única fonte de verdade** para saldo por conta.
- **Funções puras** (sem efeitos colaterais, sem UI): recebem dados (transações, opcionalmente faturas) e retornam números ou estruturas derivadas.

## 3.2 Funções obrigatórias (a implementar na Fase 2)

- **`getTransactionsThatAffectBalance(transactions: Transaction[]): Transaction[]`**  
  Filtra apenas transações com `financialType === "cash"` e `status === "posted"`.

- **`calculateAccountBalance(accountId: string, transactions: Transaction[]): number`**  
  Soma `amount` das transações que afetam o saldo e cujo `accountId` é o informado. Transferências: considerar lógica explícita (duas transações ou uma com `targetAccountId`) para não contar duas vezes.

- **`calculateTotalBalance(accounts: Account[], transactions: Transaction[]): number`**  
  Soma os saldos de todas as contas usando `calculateAccountBalance` por conta (ou equivalente em uma única passagem).

- **`getCommitments(transactions: Transaction[], options?: { accountId?, fromDate?, toDate? }): Transaction[]`**  
  Retorna transações `financialType === "commitment"` (e eventualmente `pending`) para exibição de compromissos futuros, sem afetar saldo.

- **`getInvoiceItemsForInvoice(invoiceId: string, invoiceItems: InvoiceItem[]): InvoiceItem[]`**  
  Filtra itens por `invoiceId` (cálculo de total da fatura deve usar isso ou equivalente).

Todas devem ser **puras**: sem chamadas a Firestore ou serviços; entrada = dados em memória; saída = valor ou lista.

## 3.3 Onde o saldo é usado

- **Persistência:** o campo `balance` na conta (wallet) pode ser **cache** recalculado quando necessário (ex.: ao carregar transações ou ao criar/editar uma transação que afeta saldo), usando sempre as funções acima. Ou o saldo pode ser **sempre calculado** na leitura, sem persistir; o plano recomenda cálculo único via motor e, se persistir, que seja apenas cache atualizado por esse motor.

---

# 4 — Ordem obrigatória de desenvolvimento (roadmap corrigido)

## FASE 1 — Já existe (não refazer)

- Auth, usuário, contas (wallets/carteiras), categorias.
- Telas básicas de listagem/cadastro de carteiras e categorias permanecem; o que mudará é o **modelo de transação** e o **cálculo de saldo**.

## FASE 2 — Motor financeiro (fazer agora)

**Objetivo:** Cálculo único de saldo e modelo definitivo de transação; suporte a invoice e commitment em dados e regras; zero UI nova.

1. **Modelo de dados (substituir, não adaptar)**  
   - Redefinir entidade **Transaction** no código com: `id`, `description`, `amount`, `date`, `categoryId`, `accountId`, `financialType`, `status`, `parentTransactionId`, `invoiceId`, `recurrenceId`, `createdAt`, `updatedAt`.  
   - Manter compatibilidade de nome no Firestore (ex.: `accountId` pode ser armazenado como `walletId` se quiser evitar migração em massa de documentos; o importante é a semântica no código).

2. **Entidades do sub-ledger**  
   - **invoice_items:** criar tipo e coleção `invoice_items`; campos conforme seção 2.1.  
   - Ajustar **invoices** e **credit_cards** para estarem alinhados ao fluxo (fechar fatura, pagar fatura).

3. **Motor financeiro (funções puras)**  
   - Criar módulo (ex.: `src/domain/balanceEngine.ts` ou `src/engine/`) com:  
     - `getTransactionsThatAffectBalance`  
     - `calculateAccountBalance`  
     - `calculateTotalBalance`  
     - `getCommitments`  
     - (e, se fizer sentido, `getInvoiceItemsForInvoice`)  
   - Sem dependência de React ou Firestore dentro dessas funções.

4. **Serviços**  
   - Ajustar **transactionService** (e onde houver criação/edição de transação) para usar o novo modelo e, ao ler transações, usar o motor para calcular saldo (e eventualmente atualizar cache da conta).  
   - Garantir que **nenhuma** outra parte do código calcula saldo “na mão”; tudo passa pelo motor.

5. **Migração de dados (se houver transações antigas)**  
   - Script ou regras de migração: transações antigas sem `financialType`/`status` serem tratadas como `cash` + `posted` (para manter saldo atual) e mapear campos antigos para o novo modelo (ex.: `value` → `amount`, `walletId` → `accountId`).

Não implementar nesta fase: novas telas, novos fluxos de parcela/recorrência/crédito na UI.

## FASE 3 — Transações UI

- Filtros (período, categoria, conta, tipo financeiro / status).
- Busca por descrição.
- Edição e exclusão de transação (respeitando o modelo e o motor).

## FASE 4 — Crédito, parcelamento e recorrência

- Parcelamento gera transações **commitment** (ou commitment + cash na primeira, conforme regra definida).
- Recorrência gera **commitment** para as próximas ocorrências.
- Cartão: fluxo completo de compra → `invoice_item`; fechar fatura; pagar fatura → transação **cash** + **posted**.

## FASE 5 — Planejamento (orçamento e metas)

- Orçamento por categoria, metas, etc., usando o mesmo motor e modelo de transação.

## FASE 6 — Dashboard

- Saldo total, “quanto posso gastar”, previsões, gráficos, alertas, todos consumindo o motor e o modelo definitivo.

---

# 5 — Checklist de alinhamento

- [ ] Modelo de transação no código usa `financialType` e `status`; `amount` com sinal; `accountId`; `parentTransactionId`, `invoiceId`, `recurrenceId` onde aplicável.
- [ ] Coleção/documento `invoice_items` criada e usada para compras no crédito.
- [ ] Existe um único módulo de funções puras para saldo; nenhum cálculo de saldo fora dele.
- [ ] Apenas `cash` + `posted` alteram saldo na lógica do app.
- [ ] Compra no crédito não altera saldo; pagamento de fatura gera transação cash.
- [ ] Parcelas/recorrências futuras não entram no saldo atual.
- [ ] Roadmap de desenvolvimento segue Fases 1 → 2 → 3 → 4 → 5 → 6; Fase 2 concluída antes de novas telas de transação/crédito.

---

# 6 — Próximo passo imediato

Implementar **Fase 2** na ordem abaixo:

1. Reescrever tipos e modelo (Transaction definitiva; InvoiceItem; enums financialType e status).  
2. Implementar módulo do motor (funções puras de saldo e filtros).  
3. Ajustar transactionService (e leitura de contas) para usar o novo modelo e o motor.  
4. Migração/mapeamento de dados antigos (transações e, se existir, movimentos legados).  
5. Remover ou deprecar qualquer cálculo de saldo fora do motor.

Após isso, o projeto estará alinhado ao motor contábil e pronto para Fase 3 (UI de transações) e Fase 4 (crédito, parcelamento, recorrência) sem refatoração de fundo do modelo.
