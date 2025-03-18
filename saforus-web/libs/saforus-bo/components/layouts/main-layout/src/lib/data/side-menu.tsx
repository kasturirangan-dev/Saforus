import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { settingsIconId } from '../view/icons/settings';
import { dashboardIconId } from '../view/icons/dashboard';
import { customerSupportId } from '../view/icons/customer-support';
import { serviceConfigurationId } from '../view/icons/service-configuration';
import { orderManagementIconId } from '../view/icons/order-management';
import { userManagementIconId } from '../view/icons/user-management';
import { wrenchIconId } from '../view/icons/wrench-black';

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
  BO_ROUTES.ADMIN_DASHBOARD,
  BO_ROUTES.ORDER_MANAGEMENT,
  BO_ROUTES.SERVICE_MANAGEMENT,
  BO_ROUTES.USER_MANAGEMENT,
  BO_ROUTES.CUSTOMER_SUPPORT,
  // BO_ROUTES.SERVICE_CONFIGURATION,
  BO_ROUTES.SETTINGS,
];

const topLevelIcons = [
  dashboardIconId,
  orderManagementIconId,
  wrenchIconId,
  userManagementIconId,
  customerSupportId,
  serviceConfigurationId,
  settingsIconId,
];

const translatePrefix = 'boSidemenu';

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
        // open support on new tab
        // linkEn:
        //   route.path === BO_ROUTES.SERVICE_CONFIGURATION.INQUIRY.path
        //     ? linkInquiryEn
        //     : undefined,
        // linkKo:
        //   route.path === BO_ROUTES.SERVICE_CONFIGURATION.INQUIRY.path
        //     ? linkInquiryKo
        //     : undefined,
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
      <svg style={{ width: 24, height: 24 }}>
        <use xlinkHref={`#${topLevelIcons[index]}`}></use>
      </svg>
    ),
    // Create sub menu items if is buildNestedRoutes
    children: route?.ROOT ? createMenuItems(route) : [],
  };
});
