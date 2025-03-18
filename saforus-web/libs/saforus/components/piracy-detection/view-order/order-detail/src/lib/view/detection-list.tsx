import { Box, Card, Link, Typography, styled } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { CardTitle } from '@web-workspace/saforus/components/forensic-watermarking-v2/common';
import { StyledDataGrid, TableContent } from './styled-elements';
import { GridColDef } from '@mui/x-data-grid';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import { PiracyOrderStatus } from '@web-workspace/saforus/components/piracy-detection/view-order/data';
import UndetectedIcon from '../assets/undetected.svg';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import CircularProgress, {
  maxDisplayProgress,
} from '@web-workspace/shared/components/widgets/circular-progress';
import { addSeconds, subSeconds } from 'date-fns';
import { useEffect, useState } from 'react';

interface DetectedInfo {
  id: number;
  wtrCode: string | null | undefined;
  wtrDescription: string | null | undefined;
  wtrDate: string | null | undefined;
  sharedHistory: string | null | undefined;
}

const NoRowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  gap: '4px',
}));

function InProgress(progress: number) {
  const { t } = useTranslation();

  return (
    <NoRowContainer>
      <CircularProgress size={24} value={progress} />

      <Typography
        variant="subtitle1"
        fontWeight={600}
        color={'var(--gray-700)'}
      >
        {t('piracy-order-view.order-detail.message.inprogress-des-1')}
      </Typography>
      <Typography variant="body2" color="var(--gray-200)">
        {t('piracy-order-view.order-detail.message.inprogress-des-2')}
      </Typography>
    </NoRowContainer>
  );
}

function UnDetected() {
  const { t, i18n } = useTranslation();
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );
  return (
    <NoRowContainer>
      <img src={UndetectedIcon} alt="search-icon" />
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color={'var(--gray-700)'}
      >
        {t('piracy-order-view.order-detail.message.undetected-des-1')}
      </Typography>
      <Typography variant="body2" color="var(--gray-200)">
        {t('piracy-order-view.order-detail.message.undetected-des-2')}
      </Typography>
      <Typography variant="body2" color="var(--gray-200)">
        <Trans
          i18nKey="piracy-order-view.order-detail.message.undetected-des-3"
          components={[
            <Link target="_blank" href={linkSupport} underline="none" />,
          ]}
        ></Trans>
      </Typography>
    </NoRowContainer>
  );
}

const DetectionList = ({
  detectionList,
  status,
  reqDate,
  esCompletedTime,
}: {
  detectionList: DetectedInfo[];
  status?: string;
  reqDate?: string | number | Date;
  esCompletedTime?: string | number | Date;
}) => {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  const columns: GridColDef[] = [
    {
      field: 'wtrCode',
      headerName: `${t('piracy-order-view.order-detail.watermark-code')}`,
      width: 200,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            sx={{
              color: 'var(--purple-600)',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            {params.value ?? '--'}
          </TableContent>
        );
      },
    },
    {
      field: 'wtrDate',
      headerName: `${t('piracy-order-view.order-detail.watermarked-date')}`,
      width: 280,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        const formattedDate = params.value
          ? `${formatDateWithLanguage({
              date: params.value,
              isDetail: true,
              withSlash: true,
              tzOffset,
            })} (GMT${timeZone})`
          : '--';
        return (
          <TableContent sx={{ color: 'var(--gray-25)' }}>
            {formattedDate}
          </TableContent>
        );
      },
    },
    {
      field: 'wtrDescription',
      headerName: `${t('piracy-order-view.order-detail.description')}`,
      minWidth: 300,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell(params) {
        return <TableContent> {params.value ?? '--'}</TableContent>;
      },
    },
    {
      field: 'sharedEmails',
      headerName: `${t('piracy-order-view.order-detail.share-history')}`,
      width: 260,
      sortable: true,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <TableContent
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6em',
              width: '100%',
            }}
          >
            {Array.isArray(params.value) && params.value.length > 0
              ? params.value.map((email: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      padding: '2px 8px',
                      backgroundColor: 'var(--neutral-300)',
                      borderRadius: '5px',
                      color: 'var(--gray-700)',
                    }}
                  >
                    {email}
                  </Box>
                ))
              : '--'}
          </TableContent>
        );
      },
    },
  ];

  // Pre-calculate progress to prevent flickering in NoRowsOverlay
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timerId: NodeJS.Timer;
    if (reqDate && esCompletedTime) {
      const requestTime = new Date(reqDate).getTime();
      const esTime = new Date(esCompletedTime).getTime();
      timerId = setInterval(() => {
        const now = +new Date();
        const progress = Math.min(
          ((now - requestTime) / (esTime - requestTime)) * 100,
          maxDisplayProgress
        );
        setProgress(progress);
        if (now > esTime) {
          clearInterval(timerId);
        }
      }, 100);
    } else {
      setProgress(0);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [reqDate, esCompletedTime]);

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'var(--base-white)',
        borderRadius: '8px',
        border: '1px solid var(--neutral-600)',
      }}
    >
      <CardTitle
        sx={{
          cursor: 'pointer',
        }}
      >
        {t('piracy-order-view.order-detail.detection-result')}
      </CardTitle>
      <Box sx={{ padding: '0px 16px 16px 16px' }}>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <StyledDataGrid
              rows={detectionList}
              rowCount={detectionList.length}
              columns={columns}
              paginationMode="server"
              loading={false}
              hideFooter={true}
              slots={{
                noRowsOverlay:
                  status === PiracyOrderStatus.IN_PROGRESS
                    ? () => InProgress(progress)
                    : UnDetected,
              }}
              noRowsHeight="272px"
              getRowHeight={() => 'auto'}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default DetectionList;
