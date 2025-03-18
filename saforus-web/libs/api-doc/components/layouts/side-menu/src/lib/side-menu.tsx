import React from 'react';
import SideMenuView from './views';

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

interface SideMenuContainerProps {
  ast?: ASTNode;
}

const SideMenuContainer: React.FC<SideMenuContainerProps> = ({ ast }) => {
  return <SideMenuView ast={ast}/>;
};

export default SideMenuContainer;
