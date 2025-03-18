import { Box, ButtonBase, Typography } from '@mui/material';
import i18next, { t } from 'i18next';
import { BarChart } from '@web-workspace/saforus/components/dashboard/service-usage/common';
import ToggleButtons from '@web-workspace/saforus/components/dashboard/service-usage/toggle-button';
import {
  DashboardServiceUsageStore,
  PeriodEnum,
} from '@web-workspace/saforus/components/dashboard/service-usage/data';
import { useSnapshot } from 'valtio';
import {
  formatDateWithLanguage,
  getYearValue,
} from '@web-workspace/shared/helpers/dates';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { pxToVw } from '@web-workspace/saforus/common/utils';
import digitalIcon from './assets/digital.svg';

type UsageByPeriod = {
  loading: boolean;
};

const UsageByPeriod = ({ loading }: UsageByPeriod) => {
  const { chartData, graphDate, period } = useSnapshot(
    DashboardServiceUsageStore
  );

  const formattedStartDate = formatDateWithLanguage(
    graphDate.startDate,
    i18next.language,
    undefined,
    undefined,
    undefined,
    true
  );
  const formattedEndDate = formatDateWithLanguage(
    graphDate.endDate,
    i18next.language,
    undefined,
    undefined,
    undefined,
    true
  );

  return (
    <Box
      display={'flex'}
      gap={pxToVw('8px')}
      sx={{
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: pxToVw('530px'),
      }}
    >
      <LoadingOverLayer loading={loading} isTransparent />

      <Box display={'flex'} flexDirection={'column'}>
        <Box
          display="flex"
          gap="0.25rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              padding={pxToVw('4px')}
              borderRadius={pxToVw('4px')}
              border={`${pxToVw('1px')} solid var(--purple-100)`}
              marginRight={'10px'}
            >
              <img
                src={digitalIcon}
                alt="service icon"
                height={pxToVw(20, true)}
                width={pxToVw(20, true)}
              />
            </Box>
            <Typography
              fontSize={pxToVw('20px')}
              fontWeight={500}
              lineHeight={pxToVw('28px')}
              color="var(--gray-700)"
            >
              {t('dashboard.service-usage.usage-by-period.title')}
            </Typography>
          </Box>

          {/* <Typography
            variant="subtitle1"
            fontWeight={700}
            color={'var(--gray-50)'}
          >
            {period === PeriodEnum.YEARLY
              ? `${getYearValue(formattedStartDate)} ~ ${getYearValue(
                  formattedEndDate
                )}`
              : `${formattedStartDate} ~ ${formattedEndDate}`}
          </Typography> */}
          <ToggleButtons />
        </Box>
      </Box>
      <Box
        sx={{
          border: '1px solid var(--neutral-700)',
          borderRadius: '8px',
          padding: '16px 24px 24px 24px',
          backgroundColor: 'var(--base-white)',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <BarChart chartData={chartData} dataKey={'periodName'} />
      </Box>
    </Box>
  );
};

export default UsageByPeriod;
