# Plano de Redesign – App Financas (Cifro)

Objetivo: deixar o app com visual **sério/corporativo**, alinhado à identidade da logo (preto, verde, vermelho, amarelo), com **tema claro e escuro** e **padronização** em todas as telas pós-login.

---

## 1. Sistema de tema (como fazer preto + verde em claro e escuro)

A logo usa **preto** (fundo), **branco** (texto), **verde**, **vermelho** e **amarelo**. Para um único arquivo de tema que funcione nos dois modos:

- **Cores de marca (fixas)**  
  Usadas em ambos os modos, só onde fizer sentido:
  - `brandBlack` – preto da logo  
  - `brandGreen` – verde principal  
  - `brandGreenDark` – verde mais escuro (para fundos de botão no modo claro)  
  - `brandRed` – vermelho (despesas, cancelar, alertas)  
  - `brandYellow` – amarelo (destaques secundários, não o FAB)

- **Cores semânticas (mudam com o modo)**  
  O “preto e verde” da logo viram **papéis** diferentes em cada modo:

  **Modo escuro**
  - Fundo da tela = preto / cinza muito escuro (`#121212` ou similar) → **preto da logo como fundo**
  - Cards/superfícies = cinza escuro (`#1e1e1e`)  
  - Texto = branco / cinza claro  
  - Cor primária (botões, links, ícone ativo) = **verde** da logo  

  **Modo claro**
  - Fundo da tela = branco / off-white → **branco da logo como fundo**
  - Cards/superfícies = cinza bem claro  
  - Texto = preto / cinza escuro → **preto da logo como texto**
  - Cor primária = **verde escuro** (boa leitura em fundo claro)

Assim, em **ambos** os modos a identidade é **preto + verde**: no escuro o preto é o fundo e o verde o destaque; no claro o preto é o texto e o verde continua como cor primária. O tema fica em um único objeto (ex.: `theme.dark` e `theme.light`) e os componentes usam apenas variáveis do tema, sem cores hardcoded.

---

## 2. FAB (botão “Adicionar”)

Para um app **sério/corporativo**, o FAB em **amarelo** chama muita atenção e pode parecer mais “promo” do que “gestão”.

- **Recomendação:** FAB na **cor primária (verde)**.  
  - Mantém a ação principal alinhada à marca e transmite mais seriedade.  
  - O **amarelo** da logo pode aparecer em outros pontos (destaques, ícones secundários, pequenos acentos), sem ser o botão principal.

Se no futuro quiser testar, dá para usar um amarelo mais contido (âmbar/dourado) no FAB, mas o padrão do plano é **verde**.

---

## 3. Escopo – o que será alterado

### Telas que **não** serão alteradas (já aprovadas)
- **Initial** – tela inicial (antes de logar)
- **SignIn** – login
- **SignUp** – cadastro

### Telas e fluxos que **serão** padronizados (pós-login)
- **Home** – boas-vindas, últimas movimentações
- **Perfil (Profile)** – avatar, “Editar perfil”, “Sobre”, “Sair”
- **Adicionar** – modal Receita / Despesa (e botão FAB na tab bar)
- **Registrando receita (New)** – valor, descrição, método de pagamento
- **Registrando despesa (NewTwo)** – idem
- **BalanceR** – lista/filtro de receitas por data
- **BalanceD** – lista/filtro de despesas por data
- **UserProfileEdit** – editar perfil
- **Info** – sobre o app

### Componentes compartilhados (usados nas telas acima)
- Header, Avatar, CustomDrawer (tab bar + FAB)
- CustomModal, CustomModalCreate, CustomModalUpdate, CustomModalDelete
- CustomModalCreate (modal “Adicionar”)
- CalendarModal, HistoricList, BalanceItem, FilterR, FilterD
- RegisterTypes, RegisterTypesD, InputControl, Separator

Todas essas telas e componentes passarão a usar o **mesmo sistema de tema** (cores, espaçamentos, tipografia) para ficar tudo padronizado.

---

## 4. Melhorias de UX incluídas no plano

- **Empty states** – quando não houver movimentações, exibir mensagem e ilustração/ícone em vez de área vazia.
- **Feedback ao salvar** – confirmação visual (toast ou mensagem breve) ao registrar/editar/excluir.
- **Hierarquia na Home** – saldo ou resumo do dia em destaque; lista de movimentações com título e espaçamento claros.
- **Modal “Adicionar”** – ícones e textos consistentes (ex.: ícone de receita e de despesa), botão Cancelar com estilo de link secundário em vez de vermelho forte.
- **Navegação** – barra inferior e FAB com mesmas cores do tema (ativo = verde; inativo = cinza do tema).
- **Formulários (New / NewTwo)** – labels, campos e botão “Registrar” com estilo do tema; “Cancelar” como ação secundária.
- **Perfil** – opções “Editar perfil”, “Sobre”, “Sair” com mesmo padrão visual (ícones + texto) e espaçamento consistente.

---

## 5. Ordem de implementação sugerida

1. **Tema e tipografia**
   - Criar `src/theme/` com:
     - `colors.ts` – paleta (dark + light) e cores de marca
     - `spacing.ts` (opcional) – espaçamentos padrão
     - `typography.ts` – fontes (sistema ou customizada) e tamanhos
   - Criar contexto `ThemeContext` (claro/escuro) e persistir preferência (ex.: AsyncStorage).
   - Atualizar **App.tsx** (ou ponto de entrada) para envolver o app no `ThemeProvider`.

2. **Componentes base**
   - Padronizar Header, botões, cards e inputs usando o tema.
   - Ajustar CustomDrawer (tab bar + FAB em verde).
   - Padronizar modais (Adicionar, CustomModal, Create, Update, Delete) com cores e tipografia do tema.

3. **Telas (uma a uma, na ordem abaixo)**
   - Home → New / NewTwo → BalanceR / BalanceD → Profile → UserProfileEdit → Info.
   - Em cada tela: trocar cores hardcoded por variáveis do tema e aplicar espaçamento/tipografia.

4. **UX**
   - Implementar empty states (Home e listas de receita/despesa).
   - Adicionar feedback ao salvar (toast ou similar).
   - Revisar hierarquia e textos do modal “Adicionar”.

5. **Finalização**
   - Testar alternância tema claro/escuro em todas as telas.
   - Marcar no **README.md** o item “Modo escuro” com [X].

---

## 6. Resumo técnico

| Item | Decisão |
|------|--------|
| Identidade | Preto + verde como base; vermelho para despesas/cancelar; amarelo em acentos |
| Modos | Claro e escuro, selecionável pelo usuário |
| FAB | Cor primária (verde) |
| Fonte | Avaliar fonte customizada (ex.: uma sans-serif moderna) para melhorar leitura e seriedade |
| Ícones | Manter react-native-vector-icons; padronizar estilo (ex.: outline) e cores do tema |
| Tema | Um único objeto (dark/light) em `src/theme/`; componentes só usam tema, sem hex fixo |

Quando você quiser, podemos começar pela **etapa 1 (tema + contexto de tema)** e depois ir tela por tela.
