const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');

const authController = require("./interfaces/controllers/AuthController.js");
const usuarioController = require("./interfaces/controllers/UsuarioController.js");
const produtoController = require("./interfaces/controllers/ProdutoController.js");

const { swaggerUi, specs } = require('./config/swagger.js');

dotenv.config();
const app = express();
app.use(json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da API
app.use('/auth', authController);      // login
app.use('/auth', usuarioController);   // registro
app.use(produtoController);            // produtos

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
