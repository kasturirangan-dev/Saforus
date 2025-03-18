import { apiPost } from '@web-workspace/shared/api/http-client';
import { ApiResponseData } from '@web-workspace/api-console/common/model';

const refreshTokenEndpoint =
  '/api/saforus-cs-api-auth/ext/v1/accounts/refresh-token';

export async function refreshToken(
  refreshToken: string
): Promise<ApiResponseData> {
  const response = await apiPost({
    url: refreshTokenEndpoint,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  if (response.isSuccess) {
    return response.data;
  } else {
    throw response.data;
  }
}
