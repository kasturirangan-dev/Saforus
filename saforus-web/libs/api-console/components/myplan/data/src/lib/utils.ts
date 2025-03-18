import { PLAN_TYPE } from '@web-workspace/api-console/common/model';

export const PLAN_RANK: { [key: string]: number } = {
  FREE: 0,
  BASIC: 1,
  PROFESSIONAL: 2,
  ENTERPRISE: 3,
};

export const canUpgradePlan = (
  currentPlan: PLAN_TYPE | string | undefined,
  newPlan: PLAN_TYPE | string
): boolean => {
  if (!currentPlan) return false;
  return PLAN_RANK[currentPlan] < PLAN_RANK[newPlan];
};
