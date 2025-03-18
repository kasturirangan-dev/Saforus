import { apiPost } from '@web-workspace/shared/api/http-client';
import { IActivationRequest, VerificationEmailApi } from '../interface';

let verificationEmailServiceApi: VerificationEmailApi;

const URLS = {
  POST_VERIFY_EMAIL: '/api/saforus-cs-api-auth/ext/v1/accounts/activate',
};

const useVerificationEmailServiceApi = () => {
  if (verificationEmailServiceApi) {
    return verificationEmailServiceApi;
  }

  const postVerificationEmail = async (activationInfo: IActivationRequest) => {
    try {
      const res = await apiPost({
        url: URLS.POST_VERIFY_EMAIL,
        headers: {
          Authorization: `Bearer ${activationInfo.jwt}`,
        },
      });
      if (!res.isSuccess) {
        switch (res.data.status) {
          case 400:
            res.data.messageKey = 'api.activation.400';
            break;
          case 401010:
            res.data.messageKey = 'api.activation.401010';
            break;
          case 401018:
            res.data.messageKey = 'api.activation.401018';
            break;
          case 401019:
            res.data.messageKey = 'api.activation.401019';
            break;
          case 401020:
            res.data.messageKey = 'api.activation.401020';
            break;
          case 401021:
            res.data.messageKey = 'api.activation.401021';
            break;
          case 401022:
            res.data.messageKey = 'api.activation.401022';
            break;
          case 401023:
            res.data.messageKey = 'api.activation.401023';
            break;
          case 401024:
            res.data.messageKey = 'api.activation.401024';
            break;
          case 501002:
            res.data.messageKey = 'api.activation.501002';
            break;
          case 401:
            res.data.messageKey = 'api.activation.401';
            break;
          case 404:
          case 401006:
            res.data.messageKey = 'api.activation.404';
            break;
          case 423:
            res.data.messageKey = 'api.activation.423';
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

  verificationEmailServiceApi = {
    postVerificationEmail,
  };

  return verificationEmailServiceApi;
};

export default useVerificationEmailServiceApi;
