const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');
const authController = require("./interfaces/controllers/AuthController.js");
const usuarioController = require("./interfaces/controllers/UsuarioController.js");
const produtoController = require("./interfaces/controllers/ProdutoController.js");


dotenv.config();
const app = express();
app.use(json());
app.use(cors());

// aqui temos as rotas do servidor
app.use('/auth', authController); //responsavel por autenticação
app.use('/auth', usuarioController); //responsavel por registrar usuários
app.use(produtoController); //responsavel por produtos


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

