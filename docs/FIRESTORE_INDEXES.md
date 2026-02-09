# Índices do Firestore

O app usa consultas no Firestore que exigem **índices compostos**. Se você ver o erro *"Não foi possível carregar as movimentações"* e no console (Metro/terminal) aparecer uma mensagem sobre *"index"* ou *"failed-precondition"*, pode ser índice faltando ou projeto diferente.

**Se o índice já aparece como "Ativado" no Console mas o app ainda pede o índice:**
- Confirme que o app está usando **o mesmo projeto** do Firebase em que você criou o índice. No Android, o projeto está em `android/app/google-services.json` (campo `project_id`). No Firebase Console, veja o nome do projeto no topo.
- Feche o app por completo e abra de novo (ou desinstale e instale de novo) para evitar cache.
- Abra o link que aparece no terminal: às vezes a página do Firebase pede um índice com **ordem de campo diferente** (ex.: `date` ascendente em vez de descendente). Crie esse índice também se for o caso.

## Como criar os índices

### Opção 1: Pelo link do erro (recomendado)

1. Rode o app e vá até a tela Home (onde aparecem as movimentações).
2. Quando o erro ocorrer, olhe no **terminal onde o Metro está rodando** (ou no log do React Native).
3. A mensagem de erro do Firestore costuma incluir um **link** (começa com `https://console.firebase.google.com/...`).
4. Abra esse link no navegador, faça login no Firebase se precisar, e clique em **"Criar índice"**.
5. Aguarde alguns minutos até o índice ficar "Ativo" no Firebase Console.
6. Feche o app e abra de novo, ou puxe para atualizar a lista.

### Opção 2: Manualmente no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/) e selecione o projeto do app.
2. No menu lateral: **Firestore Database** → aba **Índices** → **Índice composto** → **Criar índice**.
3. Crie os índices abaixo.

#### Coleção `movements`

**Índice 1 – listagem por data (Home)**

- Coleção: `movements`
- Campos:
  - `userId` – Ascendente
  - `date` – Descendente
- Escopo: Coleção

**Índice 2 – receitas por data (BalanceR)**

- Coleção: `movements`
- Campos:
  - `userId` – Ascendente
  - `type` – Ascendente
  - `date` – Descendente
- Escopo: Coleção

**Índice 3 – despesas por data (BalanceD)**

- Mesmo que o Índice 2 (o campo `type` já cobre receita e despesa).

#### Coleção `transactions` (modelo definitivo / Fase 2)

**Índice 4 – listagem por usuário e data**

- Coleção: `transactions`
- Campos:
  - `userId` – Ascendente
  - `date` – Descendente
- Escopo: Coleção

**Índice 5 – filtro por conta (accountId)**

- Coleção: `transactions`
- Campos:
  - `userId` – Ascendente
  - `accountId` – Ascendente
  - `date` – Descendente
- Escopo: Coleção

**Índice 6 – filtro por conta legada (walletId)**

- Coleção: `transactions`
- Campos:
  - `userId` – Ascendente
  - `walletId` – Ascendente
  - `date` – Descendente
- Escopo: Coleção

*(Se usar filtros adicionais como `financialType`, `categoryId` ou intervalo de datas, o console do Firebase pode pedir outros índices compostos; use o link do erro para criá-los.)*

Depois de criar e esperar o índice ficar ativo, o carregamento das movimentações e transações deve funcionar.
