import React from 'react';

interface ASTNode {
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

export type MainLayoutProps = {
  children: React.ReactNode;
  navbarCss?: React.CSSProperties;
  additionalNavbarCss?: React.CSSProperties;
  sideBarCss?: React.CSSProperties;
  ast?: ASTNode;
};
