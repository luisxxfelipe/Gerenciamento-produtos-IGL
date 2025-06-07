class IUsuarioRepository{
    async criar(usuario) {
        throw new Error("Método não implementado");
    }

    async buscarPorEmail(email) {
        throw new Error("Método não implementado");
    }
}

module.exports = IUsuarioRepository;