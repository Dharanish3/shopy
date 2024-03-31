import axios from "axios";

const AxiosService = axios.create({
  baseURL: "https://shopy-mci9.onrender.com",

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
