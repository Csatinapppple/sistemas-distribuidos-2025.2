# Sistema de Autenticação Redis - Demo Universitário

Um sistema completo de autenticação demonstrando como o **Redis** pode ser usado para gerenciamento de sessões em aplicações web. Construído com React (frontend) e Express.js (backend).

## Propósito do Projeto

Este projeto demonstra o papel do Redis na autenticação web através de:

- Armazenamento de sessões de usuário no Redis ao invés de memória ou disco
- Demonstração da velocidade e escalabilidade do Redis para gerenciamento de sessões
- Destaque para expiração automática de sessões com TTL
- Demonstração de como múltiplos servidores podem compartilhar a mesma instância Redis

## Arquitetura

```
┌─────────────┐    Requisições HTTP      ┌─────────────┐
│   React     │ ◄──────────────────────► │   Express   │
│  Frontend   │  (com credenciais)       │   Backend   │
└─────────────┘                          └──────┬──────┘
                                                │
                                                │ Armazenamento de Sessão
                                                ▼
                                         ┌─────────────┐
                                         │    Redis    │
                                         │   Database  │
                                         └─────────────┘
```

## Pré-requisitos

Antes de executar este projeto, certifique-se de ter:

- **Node.js** (v14 ou superior) - [Download](https://nodejs.org/)
- **Redis** (v6 ou superior) - [Guia de Instalação](https://redis.io/download)

### Instalando Redis no macOS:

```bash
brew install redis
brew services start redis
```

### Verificar se o Redis está rodando:

```bash
redis-cli ping
# Deve retornar: PONG
```

## Instruções de Configuração

### 1. Clone e Navegue para o Projeto

### 2. Configuração do Backend

```bash
# Navegue para o diretório backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

O backend será executado em `http://localhost:3001`

Você deve ver:

```
✓ Connected to Redis
✓ Server running on http://localhost:3001
✓ Redis session store enabled
✓ Database initialized with default users
```

### 3. Configuração do Frontend

Abra uma **nova janela de terminal**:

```bash
# Navegue para o diretório frontend
cd frontend

# Instale as dependências
npm install

# Inicie a aplicação React
npm start
```

O frontend será executado em `http://localhost:3000`

## Credenciais de Demonstração

A aplicação vem com usuários pré-configurados:

- **Usuário Admin**

  - Nome de usuário: `admin`
  - Senha: `admin123`

- **Usuário Regular**
  - Nome de usuário: `user`
  - Senha: `user123`

## Como Usar

1. Abra `http://localhost:3000` em seu navegador
2. Faça login usando uma das credenciais de demonstração
3. Visualize suas informações de sessão armazenadas no Redis
4. Veja os benefícios do Redis para gerenciamento de sessões
5. Faça logout para destruir a sessão no Redis

## Como o Redis é Utilizado

### Armazenamento de Sessão

Quando você faz login:

1. Backend valida as credenciais contra `data/users.json`
2. Cria uma sessão e a armazena no Redis com um ID único
3. Cookie de sessão é enviado para o navegador
4. Todas as requisições subsequentes incluem este cookie

### Recuperação de Sessão

Em cada requisição autenticada:

1. Middleware do Express extrai o ID da sessão do cookie
2. Consulta o Redis pelos dados da sessão (latência de microssegundos!)
3. Verifica se o usuário está autenticado
4. Prossegue com a requisição

### Expiração de Sessão

- Redis automaticamente gerencia a expiração da sessão (TTL: 24 horas)
- Nenhuma limpeza manual necessária
- Sessões antigas são automaticamente removidas

### Benefícios Demonstrados

✅ **Velocidade**: Armazenamento em memória fornece tempos de resposta de microssegundos  
✅ **Escalabilidade**: Múltiplos servidores podem compartilhar a mesma instância Redis  
✅ **Persistência**: Sessões sobrevivem a reinicializações da aplicação  
✅ **Auto-expiração**: Gerenciamento TTL (Time To Live) integrado  
✅ **Simplicidade**: Fácil implementação com `connect-redis`

## Estrutura do Projeto

```
trab-grau-b-sistemas-dis/
├── backend/
│   ├── server.js              # Servidor Express com config Redis
│   ├── routes/
│   │   └── auth.js            # Endpoints de autenticação
│   ├── utils/
│   │   └── database.js        # Banco de dados baseado em arquivo
│   ├── data/
│   │   └── users.json         # Dados do usuário (gerado automaticamente)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.js             # Componente principal da app
    │   ├── components/
    │   │   ├── Login.js       # Página de login
    │   │   └── Dashboard.js   # Dashboard protegido
    │   └── services/
    │       └── api.js         # Cliente API com credenciais
    └── package.json
```

## Endpoints da API

### Rotas de Autenticação

#### POST `/api/auth/login`

Login com credenciais

```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### POST `/api/auth/logout`

Destruir sessão no Redis

#### GET `/api/auth/me`

Obter usuário atual (requer autenticação)

#### GET `/api/auth/session-info`

Obter detalhes da sessão Redis (para fins de demonstração)

## Testando a Integração com Redis

### Visualizar Sessões no CLI do Redis

```bash
redis-cli
> KEYS *
> GET "sess:<session-id>"
```

### Monitorar Operações do Redis

```bash
redis-cli monitor
```

Então faça login/logout e observe os comandos Redis em tempo real!

## Pontos de Aprendizado para Apresentação Universitária

1. **Por que Redis para Sessões?**

   - Sessões tradicionais armazenadas em memória não escalam entre servidores
   - Sessões baseadas em arquivo são lentas e não lidam bem com acesso concorrente
   - Sessões em banco de dados adicionam overhead desnecessário
   - Redis fornece o equilíbrio perfeito: rápido, escalável e persistente

2. **Recursos Principais Demonstrados:**

   - Criação e armazenamento de sessão
   - Expiração automática (TTL)
   - Recuperação rápida de sessão
   - Destruição de sessão no logout

3. **Aplicações no Mundo Real:**
   - Sites de e-commerce (carrinhos de compra)
   - Plataformas de mídia social (sessões de usuário)
   - Aplicações bancárias (sessões seguras)
   - Qualquer aplicação web multi-servidor

## Tecnologias Utilizadas

**Backend:**

- Express.js - Framework web
- Redis - Armazenamento de sessões
- connect-redis - Middleware de sessão Redis
- express-session - Gerenciamento de sessão
- bcrypt - Hash de senhas

**Frontend:**

- React - Framework de UI
- Axios - Cliente HTTP
- CSS3 - Estilização
