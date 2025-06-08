import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { cadastrarUsuario } from "../services/usuarioService"
import { User } from "lucide-react"

function CadastroPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [error, setError] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [loading, setLoading] = useState("")
  const [cadastroSucesso, setCadastroSucesso] = useState(false)
  const navigate = useNavigate()

  const validarFormulario = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      setError("Todos os campos são obrigatórios.")
      return false
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.")
      return false
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return false
    }

    if (!email.includes("@")) {
      setError("Digite um email válido.")
      return false
    }

    return true
  }

  const handleRegister = async () => {
    setError("")
    setMensagem("")

    if (!validarFormulario()) {
      return
    }

    setLoading(true)

    try {
      const response = await cadastrarUsuario(nome, email, senha)
      setMensagem(response.data.mensagem)
      setCadastroSucesso(true)

      setNome("")
      setEmail("")
      setSenha("")
      setConfirmarSenha("")
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Erro ao registrar.")
      } else {
        setError("Erro de conexão com o servidor.")
      }
    } finally {
      setLoading(false)
    }
  }

  const voltarParaLogin = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!cadastroSucesso ? (
          <>
            <div className="text-center mb-8">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span> <User className="text-white text-2xl"/> </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Criar Conta</h1>
              <p className="text-gray-600 mt-2">Preencha os dados para se cadastrar</p>
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
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>

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
                  placeholder="Digite sua senha (mín. 6 caracteres)"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>

              <div>
                <input
                  id="confirmarSenha"
                  type="password"
                  placeholder="Digite sua senha novamente"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cadastrando..." : "Criar Conta"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Já possui uma conta?{" "}
                <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Faça login aqui
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cadastro Realizado!</h2>

            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
              <p>{mensagem}</p>
            </div>

            <p className="text-gray-600 mb-6">
              Sua conta foi criada com sucesso. Agora você pode fazer login no sistema.
            </p>

            <div className="space-y-3">
              <button
                onClick={voltarParaLogin}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ir para Login
              </button>

              <button
                onClick={() => {
                  setCadastroSucesso(false)
                  setMensagem("")
                }}
                className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors font-medium"
              >
                Cadastrar Outro Usuário
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600">Prodex - Sistema de Gerenciamento de Produtos</p>
        </div>
      </div>
    </div>
  )
}

export default CadastroPage
