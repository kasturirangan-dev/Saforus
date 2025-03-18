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

const API_DOCS_ROUTES = {
  USER_GUIDE: { path: '/user-guide', name: 'User Guide' },
  TERM_DEFINITION: { path: '/term-definition', name: 'Term Definition' },
  API_INTEGRATION: buildNestedRoutes('/api-integration', {
    BASIC_CONCEPTS: {
      path: 'basic-concepts',
      name: 'Integration Basic Concepts',
    },
    QUICK_START: { path: 'quick-start', name: 'Integration Quick Start' },
    // FLOW_CHART: { path: 'flow-chart', name: 'Integration Flow Chart' },
  }),
  CS_API: buildNestedRoutes('/csapi', {
    AUTHENTICATION: {
      path: 'authentication',
      name: 'Authentication Api',
    },
    API_KEYS: {
      path: 'api-keys',
      name: 'Api Keys Management',
    },
    WATERMARKING: {
      path: 'watermarking',
      name: 'Watermarking Api',
    },
    DETECTION: {
      path: 'detection',
      name: 'Detection Api',
    },
    SHARE_FILE: {
      path: 'share-file',
      name: 'Share File Api',
    },
    DELETE_FILE: {
      path: 'delete-file',
      name: 'Delete File Api',
    },
  }),
  WEBHOOKS: {path: '/webhook-api',name: 'Webhook Api'},
  ERROR_CODES: { path: '/error-codes', name: 'Error Codes' },
  NOTFOUND: { path: '*', name: 'Not Found' },
} as const;

export default API_DOCS_ROUTES;
