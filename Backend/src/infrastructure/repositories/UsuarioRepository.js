const { PrismaClient } = require('@prisma/client');
const IUsuarioRepository = require('../../domain/interfaces/IUsuarioRepository');

const prisma = new PrismaClient();

class UsuarioRepository extends IUsuarioRepository {
    async criar(usuario) {
        try {
            return await prisma.usuario.create({
                data: usuario,
            });
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    async buscarPorEmail(email) {
        try {
            return await prisma.usuario.findUnique({
                where: { email },
            });
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
        }
    }
}

module.exports = UsuarioRepository;