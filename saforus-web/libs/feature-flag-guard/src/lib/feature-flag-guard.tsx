import React from 'react';
import { useSnapshot } from 'valtio';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import {
  FeatureFlag,
  FeatureFlagStore,
} from '@web-workspace/shared/feature-flag';

interface FeatureGuardProps {
  feature: FeatureFlag;
  children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ feature, children }) => {
  const { featureFlags, loading } = useSnapshot(FeatureFlagStore);

  if (loading || !featureFlags) {
    return null; // Or your preferred loading state
  }

  if (!featureFlags[feature]) {
    return <Navigate to={ROUTES.NOTFOUND.path} replace />;
  }

  return children;
};

export default FeatureGuard;
