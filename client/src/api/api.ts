import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4200/api/v1" });

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (val: AxiosResponse) => {
    return Promise.resolve(val);
  },
  (error) => {
    if (import.meta.env.MODE === "development") {
      console.log(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
