import {
  Box,
  Card,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import { useSnapshot } from 'valtio';
import {
  OrderFile,
  PiracyOrderFileStatus,
} from '@web-workspace/api-console/components/piracy-detection/data';
import { CardTitle } from '@web-workspace/api-console/common/views';
import UnDetectedView from './undetected-view';
import InProgressView from './inprogress-view';
import { StyledTable, StyledTableContainer } from './styled-elements';

interface WtrOrderFiles {
  id: string;
  wtrName: string;
  wtrDescription: string;
  wtrDownloadUrl: string;
  createdAt: Date | string;
}

const DetectionList = ({
  currentFile,
  reqDate,
  esCompletedTime,
  detectionResult,
  handleRetry,
}: {
  currentFile?: OrderFile;
  reqDate?: string | number | Date;
  esCompletedTime?: string | number | Date;
  detectionResult: WtrOrderFiles[];
  handleRetry: (orderFileKey: string) => void;
}) => {
  const { t } = useTranslation();
  const { timeZone, tzDisplayOffset: tzOffset } = useSnapshot(AuthStore);

  const detectionList =
    currentFile?.status === PiracyOrderFileStatus.DETECTED
      ? detectionResult
      : [];

  const formattedDate = (date: Date | string) => {
    const formattedDate = date
      ? formatDateWithLanguage({
          date,
          isDetail: true,
          withSlash: true,
          tzOffset,
        })
      : '--';
    return (
      <>
        {formattedDate.split(' ')[0]}
        <br />
        {formattedDate.split(' ')[1]} {formattedDate.split(' ')[2]}
        {` (GMT${timeZone})`}
      </>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'var(--base-white)',
        borderRadius: '8px',
        border: '1px solid var(--neutral-600)',
      }}
    >
      <CardTitle>{t('apiDetection.order-detail.detection-result')}</CardTitle>
      <Box sx={{ padding: '0px 16px 16px 16px' }}>
        {/* Use table instead of data-grid to prevent flickering in button and loading spinner */}
        <StyledTableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>
                  {t('apiDetection.order-detail.watermark-description')}
                </TableCell>
                <TableCell width={200}>
                  {t('apiDetection.order-detail.created-date')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detectionList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>
                    {currentFile?.status ===
                    PiracyOrderFileStatus.AWAITING_PROCESS ? (
                      <InProgressView
                        reqDate={reqDate}
                        esCompletedTime={esCompletedTime}
                      />
                    ) : (
                      <UnDetectedView
                        retryCount={currentFile?.retryAttempts}
                        handleRetry={handleRetry}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                detectionList.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.wtrDescription ?? '--'}</TableCell>
                    <TableCell>{formattedDate(file.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>
      </Box>
    </Card>
  );
};

export default DetectionList;
