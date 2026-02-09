# 💰 Financas

App de controle financeiro pessoal para Android e iOS, desenvolvido com React Native. Gerencie receitas e despesas, acompanhe seu saldo por período e mantenha suas finanças organizadas.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## 📌 Funcionalidades

### 🔐 Autenticação

- **Tela inicial** – Boas-vindas e acesso ao login ou cadastro
- **Login** – Acesso com e-mail e senha (Firebase Auth)
- **Cadastro** – Criação de conta com nome, e-mail e senha

### 📊 Controle financeiro

- **Home** – Visão geral do saldo e movimentações do dia
- **Saldo por data** – Filtro por data com calendário
- **Receitas** – Registrar e listar receitas (descrição, valor, método de pagamento, data)
- **Despesas** – Registrar e listar despesas com os mesmos campos
- **Métodos de pagamento** – Dinheiro, Crédito, Débito e Pix
- **Editar e excluir** – Atualizar ou remover movimentações

### 👤 Perfil

- **Perfil do usuário** – Nome, avatar e opções
- **Editar perfil** – Alterar nome e foto (upload para Firebase Storage)
- **Informações** – Tela de informações do app
- **Logout** – Sair da conta

### 🔔 Outros

- **Notificações** – Suporte a permissões (Notifee)
- **Dados em nuvem** – Sincronização via Firebase Firestore e Storage

## 🚀 Como usar

### Pré-requisitos

- Node.js >= 18
- React Native [ambiente configurado](https://reactnative.dev/docs/environment-setup) (Android Studio e/ou Xcode)
- Conta e projeto no [Firebase](https://console.firebase.google.com) com Auth, Firestore e Storage ativados

### Configuração do Firebase

1. Crie um projeto no Firebase e ative **Authentication** (e-mail/senha), **Firestore** e **Storage**.
2. No Android: coloque o `google-services.json` em `android/app/`.
3. No iOS: adicione o `GoogleService-Info.plist` no projeto no Xcode.

### Instalação e execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/GabrielCaliari/financas
   cd financas
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. (Opcional) Para iOS, instale os pods:

   ```bash
   cd ios && pod install && cd ..
   ```

4. Inicie o Metro:

   ```bash
   npm start
   ```

5. Em outro terminal, rode o app:

   **Android:**

   ```bash
   npm run android
   ```

   **iOS:**

   ```bash
   npm run ios
   ```

## 💻 Tecnologias

- **React Native** 0.72 – aplicativo móvel
- **TypeScript** – tipagem estática
- **Firebase** – Auth, Firestore, Storage
- **React Navigation** – Bottom Tabs, Native Stack
- **Styled Components** – estilização
- **React Hook Form** + **Yup** – formulários e validação
- **date-fns** – datas
- **react-native-calendars** – calendário para filtro por data
- **Notifee** – notificações locais
- **react-native-vector-icons** – ícones
- **react-native-image-picker** – seleção de foto do perfil

## 🌟 Funcionalidades principais

- Interface com abas (Home, Adicionar, Perfil) e modal para escolher Receita ou Despesa
- Navegação por telas de receitas e despesas com filtro por data
- Autenticação e perfil persistidos com Firebase
- Dados de movimentações e usuário na nuvem (Firestore e Storage)
- Edição e exclusão de movimentações
- Layout preparado para uso no dia a dia

## 📂 Estrutura do projeto

```
src/
├── assets/          # Imagens (logo, avatar, cover)
├── components/      # Componentes reutilizáveis (Header, modais, calendário, listas, etc.)
├── contexts/       # Contexto de autenticação (AuthContext)
├── pages/          # Telas (Home, SignIn, SignUp, New, Profile, BalanceR, BalanceD, etc.)
├── routes/         # Rotas (auth e app com tabs e stack)
└── services/       # Serviços (Firebase, auth, movimentações, usuário, storage)
```

## 🛠 Scripts úteis

| Comando           | Descrição                |
|-------------------|--------------------------|
| `npm start`       | Inicia o Metro Bundler   |
| `npm run android` | Roda o app no Android   |
| `npm run ios`     | Roda o app no iOS       |
| `npm run lint`    | Executa o ESLint        |
| `npm test`        | Executa os testes (Jest) |
| `npm run clean`   | Limpa o build Android   |

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

