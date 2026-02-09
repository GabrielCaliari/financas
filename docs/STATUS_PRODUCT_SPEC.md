# Status do Product Spec — App Financeiro Pessoal

Conferência do que **já está no app** e do que **ainda falta** em relação ao PRODUCT SPEC enviado no início do chat.

---

## ✅ Já implementado

### Navegação
- [x] Bottom tabs: Dashboard, Transações, Adicionar (FAB), Planejamento, Perfil

### Modelagem e backend
- [x] Entidades modeladas: User, Wallet, Transaction, Category, Budget, Subscription, CreditCard, Invoice (parcelamento via Transaction)
- [x] Coleções Firestore + serviços por entidade
- [x] Hooks: useWallets, useCategories, useTransactions, useBudgets, useSubscriptions, useCreditCards, useInvoices

### Dashboard
- [x] Saldo total consolidado (soma das carteiras) quando o usuário tem carteiras
- [x] Últimas movimentações (até 10 transações)
- [x] Fallback: sem carteiras, mostra a Home legada (movimentos antigos)
- [x] Empty states educativos

### Transações
- [x] Lista completa de transações (nova coleção)
- [x] Empty state

### Adicionar (FAB)
- [x] Modal com opções: Receita, Despesa (funcionando), Transferência e Cartão (marcados “em breve”)

### Planejamento
- [x] Seção Orçamentos por categoria (lista; sem tela para definir limite)
- [x] Seção Assinaturas (lista)
- [x] Seção Cartões e faturas (lista de cartões com dia fechamento/vencimento)
- [x] Empty states em cada seção

### Perfil
- [x] Dados do usuário, editar perfil, sobre
- [x] Tema claro/escuro
- [x] Logout

### Experiência
- [x] Empty states em listas
- [x] Feedback ao salvar (toast nas telas legadas)

### Diretrizes técnicas
- [x] React Native + Firebase
- [x] Services separados por entidade
- [x] Hooks (useTransactions, useBudget, etc.)
- [x] Regra de negócio fora das telas (serviços)

---

## ❌ Ainda não implementado

### Dashboard
- [ ] **“Quanto posso gastar hoje”**
- [ ] **Previsão até fim do mês**
- [ ] **Gráfico de gastos por categoria**
- [ ] **Gráfico semanal**
- [ ] **Alertas financeiros automáticos**

### Transações
- [ ] **Filtros na UI:** período, categoria, carteira, tipo (receita, despesa, transferência)
- [ ] **Ações por item:** editar, excluir, duplicar
- [ ] **Busca textual por descrição**

### Adicionar
- [ ] **Transferência** (tela/fluxo completo)
- [ ] **Cartão de crédito** (tela/fluxo completo)
- [ ] **Parcelamento automático** (gerar N transações)
- [ ] **Recorrência** (e scheduler para próximas ocorrências)
- [ ] **Categorias** nas telas de receita/despesa (usar `categories` + `categoryId`)
- [ ] **Anexos** (futuro)

### Planejamento
- [ ] **Orçamentos:** tela para definir limite mensal por categoria + **barra de progresso**
- [ ] **Assinaturas:** detecção automática de recorrentes (ou fluxo de cadastro completo)
- [ ] **Faturas:** tela de fatura (fatura atual, próximas, status, pagar)

### Perfil
- [ ] **Carteiras** (CRUD no Perfil ou tela dedicada)
- [ ] **Cartões** (CRUD no Perfil ou tela dedicada)
- [ ] **Exportar dados**

### Regras de negócio
- [ ] **Saldo total** = soma de todas as carteiras **+** considerar faturas pagas (conforme spec)
- [ ] **Compra no crédito** não alterar saldo da carteira imediatamente
- [ ] **Parcelamento** gerar N transações futuras automaticamente
- [ ] **Recorrência** criar próximas ocorrências (ex.: mensal) via scheduler
- [ ] **Transferência** debitar de uma carteira e creditar em outra

### Inteligência / Insights
- [ ] Maior gasto do mês
- [ ] Categoria dominante
- [ ] Comparação com mês anterior
- [ ] Média diária
- [ ] Previsão de saldo negativo

### Experiência
- [ ] **Skeleton loading** (em vez de só ActivityIndicator onde couber)
- [ ] **Dados de exemplo no primeiro acesso** (onboarding com dados demo)

### Técnico
- [ ] **Preparar para modo offline** (cache, sync, etc.)

---

## Resumo

| Área              | Feito | Falta |
|-------------------|-------|--------|
| Navegação         | 100%  | –      |
| Modelagem/serviços| 100%  | –      |
| Dashboard         | ~40%  | gastos hoje, previsão, gráficos, alertas |
| Transações        | ~30%  | filtros, editar/excluir/duplicar, busca |
| Adicionar         | ~35%  | transferência, cartão, parcelamento, recorrência, categorias |
| Planejamento      | ~40%  | definir orçamento + progresso, faturas completas |
| Perfil            | ~60%  | carteiras, cartões, exportar |
| Regras de negócio | ~20%  | saldo com faturas, crédito, parcelamento, recorrência, transferência |
| Insights          | 0%    | todos os itens |
| UX (skeleton, demo)| ~25% | skeleton, dados exemplo |
| Offline           | 0%    | preparação |

**Conclusão:** a base (navegação, modelagem, serviços, hooks e telas principais) está feita. A maior parte das **funcionalidades de produto** (fluxos completos, filtros, insights, regras de crédito/parcelamento/recorrência/transferência) e **refino de UX** (skeleton, dados de exemplo, offline) ainda não está no app.

---

## Ordem de implementação (em aplicação)

**Fase 1 – Base (Perfil + dados para o resto)**  
1. Carteiras no Perfil (CRUD)  
2. Categorias nas telas receita/despesa  
3. Transferência (fluxo completo)  

**Fase 2 – Transações**  
4. Filtros (período, categoria, carteira, tipo)  
5. Editar, excluir, duplicar  
6. Busca por descrição  

**Fase 3 – Adicionar**  
7. Parcelamento automático  
8. Recorrência  
9. Cartão de crédito + faturas no fluxo  

**Fase 4 – Planejamento**  
10. Orçamentos: definir limite + barra de progresso  
11. Assinaturas: cadastro completo  
12. Faturas: tela (pagar, status)  

**Fase 5 – Regras + Dashboard**  
13. Saldo total (carteiras + faturas pagas)  
14. Crédito não altera saldo  
15. Quanto posso gastar hoje  
16. Previsão até fim do mês  
17. Gráficos (categoria, semanal)  
18. Alertas financeiros  

**Fase 6 – Insights**  
19. Maior gasto, categoria dominante, comparação, média, previsão negativa  

**Fase 7 – Perfil + UX**  
20. Cartões no Perfil (CRUD)  
21. Exportar dados  
22. Skeleton loading  
23. Dados de exemplo no primeiro acesso  
24. Preparar modo offline  
