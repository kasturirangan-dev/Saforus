import { Box, Typography, styled } from '@mui/material';
import {
  StaticsTitle,
  BoxContent,
  AreaChartCard,
} from '@web-workspace/saforus-bo/components/dashboard/common';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { AdminDashboardStore } from '@web-workspace/saforus-bo/components/dashboard/data';
import { useMemo } from 'react';
import UpIcon from '@mui/icons-material/North';
import DownIcon from '@mui/icons-material/South';

interface UserOverViewProps {
  isloading: boolean;
}

export const TableContent = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',

  color: 'var(--gray-700)',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
}));

const UserTrend: React.FC<UserOverViewProps> = ({ isloading }) => {
  const { t, i18n } = useTranslation();
  const { userTrend } = useSnapshot(AdminDashboardStore);
  const currentYear = new Date().getFullYear();

  const chartData = useMemo(() => {
    const locale = i18n.language === 'ko' ? 'ko' : 'en';

    return (
      userTrend?.userCounts?.map((item) => {
        return {
          name: new Date(item.statDate).toLocaleDateString(locale, {
            month: 'short',
          }),
          value: item.totalUserCount,
        };
      }) || []
    );
  }, [userTrend, i18n.language]);

  return (
    <BoxContent gap="24px">
      <StaticsTitle>{t('adminDashboard.user-trend.title')}</StaticsTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Typography variant="h6" color="var(--gray-700)">
            {userTrend.increasePercentage}%
          </Typography>
          {userTrend.increasePercentage < 0 ? (
            <DownIcon fontSize="small" sx={{ color: 'var(--red-500)' }} />
          ) : (
            <UpIcon fontSize="small" sx={{ color: 'var(--green-500)' }} />
          )}
        </Box>
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: '500',
            lineHeight: '18px',
            color: 'var(--neutral-800)',
          }}
        >
          {t('adminDashboard.user-trend.description', {
            current: currentYear,
            previous: currentYear - 1,
          })}
        </Typography>
      </Box>
      <Box width="400px" height="380px" margin="10px 0 0 -10px">
        <AreaChartCard data={chartData} />
      </Box>
    </BoxContent>
  );
};
export default UserTrend;
