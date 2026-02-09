# Etapas de implementação — Roadmap corrigido (motor financeiro)

O roadmap anterior era orientado por **telas**. Este foi **substituído** por um plano orientado ao **motor contábil** (caixa x competência x fatura).  
Documento de referência: **`PLANO_TECNICO_MOTOR_FINANCEIRO.md`**.

---

## Princípio

- **Não implementar telas novas antes do motor financeiro.**
- **Não adaptar o modelo atual** — substituir pelo modelo definitivo (Transaction com `financialType`, `status`, `amount`, etc.).
- **Cálculo único de saldo** — funções puras; nenhuma lógica duplicada.

---

## FASE 1 — Já existe ✅

- Auth, usuário, contas (carteiras), categorias.
- Telas de Carteiras, Categorias, Cartões no Perfil; Transferência; Receita/Despesa com categorias.
- **O que muda depois:** uso do novo modelo de transação e do motor de saldo (Fase 2).

---

## FASE 2 — Motor financeiro (FAZER AGORA)

Tudo aqui é **backend/domínio**; sem telas novas.

| # | Etapa | Detalhe |
|---|--------|--------|
| 2.1 | **Modelo definitivo de Transaction** | Campos: id, description, amount, date, categoryId, accountId, financialType ("cash" \| "commitment" \| "invoice"), status ("pending" \| "posted" \| "paid"), parentTransactionId, invoiceId, recurrenceId. Substituir o modelo atual no código. |
| 2.2 | **Entidade InvoiceItem** | Coleção `invoice_items`; compra no crédito gera item; fatura soma itens. |
| 2.3 | **Motor de saldo (funções puras)** | Módulo com: getTransactionsThatAffectBalance, calculateAccountBalance, calculateTotalBalance, getCommitments. Apenas cash + posted alteram saldo. |
| 2.4 | **Serviços alinhados ao motor** | transactionService (e leitura de contas) usam o novo modelo e o motor; nenhum cálculo de saldo fora do motor. |
| 2.5 | **Migração de dados** | Mapear transações antigas para o novo modelo (financialType, status, amount, accountId). |

---

## FASE 3 — Transações UI

Só após Fase 2 concluída.

| # | Etapa |
|---|--------|
| 3.1 | Filtros (período, categoria, conta, tipo/status) |
| 3.2 | Busca por descrição |
| 3.3 | Editar e excluir transação |

---

## FASE 4 — Crédito, parcelamento e recorrência

| # | Etapa |
|---|--------|
| 4.1 | Parcelamento gera commitments (e cash na parcela atual, se aplicável) |
| 4.2 | Recorrência gera commitments para as próximas ocorrências |
| 4.3 | Cartão: compra → invoice_item; fechar fatura; pagar fatura → transação cash |

---

## FASE 5 — Planejamento (orçamento e metas)

| # | Etapa |
|---|--------|
| 5.1 | Orçamento por categoria + barra de progresso |
| 5.2 | Assinaturas / metas (usando motor e modelo definitivo) |

---

## FASE 6 — Dashboard

| # | Etapa |
|---|--------|
| 6.1 | Saldo total, “quanto posso gastar”, previsão, gráficos, alertas (todos via motor) |

---

## Resumo

```
Fase 1  ✅ Já existe (auth, contas, categorias, telas atuais)
Fase 2  → Motor financeiro (modelo definitivo + funções puras + serviços) — FAZER AGORA
Fase 3  → UI Transações (filtros, busca, editar, excluir)
Fase 4  → Crédito, parcelamento, recorrência (invoice_items, commitments)
Fase 5  → Planejamento
Fase 6  → Dashboard
```

Nenhuma feature nova de tela (gráficos, orçamento avançado, etc.) deve ser implementada antes da Fase 2 estar concluída.
