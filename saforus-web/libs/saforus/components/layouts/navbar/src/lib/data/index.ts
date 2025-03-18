import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { IMenu } from './interface';

export const menus: IMenu[] = [
  {
    key: 'home',
    title: 'Home',
    link: ROUTES.DASHBOARD.PACKAGES_DELIVERY.path,
    icon: 'home',
  },
  {
    key: 'products',
    title: 'Our Products',
    link: ROUTES.PRODUCTS.path,
    icon: 'products',
  },
  {
    key: 'resources',
    title: 'Resources',
    link: ROUTES.RESOURCES.path,
    icon: 'resources',
    children: [
      {
        key: 'documentation',
        title: 'Documentation',
        link: ROUTES.RESOURCES.path,
      },
    ],
  },
  {
    key: 'contacts',
    title: 'Contacts',
    link: ROUTES.CONTACTS.path,
    icon: 'contacts',
  },
];

const useNavbarData = () => {
  return {};
};

export default useNavbarData;
