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
  value: React.ReactNode;
}) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" gap="4px" alignItems="center">
      <Icon name="check" size={16} color="var(--green-600)" />

      <Typography variant="subtitle2" color="var(--gray-100)">
        {label}
      </Typography>
    </Box>
    <Box>
      {value && typeof value === 'string' ? (
        <Typography
          variant="subtitle2"
          color="var(--gray-700)"
          fontWeight="500"
        >
          {value}
        </Typography>
      ) : (
        value
      )}
    </Box>
  </Box>
);

export function ServiceInfo({ plan }: { plan: PlanInfo }) {
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

  const hasApiRequest =
    plan.planType === PLAN_TYPE.PROFESSIONAL ||
    plan.planType === PLAN_TYPE.ENTERPRISE;

  return (
    <Box>
      <Typography variant="subtitle1" color="var(--gray-700)" fontWeight={600}>
        {t('apiServicePlan.planDetail.service')}
      </Typography>
      <DetailContainer>
        <PlainDetail
          label={t('apiServicePlan.uploadLimit')}
          value={
            (uploadLimit &&
              t('apiServicePlan.fileSize', { size: uploadLimit })) ||
            ''
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
              : t('apiServicePlan.unlimited')
          }
        />
        {plan.moreInfo?.fileQtyLimit && (
          <PlainDetail
            label={t('apiServicePlan.webRequest')}
            value={t('apiServicePlan.file', {
              file: plan.moreInfo?.fileQtyLimit,
            })}
          />
        )}

        {hasApiRequest && (
          <PlainDetail
            label={t('apiServicePlan.developerAPI')}
            value={
              <Box textAlign="right">
                <Typography
                  variant="subtitle2"
                  color="var(--gray-700)"
                  fontWeight="500"
                >
                  {t('apiServicePlan.watermarking', {
                    price: plan.moreInfo?.watermarkApiPriceKRW,
                  })}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="var(--gray-700)"
                  fontWeight="500"
                >
                  {t('apiServicePlan.detection', {
                    price: plan.moreInfo?.detectionApiPriceKRW,
                  })}
                </Typography>
              </Box>
            }
          />
        )}
      </DetailContainer>
    </Box>
  );
}

export default ServiceInfo;
