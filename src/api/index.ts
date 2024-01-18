import axios, { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((data: InternalAxiosRequestConfig<unknown>) => {
  data.headers.Authorization = "Bearer " + localStorage.getItem("auth");
  return data;
});
