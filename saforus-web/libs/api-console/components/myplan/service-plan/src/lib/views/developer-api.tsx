import { Box, Typography } from '@mui/material';
import { PlanInfo, PLAN_TYPE } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';
import { DetailContainer } from './styled-elements';
import Icon from '@web-workspace/shared/components/widgets/icon';

export function ApiDetail({
  plan,
  isMostPopular,
}: {
  plan: PlanInfo;
  isMostPopular: boolean;
}) {
  const { t } = useTranslation();
  const hasApiRequest =
    plan.planType === PLAN_TYPE.PROFESSIONAL ||
    plan.planType === PLAN_TYPE.ENTERPRISE;

  return hasApiRequest ? (
    <DetailContainer
      sx={{
        gap: '4px',
        backgroundColor: isMostPopular
          ? 'var(--orange-50)'
          : 'var(--neutral-100)',
        border: isMostPopular ? '1px solid var(--orange-100)' : 'none',
      }}
    >
      <Box display="flex" gap="4px" alignItems="center">
        <Icon name="check" size={16} color="var(--green-600)" />
        <Typography variant="subtitle2" color="var(--gray-100)">
          {t('apiServicePlan.developerAPI')}
        </Typography>
      </Box>
      <Box component="ul" sx={{ pl: '24px' }}>
        {plan.moreInfo?.watermarkApiPriceKRW && (
          <Typography
            component="li"
            variant="subtitle2"
            color="var(--gray-700)"
            fontWeight="500"
          >
            {t('apiServicePlan.watermarking', {
              price: plan.moreInfo?.watermarkApiPriceKRW,
            })}
          </Typography>
        )}
        {plan.moreInfo?.detectionApiPriceKRW && (
          <Typography
            component="li"
            variant="subtitle2"
            color="var(--gray-700)"
            fontWeight="500"
          >
            {t('apiServicePlan.detection', {
              price: plan.moreInfo?.detectionApiPriceKRW,
            })}
          </Typography>
        )}
      </Box>
    </DetailContainer>
  ) : null;
}

export default ApiDetail;
