import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { OrderFile } from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';
import MediaPreview from '@web-workspace/shared/components/widgets/media-preview';
import { StyledAlert } from './views/styled-elements';

export function PreviewDialog({
  orderFile,
  onClose,
  onCancel,
}: {
  orderFile: OrderFile;
  onClose: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const previewUrl =
    orderFile?.moreInfo?.craftedLinks?.preview ||
    orderFile?.moreInfo?.craftedLinks?.playback ||
    orderFile?.moreInfo?.craftedLinks?.large;
  const control = previewUrl !== orderFile?.moreInfo?.craftedLinks?.large;

  return (
    <Dialog
      maxWidth="lg"
      PaperProps={{
        style: {
          width: '860px',
          boxShadow: 'var(--shadow-2xl)',
          borderRadius: '16px',
        },
      }}
      title={t('find-order-number.title') || ''}
      titleCss={{
        padding: '24px',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '28px',
        color: 'var(--gray-700)',
      }}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={() => {
              onCancel();
              onClose();
            }}
            color="secondary"
            fullWidth
            sx={{
              height: 46,
              mr: 4,
            }}
          >
            {t('find-order-number.btn-cancel')}
          </Button>
          <Button
            onClick={onClose}
            fullWidth
            sx={{
              height: 46,
            }}
          >
            {t('find-order-number.btn-apply')}
          </Button>
        </>
      }
      dialogContent={
        <>
          {control && (
            <StyledAlert severity="info">
              {t(`find-order-number.preview-alert.${orderFile?.fileType}`)}
            </StyledAlert>
          )}
          <MediaPreview
            file={{
              contentType: orderFile?.fileType,
              preview: previewUrl,
              fileName: orderFile?.fileName,
              fileSize: orderFile?.fileSize,
            }}
            control={control}
            height="420px"
            fullWidth
            maxPdfPage={5}
          />
        </>
      }
      contentCss={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    ></Dialog>
  );
}

export default PreviewDialog;
