import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api/v1",
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (val: AxiosResponse) => {
    return Promise.resolve(val);
  },
  (error) => {
    if (import.meta.env.NODE_ENV === "development") {
      console.log(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
