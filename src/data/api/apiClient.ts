import axios, { InternalAxiosRequestConfig } from 'axios';
import responseInterceptor from './responseInterceptor';
import errorInterceptor from './errorInterceptor';
import * as environment from './../../environment.ts';

const token = environment.token;

const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

export default authInterceptor;

export const apiClient = axios;

apiClient.interceptors.request.use(authInterceptor);
apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
