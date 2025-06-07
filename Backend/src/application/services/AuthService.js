const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../../infrastructure/repositories/UsuarioRepository');

class AuthService {
  constructor() {
    this.UsuarioRepository = new UsuarioRepository();
  }

  async login(email, senha) {
    // Verificar se o usuário existe de fato
    const usuario = await this.UsuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Verificar se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new Error("Senha incorreta");
    }

    // Gerar o token JWT com o id
    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // O token expira em um dia
    );

    return token;
  }
}

module.exports = AuthService;
