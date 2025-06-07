const express = require('express');
const UsuarioService = require('../../application/services/UsuarioService');
const router = express.Router();
const usuarioService = new UsuarioService();


// Rota para criar um novo usuário
router.post('/criar', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await usuarioService.criarUsuario(nome, email, senha);
    res.status(201).json({mensagem : 'Usuário criado com sucesso', usuario: novoUsuario});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;