import { Box, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import {
  canUpgradePlan,
  usePaymentData,
  useServicePlanData,
} from '@web-workspace/api-console/components/myplan/data';
import { PlanView } from '@web-workspace/api-console/components/myplan/service-plan';
import Footer from './views/footer';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { PLAN_TYPE } from '@web-workspace/api-console/common/model';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
}));

const BoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '4px',
  paddingTop: '16px',
}));

const BoxContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  position: 'relative',
}));

export function ServicesPlanContainer() {
  const { t } = useTranslation();

  const { isPlanLoading, plans } = useServicePlanData();
  const { currentPlan, openPlanInfo, disabledAction } = usePaymentData();
  const subscriptionTier = currentPlan?.plan?.planType || '';

  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan')?.toUpperCase() || '';

  // Pre select plan from url
  const hasPreSelected = useRef<boolean>(false); // Track execution
  useEffect(() => {
    if (hasPreSelected.current) return;

    if (currentPlan && plans) {
      hasPreSelected.current = true;
      const selectedPlan = plans.find((p) => p.planType === plan);
      if (!selectedPlan || selectedPlan?.planType === PLAN_TYPE.FREE) return;

      const isCurrentPlan = subscriptionTier === plan;
      const canUpgrade =
        !disabledAction && canUpgradePlan(subscriptionTier, plan);

      if (isCurrentPlan || canUpgrade) {
        openPlanInfo(selectedPlan);
      }
    }
  }, [plans, currentPlan]);

  return (
    <BoxContainer>
      <BoxTitle>
        <Typography
          sx={{
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '36px',
            letterSpacing: '-0.02em',
            color: 'var(--gray-700)',
          }}
        >
          {t('apiServicePlan.title')}
        </Typography>
        <Typography variant="body2" color="var(--gray-50)">
          {t('apiServicePlan.description')}
        </Typography>
      </BoxTitle>
      <BoxContent>
        <LoadingOverLayer loading={isPlanLoading} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            minHeight: '520px',
          }}
        >
          {plans?.map((plan) => (
            <PlanView
              plan={plan}
              key={plan.id}
              openPlanInfo={openPlanInfo}
              canUpgrade={
                !disabledAction &&
                canUpgradePlan(subscriptionTier, plan.planType)
              }
              subscriptionTier={subscriptionTier || ''}
            />
          ))}
        </Box>
        <Typography variant="body2" color="var(--gray-50)">
          {t('apiServicePlan.help-text')}
        </Typography>
      </BoxContent>
      <Footer />
    </BoxContainer>
  );
}

export default ServicesPlanContainer;
