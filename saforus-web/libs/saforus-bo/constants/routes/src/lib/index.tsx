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

const BO_ROUTES = {
  LOGIN: { path: '/login', name: 'Login' },
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

  // GNB Routes,
  ADMIN_DASHBOARD: { path: '/admin-dashboard', name: 'Admin Dashboard' },

  ORDER_MANAGEMENT: buildNestedRoutes('/order-management', {
    WATERMARKING_ORDERS: {
      path: 'watermarking-orders',
      name: 'watermarking-orders',
      children: {
        WATERMARKING_DETAIL: {
          path: 'watermarking-order-detail',
          name: 'watermarking-order-detail',
          children: {
            WATERMARKING_DOWNLOAD_FILES: {
              path: 'download-files',
              name: 'watermark-download-files',
            },
          },
        },
      },
    },
    PIRACY_DETECTION_REQUESTS: {
      path: 'piracy-detection-requests',
      name: 'piracy-detection-requests',
      children: {
        PIRACY_ORDER_DETAIL: {
          path: 'piracy-order-detail',
          name: 'piracy-orders-detail',
        },
      },
    },
  }),
  SERVICE_MANAGEMENT: buildNestedRoutes('/service-management', {
    NOTIFICATION_MANAGEMENT: {
      path: 'notification-management',
      name: 'notification-management',
      children: {
        CREATE_NEW_NOTICE: {
          path: 'create-new-notice',
          name: 'create-new-notice',
        },
        EDIT_NOTICE: {
          path: 'edit-notice',
          name: 'edit-notice',
        },
      },
    },
  }),
  USER_MANAGEMENT: buildNestedRoutes('/user-management', {
    SEARCH_USERS: {
      path: 'search-users',
      name: 'search-users',
      children: {
        USER_DETAIL: {
          path: 'user-detail',
          name: 'user-detail',
        },
      },
    },
    // SEARCH_TEAM_AND_MEMBERS: {
    //   path: 'search-team-and-members',
    //   name: 'search-team-and-members',
    // },
  }),
  CUSTOMER_SUPPORT: buildNestedRoutes('/customer-support', {
    // SEARCH_USERS: {
    //   path: 'search-users',
    //   name: 'search-users',
    // },
    SEARCH_INQUIRIES: {
      path: 'search-inquiries',
      name: 'search-inquiries',
      children: {
        INQUIRY_DETAIL: {
          path: 'inquiry-detail',
          name: 'inquiry-detail',
        },
      },
    },
  }),
  // SERVICE_CONFIGURATION: buildNestedRoutes('/service-configuration', {
  //   FORENSIC_WATERMARKING: {
  //     path: 'forensic-watermarking',
  //     name: 'forensic-watermarking',
  //   },
  //   PIRACY_DETECTION: {
  //     path: 'piracy-detection',
  //     name: 'piracy-detection',
  //   },
  //   INQUIRY: { path: 'inquiry', name: 'inquiry' },
  //   SERVICE_PLAN_MANAGER: {
  //     path: 'service-plan-manager',
  //     name: 'service-plan-manager',
  //   },
  // }),
  SETTINGS: buildNestedRoutes('/settings', {
    ADMIN_USER_MANAGEMENT: {
      path: 'admin-user-management',
      name: 'admin-user-management',
    },
  }),
  NOTFOUND: { path: '*', name: 'Not Found' },
} as const;

export default BO_ROUTES;
