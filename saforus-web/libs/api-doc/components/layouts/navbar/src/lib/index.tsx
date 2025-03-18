import React from 'react';
import NavbarView, { NavbarViewProps } from './view';

export function NavbarContainer(props: NavbarViewProps) {
  return <NavbarView {...props} />;
}

export default React.memo(NavbarContainer);
