import path from 'path';

type RouteItem = {
  path: string;
  name: string;
  children?: Record<string, RouteItem>;
};

type NestedRouteItem<T extends Record<string, RouteItem>> = {
  ROOT: string;
} & T;

const buildNestedRoutes = <T extends Record<string, RouteItem>>(
  parentPath: string,
  routes: T
): NestedRouteItem<T> => {
  const nestedRoutes: NestedRouteItem<T> = {
    ROOT: parentPath,
    ...routes,
  } as NestedRouteItem<T>;

  return new Proxy(nestedRoutes, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      if (typeof value === 'object' && 'path' in value) {
        return {
          ...value,
          path: `${parentPath}/${value.path}`,
          children: value.children
            ? buildNestedRoutes(`${parentPath}/${value.path}`, value.children)
            : undefined,
        };
      }

      return value;
    },
  });
};

const API_BO_ROUTES = {
  LOGIN: { path: '/login', name: 'Login' },
  USER_MANAGEMENT: buildNestedRoutes('/user-management', {
    MANAGE_ACCOUNT: {
      path: 'accounts',
      name: 'manage-account',
    },
    SERVICE_PLAN: {
      path: 'service-plan',
      name: 'service-plan',
    },
  }),
  DASHBOARD: { path: '/dashboard', name: 'Dashboard' },
  ADMIN: { path: '/admins', name: 'Admin' },
  HELP: { path: '/help', name: 'API Help Center' },
  NOTFOUND: { path: '*', name: 'Not Found' },
} as const;

export default API_BO_ROUTES;
