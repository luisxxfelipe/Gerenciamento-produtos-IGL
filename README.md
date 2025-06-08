# Desafio Técnico - Grupo IGL

Este projeto é uma aplicação Fullstack para **gerenciamento de produtos com autenticação**, desenvolvida como parte do processo seletivo para a vaga de **Desenvolvedor Fullstack** no Grupo IGL. Aqui demonstro as tecnologias utilizadas, decisões tomadas, ferramentas de IA de auxílio, dificuldades e como executar o projeto.

---

## Tecnologias Utilizadas

### Backend
- **Node.js** com **Express** -> por ser uma estrutura leve e direta para criar APIs REST de forma mais simples
- **PostgreSQL** -> banco de dados relacional para armazenamento de dados
- **Prisma ORM**: evitar a manipulação direta do banco de dados, com segurança de tipos e facilidade em criar queries, migrações e modelos.
- **JWT** para autenticação -> metodo de autenticação segura, com controle por tokens
- Arquitetura baseada em **DDD** -> organização e facilidade na manutenção, cada um com sua determinada função
- Princípios **SOLID**
- Estrutura modular com separação de responsabilidades

### Frontend
- **React + Vite** -> desempenho, praticidade
- **Axios** -> requisções de GET, POST, PUT, DELETE
- **React Router DOM**
- Interface responsiva

---

## Funcionalidades

### Backend
- [x] Autenticação com JWT
- [x] Cadastro e login de usuários
- [x] CRUD completo de produtos
- [x] Relacionamento entre produtos e usuários
- [x] Validações de entrada
- [x] Estrutura organizada por camadas (controller, service, repository, etc.)

### Frontend
- [x] Tela de login
- [x] Tela de cadastro de usuário
- [x] Tela de listagem de produtos
- [x] Modal de edição de produto
- [x] Modal de confirmação para exclusão
- [x] Filtros de busca e faixa de preço

---

## Como executar o projeto

### Backend

```bash
# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie o arquivo .env e configure com seus dados:
# PORT=3001
# JWT_SECRET=sua_chave_secreta
# DB_HOST=localhost
# DB_USER=seu_usuario
# DB_PASSWORD=sua_senha
# DB_DATABASE=igl

# Rode as migrations:
npx prisma migrate dev --name init

# Rode o servidor
node src/server.js

# Acesse a documentação da API em: http://localhost:3333/api-docs
```

### Frontend

```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Rode o frontend
npm run dev

# Acesse em: http://localhost:5173
```

---

## A API está documentada via Swagger em `/api-docs`. Lá é possível testar endpoints, enviar payloads e visualizar retornos, incluindo as rotas protegidas com autenticação JWT.

### Autenticação
- `POST /auth/login`: Realiza login do usuário
- `POST /auth/registrar`: Cria um novo usuário

### Produtos
- `GET /listar-produtos`: Lista todos os produtos do usuário autenticado
- `POST /cadastrar-produtos`: Cadastra novo produto
- `PUT /editar-produtos/:id`: Edita produto existente
- `DELETE /excluir-produtos/:id`: Remove produto

## Decisões Arquiteturais

- **Separação por camadas**:
  - `interfaces/controllers`: rotas da API
  - `services`: regras de negócio
  - `middleware`: lógica de autenticação
  - `config`: configuração de Swagger
  - `prisma`: acesso ao banco de dados
- Organização do frontend por **páginas**, com serviços centralizados na pasta `services` para reaproveitamento de chamadas.


## Dificuldades Enfrentadas

- **Integração do Swagger** com autenticação protegida (Bearer Token)
  - Resolvido após configuração do `securitySchemes` e definição correta nos comentários `@swagger`.
- **Relacionar o token ao usuário autenticado** (inserção do `req.userId` via middleware JWT)
  - Resolvido usando `jsonwebtoken` para extrair o ID do usuário e injetar no request.
- **Validação de campos e tratamento de erros** tanto no backend quanto no frontend.
  - Foram aplicadas mensagens de erro visuais e estrutura `try/catch` com `setError`.

## Uso de IA

Durante o desenvolvimento, utilizei uma IA (ChatGPT) para:

- Obter **auxílio na configuração do Swagger** com segurança JWT incluída.
- Esclarecer a estrutura e **lógica do middleware com JWT**, especialmente extração do `userId` do token.
- Obter ajuda em **ajustes visuais e organizacionais** com **Tailwind CSS e componentes do Shadcn**, mantendo o código limpo e responsivo.
- Revisar a **estrutura em camadas** e fornecer recomendações arquiteturais.

- A IA foi usada como ferramenta de apoio técnico e boas práticas.


