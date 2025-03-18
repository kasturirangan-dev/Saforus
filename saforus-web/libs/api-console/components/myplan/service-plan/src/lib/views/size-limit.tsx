import { Box, Typography } from '@mui/material';
import { PlanInfo } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';
import { DetailContainer } from './styled-elements';
import { formatSize } from '@web-workspace/shared/helpers/format';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { PLAN_TYPE } from '@web-workspace/api-console/common/model';

const PlainDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) => (
  <Box display="flex" gap="4px" alignItems="center">
    <Icon name="check" size={16} color="var(--green-600)" />

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

export function SizeLimitDetail({ plan }: { plan: PlanInfo }) {
  const { t } = useTranslation();

  const uploadLimit = plan.moreInfo?.fileSizeLimitInBytes
    ? formatSize(plan.moreInfo?.fileSizeLimitInBytes)
    : undefined;
  const storageLimit = plan.moreInfo?.storageInBytes
    ? formatSize(plan.moreInfo?.storageInBytes)
    : undefined;
  const detectablePeriod = plan.moreInfo?.detectablePeriodInMonths
    ? plan.moreInfo?.detectablePeriodInMonths / 12
    : undefined;

  return (
    <DetailContainer>
      <PlainDetail
        label={t('apiServicePlan.uploadLimit')}
        value={
          uploadLimit
            ? t('apiServicePlan.fileSize', {
                size: uploadLimit,
              })
            : ''
        }
      />
      <PlainDetail
        label={t('apiServicePlan.storageLimit')}
        value={storageLimit}
      />
      <PlainDetail
        label={t('apiServicePlan.detectablePeriod')}
        value={
          detectablePeriod
            ? t('apiServicePlan.year', { year: detectablePeriod })
            : plan.planType === PLAN_TYPE.ENTERPRISE
            ? undefined
            : t('apiServicePlan.unlimited')
        }
      />
    </DetailContainer>
  );
}

export default SizeLimitDetail;
