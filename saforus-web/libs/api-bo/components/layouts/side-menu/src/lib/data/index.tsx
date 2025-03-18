import { API_BO_ROUTES } from '@web-workspace/api-bo/constants/routes';
import { userSecurityId } from '../views/icons/user-security';
import { dashboardIconId } from '../views/icons/dashboard';
import { questionId } from '../views/icons/question';

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
const topLevelRoutes = [
  API_BO_ROUTES.DASHBOARD,
  API_BO_ROUTES.USER_MANAGEMENT,
  API_BO_ROUTES.ADMIN,
  API_BO_ROUTES.HELP,
];

const topLevelIcons = [
  dashboardIconId,
  userSecurityId,
  userSecurityId,
  questionId,
];

const translatePrefix = 'apiBoSidemenu';

const createMenuItems = (routes: Record<string, any>): MenuItem[] => {
  const items: MenuItem[] = [];

  for (const key in routes) {
    if (key === 'ROOT') continue;

    const route = routes[key];
    if ('path' in route) {
      items.push({
        id: key,
        name: `${translatePrefix}.${route.name}`,
        path: route.path,
        children:
          'children' in route ? createMenuItems(route.children) : undefined,
      });
    }
  }

  return items;
};

// Handel both routes and buildNestedRoutes
export const menuData: MenuItem[] = topLevelRoutes.map((route, index) => {
  const path = route?.ROOT || route?.path || '';
  const name = path.split('/').pop() || '';

  return {
    id: `${Object.keys(route)[0]}-${index}`,
    name: `${translatePrefix}.${name}`,
    path: path,
    icon: (
      <svg>
        <use xlinkHref={`#${topLevelIcons[index]}`}></use>
      </svg>
    ),
    // Create sub menu items if is buildNestedRoutes
    children: route?.ROOT ? createMenuItems(route) : [],
  };
});
