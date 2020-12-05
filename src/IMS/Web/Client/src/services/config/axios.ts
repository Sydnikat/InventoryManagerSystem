import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { store } from "../../store/store";

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const accessToken = store.getState().userReducer.user?.accessToken || "";
  if (accessToken !== "") {
    request.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
  } else {
    request.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  return request;
}, error => {
  return Promise.reject(error);
});

export {axiosInstance};
