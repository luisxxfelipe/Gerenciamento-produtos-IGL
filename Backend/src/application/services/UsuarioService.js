const bcrypt = require('bcryptjs');
const UsuarioRepository = require('../../infrastructure/repositories/UsuarioRepository');


class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async criarUsuario(nome, email, senha) {
    // Verificar se o usuário já existe
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error('Usuário já existe');
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Criar o usuário
    const novoUsuario = await this.usuarioRepository.criar({
      nome,
      email,
      senha: senhaCriptografada,
    });

    return novoUsuario;
  }
}

module.exports = UsuarioService;