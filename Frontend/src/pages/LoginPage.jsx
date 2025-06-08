import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/usuarioService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Os campos de email e senha são obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await login(email, senha);
      const dados = response.data;

      localStorage.setItem("token", dados.token);
      window.location.href = "/produtos";
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro ao fazer login.");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto flex items-center justify-center border border-blue-600 rounded-full">
            <img
              src="/Prodex.svg"
              alt="Logo"
              className="w-9 h-9 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Bem-vindo de volta ao Prodex!
          </h1>
          <p className="text-gray-600 mt-2">
            Entre com suas credenciais para continuar
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <span>❌</span>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          </div>

          <div>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Prodex - Sistema de Gerenciamento de Produtos
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
