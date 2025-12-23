import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9909",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["x-access-token"] = token; // custom header
  }
  return config;
});

export default api;
