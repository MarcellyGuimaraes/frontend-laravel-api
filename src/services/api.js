import axios from "axios";

// Pode ser algum servidor executando localmente:
// http://localhost:3000

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const apiProducts = axios.create({
  baseURL: "http://127.0.0.1:8000/api/products",
});

const addAuthHeader = (config) => {
  const token = localStorage.getItem("token"); // Substitua pelo seu token de autenticação válido
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

// Interceptar todas as solicitações e adicionar o cabeçalho de autenticação
apiProducts.interceptors.request.use(addAuthHeader);
