import React from 'react';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import { settingsIconId } from '../views/icons/settings';
import { dashboardIconId } from '../views/icons/dashboard';
import { videoId } from '../views/icons/videos';
import { bitsId } from '../views/icons/bits';
import { userSecurityId } from '../views/icons/user-security';
import { questionId } from '../views/icons/question';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { pxToVw } from '@web-workspace/saforus/common/utils';

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
  ROUTES.DASHBOARD,
  ROUTES.MULTI_DRM_PACKAGING,
  ROUTES.FORENSIC_WATERMARKING,
  ROUTES.PIRACY_DETECTION,
  ROUTES.SETTINGS,
  ROUTES.HELP,
];

const topLevelIcons = [
  dashboardIconId,
  videoId,
  bitsId,
  userSecurityId,
  settingsIconId,
  questionId,
];

const menuMasterRoutes = [
  ROUTES.DASHBOARD,
  ROUTES.FORENSIC_WATERMARKING,
  ROUTES.PIRACY_DETECTION,
  { ROOT: ROUTES.HELP.ROOT },
];
const menuMasterIcons = [dashboardIconId, bitsId, userSecurityId, questionId];

const translatePrefix = 'sidemenu';

// const linkInquiryEn = getEnvVar('VITE_SUPPORT_URL');
// const linkInquiryKo = getEnvVar('VITE_SUPPORT_KO_URL');

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
        // linkEn:
        //   route.path === ROUTES.HELP.INQUIRY.path ||
        //   route.path === ROUTES.HELP.HELP_CENTER.path
        //     ? linkInquiryEn
        //     : undefined,
        // linkKo:
        //   route.path === ROUTES.HELP.INQUIRY.path ||
        //   route.path === ROUTES.HELP.HELP_CENTER.path
        //     ? linkInquiryKo
        //     : undefined,
      });
    }
  }

  return items;
};
export const menuData: MenuItem[] = topLevelRoutes.map((route, index) => {
  const name = route.ROOT.split('/').pop() || '';
  return {
    id: `${Object.keys(route)[0]}-${index}`,
    name: `${translatePrefix}.${name}`,
    path: route.ROOT,
    icon: (
      <svg>
        <use xlinkHref={`#${topLevelIcons[index]}`}></use>
      </svg>
    ),
    children: createMenuItems(route),
  };
});

export const menuMaster: MenuItem[] = menuMasterRoutes.map((route, index) => {
  const name = route.ROOT.split('/').pop() || '';
  return {
    id: `${Object.keys(route)[0]}-${index}-beta`,
    name: `${translatePrefix}.${name}`,
    path: route.ROOT,
    icon: (
      <svg>
        <use xlinkHref={`#${menuMasterIcons[index]}`}></use>
      </svg>
    ),
    children: createMenuItems(route),
  };
});
