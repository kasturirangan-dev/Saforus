import { AxiosResponse, AxiosError } from 'axios';
interface ApiResponse {
  isSuccess: boolean;
  data: any;
}

interface ApiError {
  isSuccess: boolean;
  data: {
    messageKey: string;
    message?: string;
    instance?: string;
    status?: number;
  };
}

interface ErrorData {
  messageKey?: string;
  detail?: string;
  instance?: string;
  status?: number;
  resultMsg?: string;
  resultCode?: string;
  // You might want to add additional properties depending on your API
}

// function to handle response result
const parseResponseData = (results: AxiosResponse): ApiResponse => {
  const responseStatus = results?.status;
  if (responseStatus && responseStatus >= 200 && responseStatus < 400) {
    return { isSuccess: true, data: results.data };
  }

  return parseResponseError(results as any);
};

const parseResponseError = (error: AxiosError): ApiError => {
  let messageKey = 'api.unknown-error';
  if (!error) {
    return { isSuccess: false, data: { messageKey } };
  }

  const response = error.response;
  if (!response) {
    return { isSuccess: false, data: { messageKey: 'api.unknown-error' } };
  }

  if (!response.status) {
    return { isSuccess: false, data: { messageKey: 'api.unknown-error' } };
  }

  switch (response.status) {
    case 400:
      messageKey = 'api.400';
      break;
    case 404:
      messageKey = 'api.404';
      break;
    case 500:
      messageKey = 'api.500';
      break;
    default:
      messageKey = 'api.unknown-error';
      break;
  }

  const data = response.data as ErrorData; // Assert type here
  return {
    isSuccess: false,
    data: {
      messageKey: data.messageKey || messageKey,
      message: data?.resultMsg || data.detail,
      instance: data.instance,
      status: data?.resultCode ? +data?.resultCode : response.status,
    },
  };
};

export { parseResponseData, parseResponseError };
