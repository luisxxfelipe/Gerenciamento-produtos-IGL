const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProdutoService {
  async criarProduto({ nome, preco, descricao, usuarioId }) {
    const produtos = await prisma.produto.create({
      data: {
        nome,
        preco,
        descricao,
        usuarioId,
      },
    });

    return produtos;
  }

  async listarProdutos(usuarioId) {
    const produtos = await prisma.produto.findMany({
      where: {
        usuarioId: Number(usuarioId),
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    return produtos;
  }

  async editarProduto(id, dadosAtualizados) {
    const verificarProduto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!verificarProduto) {
      throw new Error("Produto não encontrado");
    }

    const dadoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: dadosAtualizados,
    });

    return dadoAtualizado;
  }

  async excluirProduto(id) {
    const verificarProduto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    });

    if (!verificarProduto) {
      throw new Error("Produto não encontrado");
    }

    await prisma.produto.delete({
      where: { id: Number(id) },
    });

    return { mensagem: "Produto excluído com sucesso" };
  }
}

module.exports = ProdutoService;
