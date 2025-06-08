const express = require('express');
const UsuarioService = require('../../application/services/UsuarioService');
const router = express.Router();
const usuarioService = new UsuarioService();

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro no cadastro
 */
router.post('/registrar', async (req, res) => { // Rota para criar um novo usuário
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await usuarioService.criarUsuario(nome, email, senha);
    res.status(201).json({mensagem : 'Usuário criado com sucesso', usuario: novoUsuario});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;