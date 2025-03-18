import { apiGet } from "@web-workspace/shared/api/http-client";
import i18next from "i18next";

const GET_NOTIFICATION = 'api/v1/saforus-web-be/papi/notices';


export async function getNotification(page: string): Promise<any> {
    const apiUrl = `${GET_NOTIFICATION}?displayedOn=${page}`;
    const response = await apiGet({
      url: apiUrl,
      headers: {
        'Accept-Language': i18next.language
      }
    });
    if (response.isSuccess) {
      return response.data;
    }
    throw response.data;
  }