import { Location } from 'react-router-dom';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

interface RouteStoreType {
  returnUrl: string | null;
  setReturnUrl: (path: string) => void;
  clearRouteStore: () => void;
}

function createRouteStore() {
  const store: RouteStoreType = {
    returnUrl: null,
    setReturnUrl(returnUrl: string) {
      RouteStore.returnUrl = returnUrl;
    },
    clearRouteStore: () => {
      RouteStore.returnUrl = null;
    },
  };
  return store;
}
const RouteStore = proxy<RouteStoreType>(createRouteStore());

export function setReturnLocation(location: Location) {
  const path = location.pathname + location.search;
  const returnUrl = encodeURIComponent(path);
  RouteStore.setReturnUrl(returnUrl);
}

export function getReturnPath(searchParams: URLSearchParams) {
  const paramsAsObject = Object.fromEntries([...searchParams]);
  return paramsAsObject?.returnUrl
    ? decodeURIComponent(paramsAsObject?.returnUrl)
    : null;
}
devtools(RouteStore, { name: 'ROUTE_STORE' });
export default RouteStore;
