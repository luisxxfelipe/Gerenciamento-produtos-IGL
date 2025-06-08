const express = require("express");
const AuthService = require("../../application/services/AuthService");

const router = express.Router();
const authService = new AuthService();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const token = await authService.login(email, senha);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;