import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import ProdutosPage from "@/pages/ProdutosPage";
import Layout from "@/components/layout/layout";
import CadastrarProdutoPage from "@/pages/CadastrarProdutoPage";
import CadastroPage from "@/pages/CadastrarUsuarioPage";

export default function Rotas() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/cadastro" element={<CadastroPage />} />

      {!token && <Route path="*" element={<LoginPage />} />}

      {token && (
        <Route path="/" element={<Layout />}>
          <Route path="produtos" element={<ProdutosPage />} />
          <Route path="cadastrar" element={<CadastrarProdutoPage />} />
          <Route path="*" element={<Navigate to="/produtos" />} />
        </Route>
      )}
    </Routes>
  );
}
