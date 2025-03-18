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

export interface ASTNode {
  type: string;
  data?: unknown;
  children?: ASTNode[];
  value?: string;
  depth?: number;
  url?: string;
  lang?: string;
  title?: string | null | undefined;
  Root?: React.ReactNode;
}

type FormattedValue = {
  original: string;
  formattedPath: string;
  children: FormattedValue[]; // Assuming children can have the same structure
};


// const topLevelIcons = [
//   dashboardIconId,
//   videoId,
//   bitsId,
//   userSecurityId,  
//   settingsIconId,
//   questionId,
// ];


const menuMasterIcons = [dashboardIconId, bitsId, userSecurityId, questionId];



export const getMenuMaster = (ast?: ASTNode): MenuItem[] => {

  // Function to format string for path
  const formatForPath = (str: string) => `#${str.toLowerCase().replace(/\s+/g, '-')}`;

  // Recursive function to extract, format, and nest heading values based on depth
  const extractAndNestFormattedValues = (astNode: ASTNode, depthRecord: { lastDepth1: FormattedValue | null, lastDepth2: FormattedValue | null } = { lastDepth1: null, lastDepth2: null }) => {
    const values: FormattedValue[] = [];

    astNode.children?.forEach(child => {
      if (child.type === 'heading' && child.children?.[0]?.value) {
        const formattedValue: FormattedValue = {
          original: child.children[0].value,
          formattedPath: formatForPath(child.children[0].value),
          children: []
        };

        switch (child.depth) {
          case 1:
            depthRecord.lastDepth1 = formattedValue;
            depthRecord.lastDepth2 = null; // Reset lastDepth2 when a new depth 1 is encountered
            values.push(formattedValue);
            break;
          case 2:
            if (depthRecord.lastDepth1) {
              depthRecord.lastDepth2 = formattedValue; // Update lastDepth2 for nesting depth 3 items
              depthRecord.lastDepth1.children.push(formattedValue);
            }
            break;
          case 3:
            if (depthRecord.lastDepth2) {
              depthRecord.lastDepth2.children.push(formattedValue); // Nest depth 3 items under depth 2
            }
            break;
        }
      }

      if (child.children) {
        extractAndNestFormattedValues(child, depthRecord); // Recurse into children
      }
    });

    return values;
  };

  // Assuming ast is defined and has the expected structure
  const nestedFormattedValues = ast ? extractAndNestFormattedValues(ast) : [];

  return nestedFormattedValues.flatMap((value, index) => {
    // Function to recursively map values to menu items
    const mapValuesToMenuItems = (value: FormattedValue, index: number, parentIndex: string): any => ({
      id: `menu-${parentIndex}${index}-beta`, // Ensure unique ID for each item
      name: value.original, // Use the heading value as the name
      path: value.formattedPath, // Use the formatted heading path
      icon: (
        <svg>
          <use xlinkHref={`#${menuMasterIcons[(parseInt(parentIndex + index) % menuMasterIcons.length)]}`}></use>
        </svg>
      ),
      children: value.children.map((child, childIndex) => mapValuesToMenuItems(child, childIndex, `${index}-`)),
    });

    return mapValuesToMenuItems(value, index, '');
  });
};

