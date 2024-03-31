import axios from "axios";

const AxiosService = axios.create({
  baseURL: "http://localhost:4000",

  headers: { "content-type": "application/json" },
});



AxiosService.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : null;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default AxiosService;
