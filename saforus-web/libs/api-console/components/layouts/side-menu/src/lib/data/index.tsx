import { API_ROUTES } from '@web-workspace/api-console/constants/routes';

// Define MenuItem interface
export interface MenuItem {
  id: string;
  name: string;
  icon?: JSX.Element;
  path: string;
  active?: boolean;
  children?: MenuItem[];
  linkEn?: string;
  linkKo?: string;
}

// Define menu data
const consoleRoutes = [
  API_ROUTES.DASHBOARD,
  API_ROUTES.INSERT_WATERMARK,
  API_ROUTES.DETECT_WATERMARK,
  API_ROUTES.VIEW_ORDERS,
];

const apiRoutes = [API_ROUTES.KEY_MANAGEMENT];

const translatePrefix = 'apiSidemenu';

const createMenuItems = (routes: Record<string, any>): MenuItem[] => {
  const items: MenuItem[] = [];

  for (const key in routes) {
    if (key === 'ROOT') continue;

    const route = routes[key];
    if ('path' in route) {
      items.push({
        id: key,
        name: `${translatePrefix}.${route.name
          .toLowerCase()
          .replace(/ /g, '-')}`,
        path: route.path,
        children:
          'children' in route ? createMenuItems(route.children) : undefined,
      });
    }
  }

  return items;
};

// Handel both routes and buildNestedRoutes
const createMenu = (routes: any): MenuItem[] => {
  return routes.map((route, index) => {
    const path = route?.ROOT || route?.path || '';
    const name = path.split('/').pop() || '';

    return {
      id: `${Object.keys(route)[0]}-${index}`,
      name: `${translatePrefix}.${name}`,
      path: path,
      icon: (
        <svg>
          <use xlinkHref={`#sidemenu-${name}`}></use>
        </svg>
      ),
      // Create sub menu items if buildNestedRoutes is needed
      // children: route?.ROOT ? createMenuItems(route) : [],
    };
  });
};

export const menuData = {
  console: createMenu(consoleRoutes),
  api: createMenu(apiRoutes),
};
