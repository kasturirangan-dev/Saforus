import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

export const isGuestUser = (): boolean => {
  return window.location.pathname.startsWith(API_ROUTES.GUEST.ROOT);
};
