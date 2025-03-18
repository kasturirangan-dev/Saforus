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

const ROUTES = {
  HOME: { path: '/home', name: 'Home' },
  HELP: buildNestedRoutes('/help', {
    HELP_CENTER: {
      path: 'help-center',
      name: 'help-center',
      children: {
        INQUIRY_DETAIL: { path: 'inquiry-detail', name: 'inquiry-detail' },
      },
    },
    INQUIRY: {
      path: 'create-inquiry',
      name: 'my-inquiries',
    },
  }),
  LOGIN: { path: '/login', name: 'Login' },
  REGISTER: { path: '/register', name: 'Register' },
  REGISTER_DONE: { path: '/register-done', name: 'Register Done' },
  REGISTER_COMPLETED: { path: '/register-completed', name: 'Register Done' },
  RESET: { path: '/reset', name: 'Reset' },
  RESET_ACCOUNT_PASS: {
    path: '/change-password/:validate',
    name: 'Reset Account Password',
  },
  VERIFY_EMAIL: {
    path: '/user-account/:activate',
    name: 'Reset Account Password',
  },
  RESET_DONE: { path: '/reset-password-done', name: 'Reset Password Done' },
  PRODUCTS: { path: '/products', name: 'Products' },
  RESOURCES: { path: '/resources', name: 'Resources' },
  CONTACTS: { path: '/contacts', name: 'Contacts' },

  // GNB Routes
  USER_INFO: buildNestedRoutes('/user-info', {
    TEAM: {
      path: 'team-members',
      name: 'team-members',
      children: {
        TEAM_DETAIL: {
          path: 'team-detail',
          name: 'team-detail',
        },
      },
    },
    SERVICE_BILLING: { path: 'service-billing', name: 'service-billing' },
    SERVICE_PLAN: { path: 'service-plan', name: 'service-plan' },
    BILLING_DETAIL: { path: 'billing-detail', name: 'billing-detail' },
    MONTHLY_USAGE: { path: 'monthly-usage', name: 'monthly-usage' },
    ADMIN_PAGE: { path: 'user-credit', name: 'user-credit' },
  }),
  CUSTOMER_SUPPORT: { path: '/customer-support', name: 'customer-support' },
  DASHBOARD: buildNestedRoutes('/dashboard', {
    PACKAGES_DELIVERY: {
      path: 'service-usage',
      name: 'service-usage',
    },
    SEARCH_ORDERS: { path: 'search-order', name: 'search-orders' },
  }),
  MULTI_DRM_PACKAGING: buildNestedRoutes('/multi-drm-packaging', {
    CREATE_ORDER: {
      path: 'create-order',
      name: 'create-order-drm',
    },
    VIEW_ORDER: {
      path: 'view-orders',
      name: 'view-orders-drm',
      children: {
        MULTI_DMR_PACKING_DETAIL: {
          path: 'order-detail',
          name: 'multi-dmr-view-orders',
          children: {
            MULTI_DMR_PACKING_CONFIGURATION: {
              path: 'packing-configuration',
              name: 'multi-dmr-packing-configuration',
            },
          },
        },
      },
    },
  }),
  FORENSIC_WATERMARKING: buildNestedRoutes('/forensic-watermarking', {
    NEW_FORENSIC_WATERMARKING: {
      path: 'create-order',
      name: 'create-order-watermarking',
    },
    WATERMARKING_HISTORY: {
      path: 'view-orders',
      name: 'watermark-view-orders',
      children: {
        WATERMARKING_HISTORY_DETAIL: {
          path: 'orders-detail',
          name: 'watermark-orders-detail',
          children: {
            WATERMARKING_DOWNLOAD_FILES: {
              path: 'download-files',
              name: 'watermark-download-files',
            },
          },
        },
      },
    },
  }),
  PIRACY_DETECTION: buildNestedRoutes('/piracy-detection', {
    NEW_REQUEST: {
      path: 'new-request',
      name: 'new-request',
      children: {
        SUBMIT_ORDER: { path: 'submit-order', name: 'submit-order' },
      },
    },
    VIEW_ORDER: {
      path: 'view-orders',
      name: 'view-orders',
      children: {
        PIRACY_ORDER_DETAIL: {
          path: 'orders-detail',
          name: 'piracy-orders-detail',
        },
      },
    },
  }),
  SETTINGS: buildNestedRoutes('/settings', {
    SITES: { path: 'sites', name: 'my-sites-storages' },
    MULTI_DRM: { path: 'multi-drm', name: 'multi-drm' },
  }),
  WATERMAKING_DOWNLOAD: {
    path: '/watermarking-download',
    name: 'watermarking-download',
  },
  NOTFOUND: { path: '*', name: 'Not Found' },
  PRICING: { path: 'https://www.saforus.com/pricing', name: 'pricing' },
  API_DOC: { path: '/docs', name: 'apidoc' },
} as const;

export default ROUTES;
