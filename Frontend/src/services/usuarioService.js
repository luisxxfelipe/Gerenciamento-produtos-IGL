import axios from "axios";

export const login = async (email, senha) => {
  return axios.post("http://localhost:3333/auth/login", {
    email,
    senha,
  });
};

export const cadastrarUsuario = async (nome, email, senha) => {
  return axios.post("http://localhost:3333/auth/registrar", {
    nome,
    email,
    senha,
  });
};
