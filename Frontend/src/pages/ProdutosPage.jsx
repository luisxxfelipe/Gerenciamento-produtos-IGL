import { useEffect, useState } from "react";
import {
  Package,
  Search,
  User,
  Hash,
  Pencil,
  Trash2,
  X,
  Loader2,
  PlusCircle,
  AlertTriangle,
  Save,
} from "lucide-react";
import {
  listarProdutos,
  excluirProduto as excluirProdutoAPI,
  atualizarProduto,
} from "@/services/produtoService";

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAcao, setLoadingAcao] = useState(false);
  const [error, setError] = useState(null);
  const [busca, setBusca] = useState("");
  const [filtroPreco, setFiltroPreco] = useState("");

  // Filtro de produtos
  useEffect(() => {
    let produtosFiltrados = produtos;

    if (busca) {
      produtosFiltrados = produtosFiltrados.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (filtroPreco) {
      produtosFiltrados = produtosFiltrados.filter((produto) => {
        if (filtroPreco === "ate100") return produto.preco <= 100;
        if (filtroPreco === "100a500")
          return produto.preco > 100 && produto.preco <= 500;
        if (filtroPreco === "500a1000")
          return produto.preco > 500 && produto.preco <= 1000;
        if (filtroPreco === "acima1000") return produto.preco > 1000;
        return true;
      });
    }

    setProdutosFiltrados(produtosFiltrados);
  }, [produtos, busca, filtroPreco]);

  const abrirModal = (produto) => {
    setProdutoSelecionado({ ...produto });
    setMostrarModal(true);
  };

  const confirmarExclusao = (produto) => {
    setProdutoParaExcluir(produto);
    setMostrarConfirmacao(true);
  };

  const excluirProduto = async () => {
    if (!produtoParaExcluir) return;

    setLoadingAcao(true);
    const token = localStorage.getItem("token");

    try {
      await excluirProdutoAPI(produtoParaExcluir.id, token);

      setProdutos((prev) =>
        prev.filter((produto) => produto.id !== produtoParaExcluir.id)
      );

      setMostrarConfirmacao(false);
      setProdutoParaExcluir(null);
    } catch {
      setError("Erro ao excluir produto. Tente novamente.");
    } finally {
      setLoadingAcao(false);
    }
  };

  const salvarEdicao = async () => {
    if (!produtoSelecionado) return;

    setLoadingAcao(true);
    const token = localStorage.getItem("token");

    try {
      const produtoAtualizado = {
        id: produtoSelecionado.id,
        nome: produtoSelecionado.nome,
        preco: parseFloat(produtoSelecionado.preco),
        descricao: produtoSelecionado.descricao,
      };

      await atualizarProduto(produtoAtualizado.id, produtoAtualizado, token);

      setProdutos((prev) =>
        prev.map((p) => (p.id === produtoAtualizado.id ? produtoAtualizado : p))
      );

      setMostrarModal(false);
      setProdutoSelecionado(null);
    } catch {
      setError("Erro ao editar produto.");
    } finally {
      setLoadingAcao(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado. Por favor, faça login.");
      setLoading(false);
      return;
    }

    listarProdutos(token)
      .then((response) => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao buscar produtos. Tente novamente mais tarde.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              Produtos
            </h1>
            <p className="text-sm text-gray-500">
              {produtosFiltrados.length} de {produtos.length} produtos
            </p>

            {/* Botão dentro da seção do título */}
            <div className="mt-4">
              <button
                onClick={() => (window.location.href = "/cadastrar")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Cadastrar Produto
              </button>
            </div>
          </div>

          {/* Seção dos filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            <select
              value={filtroPreco}
              onChange={(e) => setFiltroPreco(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os preços</option>
              <option value="ate100">Até R$ 100</option>
              <option value="100a500">R$ 100 - R$ 500</option>
              <option value="500a1000">R$ 500 - R$ 1.000</option>
              <option value="acima1000">Acima de R$ 1.000</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          ❌ {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-4 h-4 animate-spin" />
          Carregando produtos...
        </div>
      )}

      {/* lista de produtos */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {produto.nome}
                </h3>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                  R$ {produto.preco.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{produto.descricao}</p>

              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Por: {produto.usuario?.nome}
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  ID: #{produto.id}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => abrirModal(produto)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded text-sm font-medium"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => confirmarExclusao(produto)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Caso ainda nao encontre nenhum produto */}
      {!loading && produtosFiltrados.length === 0 && produtos.length > 0 && (
        <div className="bg-white text-center py-12 rounded-lg shadow">
          <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500">Tente ajustar os filtros de busca</p>
        </div>
      )}

      {!loading && produtos.length === 0 && (
        <div className="bg-white text-center py-12 rounded-lg shadow">
          <Package className="w-10 h-10 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum produto cadastrado
          </h3>
          <p className="text-gray-500 mb-4">
            Comece cadastrando seu primeiro produto
          </p>
          <button
            onClick={() => (window.location.href = "/cadastrar")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Cadastrar Produto
          </button>
        </div>
      )}

      {/* Aqui abre o modal de edição */}
      {mostrarModal && produtoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Pencil className="w-5 h-5" />
                  Editar Produto
                </h2>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={produtoSelecionado.nome}
                    onChange={(e) =>
                      setProdutoSelecionado({
                        ...produtoSelecionado,
                        nome: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={produtoSelecionado.preco}
                    onChange={(e) =>
                      setProdutoSelecionado({
                        ...produtoSelecionado,
                        preco: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    value={produtoSelecionado.descricao}
                    onChange={(e) =>
                      setProdutoSelecionado({
                        ...produtoSelecionado,
                        descricao: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setMostrarModal(false)}
                  disabled={loadingAcao}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarEdicao}
                  disabled={loadingAcao}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  {loadingAcao ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aqui abre o modal para confirmar exclusao */}
      {mostrarConfirmacao && produtoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <div className="text-center mb-4">
                <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Confirmar exclusão
                </h3>
                <p className="text-sm text-gray-500">
                  Esta ação não pode ser desfeita
                </p>
              </div>

              <p className="text-gray-700 mb-6 text-center">
                Tem certeza que deseja excluir o produto{" "}
                <strong>"{produtoParaExcluir.nome}"</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMostrarConfirmacao(false);
                    setProdutoParaExcluir(null);
                  }}
                  disabled={loadingAcao}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={excluirProduto}
                  disabled={loadingAcao}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  {loadingAcao ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProdutosPage;
