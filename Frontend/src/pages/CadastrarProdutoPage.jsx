import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { cadastrarProduto } from "@/services/produtoService";

function CadastrarProdutoPage() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Usuário não autenticado.");
      return;
    }

    if (!nome || !preco || !descricao) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);
    setErro("");

    try {
      await cadastrarProduto(
        {
          nome,
          preco: Number.parseFloat(preco),
          descricao,
        },
        token
      );
      navigate("/produtos");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErro("Usuário não autenticado.");
      } else {
        setErro("Erro ao cadastrar produto. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-9 h-9 text-blue-600" />
              Cadastrar Novo Produto
            </h1>
            <p className="text-sm text-gray-500"></p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Informações do Produto</h2>

        {erro && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {erro}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Produto
            </label>
            <input
              id="nome"
              placeholder="Digite o nome do produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="preco"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preço (R$)
            </label>
            <input
              id="preco"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              placeholder="Descreva o produto..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleCadastro}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : "Cadastrar Produto"}
            </button>
            <button
              onClick={() => navigate("/produtos")}
              disabled={loading}
              className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastrarProdutoPage;
