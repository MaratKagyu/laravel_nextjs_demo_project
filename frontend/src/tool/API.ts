import axios, {InternalAxiosRequestConfig} from "axios";
import config from "./config";
import {store} from "@/store";
import {accountCleanup} from "@/store/account/account-slice";

export interface ApiErrorData {
  errorCode: string;
  response: any;
}
export const apiEndpoint = {
  authenticate: '/api/authenticate',
  account: '/api/account'
}

const instance = axios.create({
  baseURL: config.env.apiEndpoint,
  responseType: "json",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Auto-add Bearer token
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().account.accessToken;
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export const expiredTokenInterceptor = instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response ? error.response.status : null;

    switch (status) {

      case 401:
        store.dispatch(accountCleanup());
        return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
