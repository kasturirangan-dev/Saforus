import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import InfoIcon from '../assets/info-red.svg';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

type DialogViewProps = {
  onClose: () => void;
  onFreeUpSpace: () => void;
  onUpgrade: () => void;
};

const DialogView: React.FC<DialogViewProps> = ({
  onClose,
  onFreeUpSpace,
  onUpgrade,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '5px',
        },
      }}
      onClose={onClose}
      icon={<img src={InfoIcon} alt="information" height={32} width={32} />}
      contentCss={{ margin: 'auto' }}
      footer={
        <>
          <Button
            color="secondary"
            fullWidth
            sx={{ mr: 2, height: 46, padding: '6px 12px' }}
            onClick={onClose}

            // onClick={onFreeUpSpace}
          >
            {/* {t('limit-reached.btn.free-up')} */}
            {t('limit-reached.btn.close')}
          </Button>

          <Button
            color="primary"
            fullWidth
            sx={{ height: 46, padding: '6px 12px' }}
            onClick={onUpgrade}
          >
            {t('limit-reached.btn.upgrade-plan')}
          </Button>
        </>
      }
      dialogContent={
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '28px',
              letterSpacing: '-0.4px',
              textAlign: 'center',
            }}
          >
            {t('limit-reached.storage-title')}
          </Typography>
          <Typography
            variant="subtitle2"
            fontFamily="Inter, Pretendard"
            color={'var(--gray-50)'}
            textAlign="center"
            whiteSpace="pre-line"
          >
            {t('limit-reached.storage-desc')}
          </Typography>
        </Box>
      }
    />
  );
};

export default React.memo(DialogView);
