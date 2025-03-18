import React from 'react';

export type MainLayoutProps = {
  children: React.ReactNode;
  navbarCss?: React.CSSProperties;
  additionalNavbarCss?: React.CSSProperties;
  sideBarCss?: React.CSSProperties;
};
