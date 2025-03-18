import { parseResponseData, parseResponseError } from './handle-respomse';
import axiosInstance, { prefixProxyUrl } from './index';
import { AxiosError } from 'axios';
import { i18n } from '@web-workspace/shared/i18n';
import { showToast as toast } from '@web-workspace/shared/components/widgets/toast';

interface Params<T = any> {
  url: string;
  data?: T;
  headers?: Record<string, string>;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | 'stream';
  showToast?: boolean;
  timeout?: number;
  baseURL?: string;
}

export interface Response<T = any> {
  isSuccess: boolean;
  data: T;
}

export const prependBaseUrl = (url: string) => {
  // If url is already absolute, prepend the base URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return prefixProxyUrl + url;
  }
  // If url is relative, return it as is
  return url;
};

function deleteEmptyValues(url: string): string {
  if (url.includes('?')) {
    // get the index of the question mark
    const questionMarkIndex = url.indexOf('?');

    // extract the substring before the question mark
    const baseUrl = url.slice(0, questionMarkIndex);

    // extract the substring after the question mark
    const newString =
      questionMarkIndex !== -1 ? url.slice(questionMarkIndex + 1) : '';
    // create an empty object to store the key-value pairs
    const obj: Record<string, string> = {};

    // create a URLSearchParams object from the new string
    const params = new URLSearchParams(newString);

    // loop through the entries of the URLSearchParams object
    for (const [key, value] of params.entries()) {
      // assign the key-value pair to the object
      obj[key] = value;
    }
    // loop through the keys of the object
    for (const key in obj) {
      // get the value of the key
      const value = obj[key];
      // check if the value is null, empty string, or undefined
      if (value === null || value === '' || value === undefined) {
        // delete the key-value pair from the object
        delete obj[key];
      }
    }

    // get an array of the key-value pairs of the object
    const entries = Object.entries(obj);

    // map the array elements to the format "key=value"
    const pairs = entries.map(([key, value]) => `${key}=${value}`);

    // join the array elements with an ampersand
    const queryString = pairs.join('&');

    // return the new URL with the base URL and the query string
    return `${baseUrl}?${queryString}`;
  }
  return url;
}

const apiGet = async ({
  url,
  headers,
  responseType,
  showToast = false,
  baseURL = '',
  timeout,
}: Omit<Params, 'data'>): Promise<Response> => {
  const urlDeletedEmptyValue = deleteEmptyValues(url);

  try {
    const config = {
      ...{ headers, responseType },
      ...(baseURL ? { baseURL } : {}),
      ...(timeout ? { timeout } : {}),
    };
    const response = await axiosInstance.get(
      prependBaseUrl(urlDeletedEmptyValue),
      config
    );
    return parseResponseData(response);
  } catch (error) {
    const parsedError = parseResponseError(error as AxiosError);
    showToast &&
      toast.error(parsedError.data.message ?? i18n.t('api.unknown-error'), {
        position: 'top-center',
      });
    return parsedError;
  }
};

const apiPost = async ({
  url,
  data,
  headers,
  showToast = false,
  timeout,
  baseURL,
  stopRetry = false,
}: Omit<Params<any>, 'responseType'> & {
  stopRetry?: boolean;
}): Promise<Response> => {
  try {
    const config = {
      ...{ headers, timeout },
      ...(baseURL ? { baseURL } : {}),
      stopRetry,
    };
    const response = await axiosInstance.post(
      prependBaseUrl(url),
      data,
      config
    );
    return parseResponseData(response);
  } catch (error) {
    const parsedError = parseResponseError(error as AxiosError);
    showToast &&
      toast.error(parsedError.data.message ?? i18n.t('api.unknown-error'), {
        position: 'top-center',
      });
    return parsedError;
  }
};

const apiPut = async ({
  url,
  data,
  headers,
  showToast = false,
  baseURL,
}: Omit<Params, 'responseType'>): Promise<Response> => {
  try {
    const config = {
      ...{ headers },
      ...(baseURL ? { baseURL } : {}),
    };
    const response = await axiosInstance.put(prependBaseUrl(url), data, config);
    return parseResponseData(response);
  } catch (error) {
    const parsedError = parseResponseError(error as AxiosError);
    showToast &&
      toast.error(parsedError.data.message ?? i18n.t('api.unknown-error'), {
        position: 'top-center',
      });
    return parsedError;
  }
};

const apiDelete = async ({
  url,
  headers,
  responseType,
  showToast = false,
  baseURL,
}: Omit<Params, 'data'>): Promise<Response> => {
  try {
    const config = {
      ...{ headers, responseType },
      ...(baseURL ? { baseURL } : {}),
    };
    const response = await axiosInstance.delete(prependBaseUrl(url), config);
    return parseResponseData(response);
  } catch (error) {
    const parsedError = parseResponseError(error as AxiosError);
    showToast &&
      toast.error(parsedError.data.message ?? i18n.t('api.unknown-error'), {
        position: 'top-center',
      });
    return parsedError;
  }
};

const apiPatch = async ({
  url,
  data,
  headers,
  showToast = false,
  timeout,
  baseURL,
}: Omit<Params, 'responseType'>): Promise<Response> => {
  try {
    const config = {
      ...{ headers, timeout },
      ...(baseURL ? { baseURL } : {}),
    };
    const response = await axiosInstance.patch(
      prependBaseUrl(url),
      data,
      config
    );
    return parseResponseData(response);
  } catch (error) {
    const parsedError = parseResponseError(error as AxiosError);
    showToast &&
      toast.error(parsedError.data.message ?? i18n.t('api.unknown-error'), {
        position: 'top-center',
      });
    return parsedError;
  }
};

export { apiGet, apiPost, apiPut, apiDelete, apiPatch };
