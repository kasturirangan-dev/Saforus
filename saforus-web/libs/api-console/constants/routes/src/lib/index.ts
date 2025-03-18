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

const API_ROUTES = {
  API_DOC: { path: '/docs', name: 'apidoc' },
  LOGIN: { path: '/login', name: 'Login' },
  RESET: { path: '/reset', name: 'Reset' },
  REGISTER: { path: '/register', name: 'Register' },
  REGISTER_DONE: { path: '/register-done', name: 'Register Done' },
  REGISTER_COMPLETED: {
    path: '/register-completed',
    name: 'Register Completed',
  },
  RESET_ACCOUNT_PASS: {
    path: '/reset-password',
    name: 'Reset Account Password',
  },
  VERIFY_EMAIL: {
    path: '/user-account/:activate',
    name: 'Reset Account Password',
  },
  RESET_DONE: { path: '/reset-password-done', name: 'Reset Password Done' },
  DASHBOARD: { path: '/dashboard', name: 'Dashboard' },
  KEY_MANAGEMENT: { path: '/keys', name: 'API Keys' },
  INSERT_WATERMARK: { path: '/insert-watermark', name: 'Insert Watermark' },
  DETECT_WATERMARK: { path: '/detect-watermark', name: 'Detect Watermark' },
  VIEW_ORDERS: buildNestedRoutes('/view-orders', {
    WTR_ORDERS: {
      path: 'wtr-orders',
      name: 'wtr-orders',
    },
    PD_ORDERS: {
      path: 'pd-orders',
      name: 'pd-orders',
    },
  }),
  USER_INFO: buildNestedRoutes('/user-info', {
    CURRENT_PLAN: { path: 'current-plan', name: 'currentPlan' },
    BILLING_DETAILS: { path: 'billing-details', name: 'billingDetails' },
    PAYMENT_MANAGEMENT: {
      path: 'payment-management',
      name: 'Payment Management',
    },
  }),
  NOTFOUND: { path: '*', name: 'Not Found' },
  GUEST: buildNestedRoutes('/guest', {
    DASHBOARD: { path: '/dashboard', name: 'Dashboard' },
    INSERT_WATERMARK: { path: '/insert-watermark', name: 'Insert Watermark' },
    DETECT_WATERMARK: { path: '/detect-watermark', name: 'Detect Watermark' },
    VIEW_ORDERS: { path: '/view-orders', name: 'View Orders' },
    KEY_MANAGEMENT: { path: '/keys', name: 'API Keys' },
  }),
} as const;

export default API_ROUTES;
