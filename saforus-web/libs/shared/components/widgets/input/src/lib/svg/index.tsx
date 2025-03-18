import React from 'react';
import { SvgInfo } from './info';

export const enum InputIcon {
  Info = 'info',
}

export const importIcon = (
  icon: InputIcon | React.ReactNode
): React.ReactNode => {
  if (typeof icon !== 'string') {
    return icon;
  }

  switch (icon) {
    case InputIcon.Info:
      return <SvgInfo />;
    default:
      return <SvgInfo />;
  }
};
