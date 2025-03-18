import { apiGet } from '@web-workspace/shared/api/http-client';
import { ResendEmailApi } from '../interface';

let resendEmailServiceApi: ResendEmailApi;

const URLS = {
  GET_RESEND_EMAIL: '/api/v1/saforus-web-be/papi/user/account/activation',
};

const useResendEmailServiceApi = () => {
  if (resendEmailServiceApi) {
    return resendEmailServiceApi;
  }

  const getResendEmail = async (email: string) => {
    try {
      const res = await apiGet({
        url: `${URLS.GET_RESEND_EMAIL}/${email}`
      });
      if (!res.isSuccess) {
        switch (res.data.status) {
          case 401001:
            res.data.messageKey = 'api.resend-activation.401001';
            break;
          case 401006:
            res.data.messageKey = 'api.resend-activation.401006';
            break;
          case 401015:
            res.data.messageKey = 'api.resend-activation.401015';
            break;
          case 401012:
            res.data.messageKey = 'api.resend-activation.401012';
            break;
          case 401013: // FIXME need EN 401013
            res.data.messageKey = 'api.resend-activation.401013';
            break;
          case 501002:
            res.data.messageKey = 'api.resend-activation.501002';
            break;
          case 400:
            res.data.messageKey = 'api.activation.400';
            break;
          case 401:
          case 401008:
            res.data.messageKey = 'api.resend-activation.401';
            break;
          case 404:
            res.data.messageKey = 'api.activation.404';
            break;
          case 406:
          case 401009:
            res.data.messageKey = 'api.resend-activation.406';
            break;
          case 423:
          case 401010:
            res.data.messageKey = 'api.resend-activation.401010';
            break;
          case 401011:
            res.data.messageKey = 'api.resend-activation.423';
            break;
          default:
            res.data.messageKey = 'api.unknown-error';
            break;
        }
      }

      return res;
    } catch (err) {
      return err;
    }
  };

  resendEmailServiceApi = {
    getResendEmail,
  };

  return resendEmailServiceApi;
};

export default useResendEmailServiceApi;
