import axios from "axios";

export const cadastrarProduto = async (dados, token) => {
  return axios.post("http://localhost:3333/cadastrar-produtos", dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listarProdutos = async (token) => {
  return axios.get("http://localhost:3333/listar-produtos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const excluirProduto = async (id, token) => {
  return axios.delete(`http://localhost:3333/excluir-produto/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export const atualizarProduto = async (id, dados, token) => {
  return axios.put(`http://localhost:3333/editar-produto/${id}`, dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

