const express = require("express");
const ProdutoService = require("../../application/services/ProdutoService");
const verifyToken = require("../middleware/verifytoken");
const router = express.Router();
const produtoService = new ProdutoService();


// Rota para criar um novo produto
router.post("/cadastrar-produtos", verifyToken, async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const novoProduto = await produtoService.criarProduto({
      nome,
      preco,
      descricao,
      usuarioId : req.usuarioId, // Obtém o ID do usuário autenticado
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Rota para listar todos os produtos
router.get("/listar-produtos", verifyToken, async (req, res) => {
  try {
    const produtos = await produtoService.listarProdutos(req.usuarioId);
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

// Rota para editar um produto
router.put("/editar-produto/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const produtoAtualizado = await produtoService.editarProduto(
      id,
      dadosAtualizados
    );
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

// Rota para excluir um produto
router.delete("/excluir-produto/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await produtoService.excluirProduto(id);
    res.status(200).json({ mensagem: "Produto excluído com sucesso" });
  } catch (error) {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

module.exports = router;
