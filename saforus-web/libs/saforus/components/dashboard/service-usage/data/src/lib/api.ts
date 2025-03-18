import {
  ForensicWatermarkingUsageResponse,
  GraphResponse,
  PiracyDetectionResponse,
} from './interface';
import { mockData, mockServiceUsage } from './mock';
import { apiGet } from '@web-workspace/shared/api/http-client';

const GET_FORENSIC_WATERMARKING = '/api/v1/saforus-web-be/user/uses';
const GET_PIRACY_DETECTION = '/api/v1/mp-pd/users/uses';
const GET_GRAPH = '/api/v1/saforus-web-be/user/uses/graphs/bar';
export const fetchChartData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1500);
  });
};

export const fetchServiceUsageData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockServiceUsage);
    }, 1000);
  });
};

export async function fetchForensicWatermarkingUsage(
  startDate: string,
  endDate: string,
  teamId?: number | null
): Promise<ForensicWatermarkingUsageResponse> {
  const apiUrl = `${GET_FORENSIC_WATERMARKING}?startDate=${startDate}&endDate=${endDate}&teamId=${teamId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}

export async function fetchGraph({
  startDate,
  endDate,
  userUsesPeriod,
  teamId,
}: {
  startDate: string;
  endDate: string;
  userUsesPeriod: string;
  teamId?: number | null;
}): Promise<GraphResponse> {
  const apiUrl = `${GET_GRAPH}?startDate=${startDate}&endDate=${endDate}&userUsesPeriod=${userUsesPeriod}&teamId=${teamId}`;
  const response = await apiGet({ url: apiUrl });
  return response.data;
}
