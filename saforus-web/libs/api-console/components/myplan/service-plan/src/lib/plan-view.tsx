import { Box, Typography } from '@mui/material';
import { PlanInfo } from '@web-workspace/api-console/common/model';
import { PLAN_TYPE } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';
import {
  PlainContainer,
  PlanPrice,
  PlanTitle,
  TitleContainer,
} from './views/styled-elements';
import ApiDetail from './views/developer-api';
import WebRequestDetail from './views/web-request';
import SizeLimitDetail from './views/size-limit';
import PlanAction from './views/action';

export function PlanView({
  plan,
  openPlanInfo,
  canUpgrade,
  subscriptionTier,
}: {
  plan: PlanInfo;
  openPlanInfo: (plan: PlanInfo) => void;
  canUpgrade: boolean;
  subscriptionTier: string;
}) {
  const { t } = useTranslation();
  const isMostPopular = plan.planType === PLAN_TYPE.PROFESSIONAL;

  return (
    <PlainContainer
      sx={{
        border:
          subscriptionTier === plan.planType
            ? plan.planType === PLAN_TYPE.PROFESSIONAL
              ? '2px solid var(--orange-600)'
              : '2px solid var(--purple-600)'
            : '1px solid var(--neutral-300)',
      }}
    >
      <TitleContainer
        sx={{
          backgroundColor: isMostPopular ? 'var(--orange-100)' : 'inherit',
        }}
      >
        {/* Title */}
        <Box display="flex" gap="8px" alignItems="center">
          <PlanTitle>{t(`apiServicePlan.${plan.planType}`)}</PlanTitle>
          {isMostPopular && (
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{
                padding: '2px 8px',
                color: 'var(--base-white)',
                backgroundColor: 'var(--orange-500)',
                borderRadius: '5px',
              }}
            >
              {t('apiServicePlan.mostPopular')}
            </Typography>
          )}
        </Box>
        {plan.planType === PLAN_TYPE.ENTERPRISE ? (
          <PlanPrice> {t('apiServicePlan.letTalk')}</PlanPrice>
        ) : (
          <Box display="flex" gap="4px" alignItems="center">
            <Typography variant="subtitle2" color="var(--gray-700)">
              {t(`apiServicePlan.${plan.currency}`)}
            </Typography>
            <PlanPrice>{parseInt(plan.price).toLocaleString()}</PlanPrice>
            <Typography variant="subtitle2" color="var(--gray-700)">
              {t(`apiServicePlan.${plan.billingType}`)}
            </Typography>
          </Box>
        )}
      </TitleContainer>

      {/* Detail */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 16px 32px 16px',
          gap: '12px',
        }}
      >
        <SizeLimitDetail plan={plan} />
        <WebRequestDetail plan={plan} />
        <ApiDetail plan={plan} isMostPopular={isMostPopular} />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: '0px 16px 16px 16px',
          marginTop: 'auto',
        }}
      >
        <PlanAction
          plan={plan}
          isMostPopular={isMostPopular}
          openPlanInfo={openPlanInfo}
          canUpgrade={canUpgrade}
          subscriptionTier={subscriptionTier}
        />
      </Box>
    </PlainContainer>
  );
}

export default PlanView;
