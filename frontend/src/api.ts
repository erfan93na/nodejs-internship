import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({ baseURL: "/api/" });

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = "/signin";
    } else return Promise.reject(error);
  }
);
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
