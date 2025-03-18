import { API_DOCS_ROUTES } from '@web-workspace/api-docs/constants/routes';

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
const startRoutes = [
  API_DOCS_ROUTES.USER_GUIDE,
  API_DOCS_ROUTES.TERM_DEFINITION,
];

const integrationRoutes = [
  API_DOCS_ROUTES.API_INTEGRATION,
  API_DOCS_ROUTES.CS_API,
  API_DOCS_ROUTES.WEBHOOKS,
  API_DOCS_ROUTES.ERROR_CODES,
];

const translatePrefix = 'apiDocsSidemenu';

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
      // Create sub menu items if buildNestedRoutes is needed
      children: route?.ROOT ? createMenuItems(route) : [],
    };
  });
};

export const menuData = {
  'getting-started': createMenu(startRoutes),
  'integration-guide': createMenu(integrationRoutes),
};
