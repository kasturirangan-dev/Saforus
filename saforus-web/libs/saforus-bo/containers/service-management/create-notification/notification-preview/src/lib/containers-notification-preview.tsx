import { Box } from '@mui/material';
import CreateNotificationStore from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import NotificationPreview from '@web-workspace/saforus-bo/components/service-management/notification-preview';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import { useSnapshot } from 'valtio';

/* eslint-disable-next-line */
export interface ContainersNotificationPreviewProps {}

export function ContainersNotificationPreview(
  props: ContainersNotificationPreviewProps
) {
  const { notificationForm } = useSnapshot(CreateNotificationStore);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: 45,
        }}
      >
        <LoadingButton
          color="secondary"
          sx={{
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          Preview
        </LoadingButton>
      </Box>
      <NotificationPreview
        type={notificationForm.type}
        title={notificationForm.title}
        imgSrc={notificationForm.imgFile?.preview}
        description={notificationForm.description}
        isDoNotViewButtonShow={notificationForm.isDoNotViewButtonShow}
      />
    </Box>
  );
}

export default ContainersNotificationPreview;
