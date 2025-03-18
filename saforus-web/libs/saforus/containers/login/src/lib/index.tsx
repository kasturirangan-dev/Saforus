import LoginView from './view';
import React from 'react';

export interface SaforusContainersLoginProps {
  [key: string]: any;
}

export function SaforusContainersLogin(props: SaforusContainersLoginProps) {
  return <LoginView />;
}

export default React.memo(SaforusContainersLogin);
