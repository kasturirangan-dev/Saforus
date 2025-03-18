import { Trans, useTranslation } from 'react-i18next';
import { PurpleButton as Button } from '@web-workspace/shared/components/widgets/button';
import { InlineSvg } from '@web-workspace/shared/components/widgets/icon';
import { Link, Typography } from '@mui/material';
import { NoRowContainer } from './styled-elements';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import UndetectedIcon from '../assets/undetected.svg';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import {
  FindWtrOrderStore,
  WatermarkInfo,
} from '@web-workspace/api-console/components/piracy-detection/find-order-number-data';
import { useEffect } from 'react';

const MAX_RETRY = 10;

function UnDetectedView({
  retryCount = 0,
  handleRetry,
}: {
  retryCount?: number;
  handleRetry: (orderFileKey: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  const { openDialog } = useSnapshot(DialogStore);
  const handleFindOrderNumber = () => {
    openDialog({
      name: DialogType.CsApiFindOrderNumberDialog,
      props: {
        onApply: applySelectedOrder,
      },
    });
  };

  const applySelectedOrder = (selectedWatermarkFile: WatermarkInfo) => {
    handleRetry(selectedWatermarkFile?.orderFile?.origOrderFileKey);
  };

  const { resetFindWtrOrderStore } = useSnapshot(FindWtrOrderStore);
  useEffect(() => {
    return () => {
      resetFindWtrOrderStore();
    };
  }, []);

  return (
    <NoRowContainer>
      <img src={UndetectedIcon} alt="search-icon" />
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color={'var(--gray-700)'}
      >
        {t('apiDetection.order-detail.undetected')}
      </Typography>

      {retryCount >= MAX_RETRY ? (
        <Typography variant="body2" color="var(--gray-200)">
          <Trans
            i18nKey="apiDetection.order-detail.undetected-des"
            components={[
              <Link target="_blank" href={linkSupport} underline="none" />,
            ]}
          ></Trans>
        </Typography>
      ) : (
        <>
          <Typography variant="body2" color="var(--gray-200)">
            {t('apiDetection.order-detail.retry-des')}
          </Typography>

          <Button
            onClick={handleFindOrderNumber}
            color="secondary"
            sx={{
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: '18px',
            }}
          >
            <InlineSvg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M7.25 10.6659C7.25 11.0801 7.58579 11.4159 8 11.4159C8.41421 11.4159 8.75 11.0801 8.75 10.6659H7.25ZM8.75 3.33258C8.75 2.91837 8.41421 2.58258 8 2.58258C7.58579 2.58258 7.25 2.91837 7.25 3.33258L8.75 3.33258ZM10.1363 5.19625C10.4292 5.48914 10.9041 5.48914 11.197 5.19625C11.4899 4.90335 11.4899 4.42848 11.197 4.13559L10.1363 5.19625ZM8.4714 2.47065L7.94107 3.00098L8.4714 2.47065ZM7.5286 2.47065L8.05893 3.00098L8.05893 3.00098L7.5286 2.47065ZM4.803 4.13558C4.51011 4.42848 4.51011 4.90335 4.803 5.19624C5.0959 5.48914 5.57077 5.48914 5.86366 5.19624L4.803 4.13558ZM2.75 10.6659C2.75 10.2517 2.41421 9.91592 2 9.91592C1.58579 9.91592 1.25 10.2517 1.25 10.6659H2.75ZM14.75 10.6659C14.75 10.2517 14.4142 9.91592 14 9.91592C13.5858 9.91592 13.25 10.2517 13.25 10.6659H14.75ZM12.908 13.7813L12.5675 13.113H12.5675L12.908 13.7813ZM13.782 12.9072L14.4503 13.2477V13.2477L13.782 12.9072ZM2.21799 12.9072L1.54973 13.2477L2.21799 12.9072ZM3.09202 13.7813L2.75153 14.4495L2.75153 14.4495L3.09202 13.7813ZM8.75 10.6659L8.75 3.33258L7.25 3.33258L7.25 10.6659H8.75ZM11.197 4.13559L9.00173 1.94032L7.94107 3.00098L10.1363 5.19625L11.197 4.13559ZM6.99827 1.94032L4.803 4.13558L5.86366 5.19624L8.05893 3.00098L6.99827 1.94032ZM9.00173 1.94032C8.44849 1.38708 7.55151 1.38708 6.99827 1.94032L8.05893 3.00098C8.02638 3.03353 7.97362 3.03353 7.94107 3.00098L9.00173 1.94032ZM1.25 10.6659V10.7992H2.75V10.6659H1.25ZM5.2 14.7492H10.8V13.2492H5.2V14.7492ZM14.75 10.7992V10.6659H13.25V10.7992H14.75ZM10.8 14.7492C11.3477 14.7492 11.8035 14.7498 12.1747 14.7195C12.5546 14.6885 12.9112 14.6214 13.2485 14.4495L12.5675 13.113C12.4769 13.1592 12.3396 13.201 12.0525 13.2245C11.7566 13.2487 11.3724 13.2492 10.8 13.2492V14.7492ZM13.25 10.7992C13.25 11.3717 13.2494 11.7559 13.2252 12.0518C13.2018 12.3389 13.1599 12.4762 13.1138 12.5667L14.4503 13.2477C14.6221 12.9105 14.6892 12.5538 14.7203 12.1739C14.7506 11.8028 14.75 11.3469 14.75 10.7992H13.25ZM13.2485 14.4495C13.7659 14.1859 14.1866 13.7652 14.4503 13.2477L13.1138 12.5667C12.9939 12.8019 12.8027 12.9932 12.5675 13.113L13.2485 14.4495ZM1.25 10.7992C1.25 11.3469 1.24942 11.8028 1.27974 12.1739C1.31078 12.5538 1.37789 12.9105 1.54973 13.2477L2.88624 12.5667C2.8401 12.4762 2.79822 12.3389 2.77476 12.0518C2.75058 11.7559 2.75 11.3717 2.75 10.7992H1.25ZM5.2 13.2492C4.62757 13.2492 4.24336 13.2487 3.94748 13.2245C3.66035 13.201 3.52307 13.1592 3.43251 13.113L2.75153 14.4495C3.08879 14.6214 3.44545 14.6885 3.82533 14.7195C4.19646 14.7498 4.65232 14.7492 5.2 14.7492V13.2492ZM1.54973 13.2477C1.81338 13.7652 2.23408 14.1859 2.75153 14.4495L3.43251 13.113C3.19731 12.9932 3.00608 12.8019 2.88624 12.5667L1.54973 13.2477Z"
                fill="#272D37"
              />
            </InlineSvg>
            {`${t(
              'apiDetection.order-detail.retry-detection'
            )} ${retryCount}/${MAX_RETRY})`}
          </Button>
        </>
      )}
    </NoRowContainer>
  );
}

export default UnDetectedView;
