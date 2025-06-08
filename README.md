# Desafio Técnico - Grupo IGL

Este projeto é uma aplicação Fullstack para **gerenciamento de produtos com autenticação**, desenvolvida como parte do processo seletivo para a vaga de **Desenvolvedor Fullstack** no Grupo IGL.

---

## Tecnologias Utilizadas

### Backend
- **Node.js** com **Express**
- **PostgreSQL**
- **JWT** para autenticação
- Arquitetura baseada em **DDD**
- Princípios **SOLID**
- Estrutura modular com separação de responsabilidades

### Frontend
- **React**
- **shadcn/ui**
- **Axios**
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

# Rode o servidor
npm run dev
```

### Frontend

```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Rode o frontend
npm run dev
```

---

## Documentação da API

### Autenticação
- `POST /auth/login`: Realiza login do usuário
- `POST /auth/registrar`: Cria um novo usuário

### Produtos
- `GET /listar-produtos`: Lista todos os produtos do usuário autenticado
- `POST /cadastrar-produtos`: Cadastra novo produto
- `PUT /editar-produtos/:id`: Edita produto existente
- `DELETE /excluir-produtos/:id`: Remove produto