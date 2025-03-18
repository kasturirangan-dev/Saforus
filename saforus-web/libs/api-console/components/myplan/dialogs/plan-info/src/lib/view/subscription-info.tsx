import { Box, Typography } from '@mui/material';
import { PlanInfo } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';
import { DetailContainer } from './styled-elements';

const PlainDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Typography variant="subtitle2" color="var(--gray-100)">
      {label}
    </Typography>
    {value && typeof value === 'string' && (
      <Typography variant="subtitle2" color="var(--gray-700)" fontWeight="500">
        {value}
      </Typography>
    )}
  </Box>
);

export function SubscriptionInfo({
  plan,
  startDate,
  nextPayDate,
  cancelledAt,
}: {
  plan: PlanInfo;
  startDate: string;
  nextPayDate: string;
  cancelledAt?: Date | string;
}) {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="subtitle1" color="var(--gray-700)" fontWeight={600}>
        {t('apiServicePlan.planDetail.subscription')}
      </Typography>
      <DetailContainer>
        <PlainDetail
          label={t('apiServicePlan.planDetail.subscribeAmount', {
            plan: t(`apiServicePlan.plan.${plan.planType}`),
          })}
          value={`${t('apiServicePlan.planDetail.amount', {
            amount: parseInt(plan.price).toLocaleString(),
          })} ${t(`apiServicePlan.${plan.billingType}`)}`}
        />
        <PlainDetail
          label={t('apiServicePlan.planDetail.startDate')}
          value={startDate}
        />
        <PlainDetail
          label={
            cancelledAt
              ? t('apiServicePlan.planDetail.endDate')
              : t('apiServicePlan.planDetail.nextPayment')
          }
          value={nextPayDate}
        />
      </DetailContainer>
    </Box>
  );
}

export default SubscriptionInfo;
