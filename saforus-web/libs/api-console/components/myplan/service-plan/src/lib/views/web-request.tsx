import { Box, Typography } from '@mui/material';
import { PlanInfo } from '@web-workspace/api-console/common/model';
import { useTranslation } from 'react-i18next';
import { DetailContainer } from './styled-elements';
import Icon from '@web-workspace/shared/components/widgets/icon';

export function WebRequestDetail({ plan }: { plan: PlanInfo }) {
  const { t } = useTranslation();

  return (
    <DetailContainer sx={{ gap: '4px' }}>
      <Box display="flex" gap="4px" alignItems="center">
        <Icon name="check" size={16} color="var(--green-600)" />
        <Typography variant="subtitle2" color="var(--gray-100)">
          {t('apiServicePlan.webRequest')}
        </Typography>
      </Box>
      {plan.moreInfo?.fileQtyLimit && (
        <Box component="ul" sx={{ pl: '24px' }}>
          <Typography
            component="li"
            variant="subtitle2"
            color="var(--gray-700)"
            fontWeight="500"
            whiteSpace="nowrap"
          >
            {t('apiServicePlan.file', {
              file: plan.moreInfo?.fileQtyLimit,
            })}
          </Typography>
        </Box>
      )}
    </DetailContainer>
  );
}

export default WebRequestDetail;
