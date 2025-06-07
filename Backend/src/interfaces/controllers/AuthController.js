const express = require("express");
const AuthService = require("../../application/services/AuthService");

const router = express.Router();
const authService = new AuthService();

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