import axios from 'axios';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import CsApiBoAuthStore from '@web-workspace/shared/hooks/use-csapi-bo-auth';
import i18next from 'i18next';

const isDevelopment = window.origin.includes('localhost');
const appName = getEnvVar('VITE_APP_NAME');
const tokenFallback = window?.localStorage?.getItem('saforus_web_token');

const enum AppType {
  SAFORUS = 'Saforus',
  SAFORUS_BO = 'Saforus-bo',
  SAFORUS_CS_API = 'Saforus-cs-api',
  SAFORUS_API_BO = 'Saforus-cs-api-bo',
}

export const prefixProxyUrl = isDevelopment ? 'http://localhost:8080/' : '';
const baseUrl = `${prefixProxyUrl}${getEnvVar('VITE_API_URL')}`;
const EXPIRED_RESULTS_CODE = [401011, 401016, 401019, 401024];
const EXPIRED_RESPONSE_CODE = [401];

// Create a base Axios instance
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
});

// Custom request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add custom request headers
    config.headers['Accept-Language'] = i18next.language || 'en';

    // Get the token from Valtio AuthStore
    let token = null;
    if (appName === AppType.SAFORUS) {
      token = AuthStore.token || AuthStore.userInfo?.token || tokenFallback;
    } else if (appName === AppType.SAFORUS_BO) {
      token = BoAuthStore.token || BoAuthStore.userInfo?.token;
    } else if (appName === AppType.SAFORUS_CS_API) {
      token = CsApiAuthStore.token || CsApiAuthStore.userInfo?.token;
    } else if (appName === AppType.SAFORUS_API_BO) {
      token = CsApiBoAuthStore.token || CsApiBoAuthStore.userInfo?.token;
    }
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Add custom action here, for example, show a loading spinner
    // ...
    if (appName === AppType.SAFORUS) {
      AuthStore.setLastApiTime(`${new Date()}`);
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Custom response interceptor
instance.interceptors.response.use(
  (response) => {
    // Custom success response
    // ...
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { response = {} } = error;
    if (EXPIRED_RESPONSE_CODE.includes(response.status)) {
      const data = response.data;
      const isExpired = !data || EXPIRED_RESULTS_CODE.includes(data.resultCode);

      if (isExpired) {
        if (appName === AppType.SAFORUS) AuthStore.setIsExpired(true);
        if (appName === AppType.SAFORUS_BO) BoAuthStore.setIsExpired(true);
        if (appName === AppType.SAFORUS_CS_API)
          CsApiAuthStore.setIsExpired(true);
      }
    }

    // const isRequestExpired =
    //   EXPIRED_RESULTS_CODE.includes(+response.data?.resultCode) ||
    //   EXPIRED_RESPONSE_CODE.includes(response.status);
    // if (isRequestExpired) {
    //   AuthStore.setIsExpired(true);
    // }

    // Check if the request is invalid and perform refresh token logic
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !error.config?.stopRetry
    ) {
      originalRequest._retry = true;

      // Perform refresh token logic here
      // ...

      return instance(originalRequest);
    }

    // Custom error response
    // ...

    return Promise.reject(error);
  }
);

export default instance;
