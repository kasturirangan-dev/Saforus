import { Box, Typography } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import warning from '../assets/warning.svg';
import { useTranslation } from 'react-i18next';
import { formatSize } from '@web-workspace/saforus/common/utils';

type WatermarkContinueDialogProps = {
  onClose: () => void;
  title: string;
  description: string;
  onContinue: () => void;
  btnText?: { primaryBtnText: string; secondaryBtnText: string };
  btnAction?: { primaryBtnAction: () => void; secondaryBtnAction: () => void };
  availableSize?: number;
  contentCss?: React.CSSProperties;
};

const WatermarkContinueDialog = ({
  onClose,
  onContinue = () => {
    void 0;
  },
  title,
  description,
  contentCss = {},
  btnText,
  btnAction,
  availableSize,
}: WatermarkContinueDialogProps) => {
  const { t } = useTranslation();

  const handleContinue = () => {
    onContinue();
    onClose();
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '440px',
        },
      }}
      icon={<img src={warning} alt="Warning Icon" />}
      onClose={onClose}
      footer={
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          width="100%"
          marginX="10px"
        >
          <LoadingButton
            onClick={btnAction?.primaryBtnAction ?? handleContinue}
            fullWidth
            sx={{ height: 46, '&:hover': { boxShadow: `var(--shadow-sm)` } }}
          >
            {btnText?.primaryBtnText}
          </LoadingButton>
          <LoadingButton
            color="secondary"
            onClick={btnAction?.secondaryBtnAction ?? handleContinue}
            fullWidth
            sx={{ height: 46, '&:hover': { boxShadow: `var(--shadow-sm)` } }}
          >
            {btnText?.secondaryBtnText}
          </LoadingButton>
        </Box>
      }
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      dialogContent={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: '8px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '28px',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              color: 'var(--gray-700)',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="subtitle2"
            color="var(--gray-50)"
            whiteSpace="pre-line"
          >
            {description}
          </Typography>

          {typeof availableSize === 'number' && !isNaN(availableSize) && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: 'var(--gray-700)',
                padding: '4px 12px',
                margin: 'auto',
                backgroundColor: 'var(--neutral-300)',
              }}
            >
              {t('page-watermarking.create.storage-dialog.currentAvailable', {
                currentAvailable: formatSize(availableSize),
              })}
            </Typography>
          )}
        </Box>
      }
      contentCss={{ paddingBottom: '1.5rem', ...contentCss }}
    />
  );
};

export default WatermarkContinueDialog;
