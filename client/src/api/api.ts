import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4200/api/v1" });

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (val: AxiosResponse) => {
    return Promise.resolve(val);
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
