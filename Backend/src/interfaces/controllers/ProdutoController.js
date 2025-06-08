const express = require("express");
const ProdutoService = require("../../application/services/ProdutoService");
const verifyToken = require("../middleware/verifytoken");
const router = express.Router();
const produtoService = new ProdutoService();

/**
 * @swagger
 * /cadastrar-produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Produto teste
 *               preco:
 *                 type: number
 *                 example: 99.90
 *               descricao:
 *                 type: string
 *                 example: Um produto de teste
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       500:
 *         description: Erro ao criar produto
 */
router.post("/cadastrar-produtos", verifyToken, async (req, res) => { // Rota para criar um novo produto
  try {
    const { nome, preco, descricao } = req.body;
    const novoProduto = await produtoService.criarProduto({
      nome,
      preco,
      descricao,
      usuarioId : req.userId, // Obtém o ID do usuário autenticado
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

/**
 * @swagger
 * /listar-produtos:
 *   get:
 *     summary: Lista todos os produtos do usuário autenticado
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *       500:
 *         description: Erro ao listar produtos
 */
router.get("/listar-produtos", verifyToken, async (req, res) => { // Rota para listar todos os produtos
  try {
    const produtos = await produtoService.listarProdutos(req.userId);
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

/**
 * @swagger
 * /editar-produto/{id}:
 *   put:
 *     summary: Edita um produto existente
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.put("/editar-produto/:id", verifyToken, async (req, res) => { // Rota para editar um produto
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

/**
 * @swagger
 * /excluir-produto/{id}:
 *   delete:
 *     summary: Exclui um produto existente
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/excluir-produto/:id", verifyToken, async (req, res) => { // Rota para excluir um produto
  try {
    const { id } = req.params;
    await produtoService.excluirProduto(id);
    res.status(200).json({ mensagem: "Produto excluído com sucesso" });
  } catch (error) {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

module.exports = router;
