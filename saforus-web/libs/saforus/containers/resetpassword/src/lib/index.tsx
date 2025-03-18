import React from 'react';
import ResetPasswordView from './view';

export interface SaforusContainersResetPasswordProps {
  [key: string]: any;
}

export function SaforusContainersResetPassword(
  props: SaforusContainersResetPasswordProps
) {
  return <ResetPasswordView />;
}

export default React.memo(SaforusContainersResetPassword);
