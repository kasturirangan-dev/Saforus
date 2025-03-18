import { Box, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IMediaData } from './interface';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import ProgressBarLabel from '@web-workspace/shared/components/widgets/progress-bar-label';
import { downloadAttackment } from './api';
import { MediaIcon } from '@web-workspace/shared/components/widgets/icon';

export function FailedRetrieve({
  selectedMedia,
  setIsDownloading,
}: {
  selectedMedia: IMediaData;
  setIsDownloading: (isDownloading: boolean) => void;
}) {
  const { t } = useTranslation();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadPercent, setDownloadPercent] = useState(0);
  useEffect(() => {
    setIsDownloading(false);
    setDownloadLoading(false);
    setDownloadPercent(0);
  }, [selectedMedia]);

  useEffect(() => {
    if (downloadLoading) {
      setIsDownloading(true);
      const controller = new AbortController();
      const signal = controller.signal;
      (async () => {
        try {
          await downloadAttackment({
            fileId: selectedMedia.orderInfoSq,
            orderInfoFileName: selectedMedia.psnInfoFileNm,
            signal,
            setDownloadPercent,
          });
        } catch (error: any) {
          const errorMessage = await error?.response.data.text();
          showToast.error(JSON.parse(errorMessage).resultMsg);
        } finally {
          setIsDownloading(false);
        }
      })();
      return () => {
        // Cancel the request when the component unmounts
        controller.abort();
      };
    }
  }, [downloadLoading, selectedMedia]);

  return !downloadLoading ? (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <MediaIcon name="file" />
      <Typography
        sx={{
          color: 'var(--gray-50)',
          marginTop: '10px',
        }}
      >
        {selectedMedia.title}
      </Typography>
      <Typography
        sx={{
          color: 'var(--gray-50)',
          marginTop: '10px',
        }}
      >
        {t('find-order-number.failed-retrieve')}
      </Typography>

      <Typography
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          color: 'var(--gray-50)',
        }}
      >
        <Trans
          i18nKey={'find-order-number.download-file'}
          components={[
            <Box
              sx={{
                color: 'var(--purple-600)',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => {
                setDownloadLoading(true);
              }}
            ></Box>,
          ]}
        ></Trans>
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '35%',
        }}
      >
        <ProgressBarLabel
          sxLabel={{ fontSize: '14px' }}
          value={downloadPercent}
          notionlabel={' '}
        />
      </Box>
    </Box>
  );
}

export default FailedRetrieve;
