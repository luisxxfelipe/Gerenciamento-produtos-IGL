import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setsenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Os campos de email e senha são obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const dados = await response.json();
      localStorage.setItem("token", dados.token);
      window.location.href = "/produtos"; // Redireciona para a página de produtos
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="senha"
          value={senha}
          onChange={(e) => setsenha(e.target.value)}
          className="mb-6"
        />
        <Button onClick={handleLogin} className="w-full">
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
