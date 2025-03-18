import { Box } from '@mui/material';
import {
  IConfigMedia,
  MediaConfigs,
} from '@web-workspace/saforus/common/model';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';
import { randomId } from '@web-workspace/shared/helpers/strings';
import FileUpload from '@web-workspace/shared/components/widgets/file-upload';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import CreateNotificationStore, {
  FormMode,
  NotificationForm,
} from '@web-workspace/saforus-bo/components/service-management/create-notification/data';
import { UseFormSetValue } from 'react-hook-form';
import ImageUploaded from './ImageUploaded';

type ImageUploadViewProps = {
  setValue: UseFormSetValue<NotificationForm>;
};

export const ImageUploadView = ({ setValue }: ImageUploadViewProps) => {
  const { t } = useTranslation();
  const { notificationForm, formState } = useSnapshot(CreateNotificationStore);
  const config = MediaConfigs.IMG as IConfigMedia;
  const [image, setImage] = useState(notificationForm.filePreview);
  const maxImageSize = 5 * 1024 * 1024;
  const fileExtension = ['jpg', 'png'];
  const { openDialog } = useSnapshot(DialogStore);

  const onFilesAdded = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    // remove white space
    const modifiedFileName = file.name.replace(/\s/g, '');
    const modifiedFile = new File([file], modifiedFileName, {
      type: file.type,
    });
    const convertedFiles = {
      id: randomId(),
      file: modifiedFile,
      preview: URL.createObjectURL(file),
      size: file.size,
      ext: file.name.split('.').pop() || '',
    };

    const isDimensionAccept = await isImageDimensionSatisfied(
      convertedFiles.preview
    );
    // waring about dimension of image
    if (!isDimensionAccept) {
      openDialog({
        name: DialogType.IncorrectImageUpload,
        props: {
          title: t(
            'serviceManagement.create-notification.dialog.dimension-title'
          ),
          description: t(
            'serviceManagement.create-notification.dialog.dimension-description'
          ),
        },
      });
    }

    if (
      convertedFiles.size < maxImageSize &&
      fileExtension.includes(convertedFiles.ext)
    ) {
      // If the image is valid, set the image
      setImage(convertedFiles.preview);
      setValue('imgFile', convertedFiles);
      setValue('filePreview', convertedFiles.preview);
    } else {
      // If the image is not valid, show the dialog
      if (convertedFiles.size > maxImageSize) {
        openDialog({
          name: DialogType.IncorrectImageUpload,
          props: {
            title: t('serviceManagement.create-notification.dialog.size-title'),
            description: t(
              'serviceManagement.create-notification.dialog.size-description'
            ),
          },
        });
      }
      if (!fileExtension.includes(convertedFiles.ext)) {
        openDialog({
          name: DialogType.IncorrectImageUpload,
          props: {
            title: t('serviceManagement.create-notification.dialog.ext-title'),
            description: t(
              'serviceManagement.create-notification.dialog.ext-description'
            ),
          },
        });
      }
    }
  };
  const isImageDimensionSatisfied = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      const width = 480;
      const height = 250;
      // Use the onload event handler to get the image dimension
      img.onload = function () {
        // Resolve the promise with the result as an argument
        resolve(img.width <= width && img.height <= height);
      };
      // Reject the promise if there is an error
      img.onerror = reject;
    });
  };

  useEffect(() => {
    if (image === null || image === '') setValue('imgFile', null);
  }, [image]);

  useEffect(() => {
    if(image !== '' || formState === FormMode.Edit){
      setImage(notificationForm.filePreview);
    }
  }, [notificationForm]);

  return (
    <Box
      sx={{
        background: 'var(--neutral-300)',
        width: '100%',
        padding: '1.5rem',
        borderRadius: '0.5rem',
      }}
    >
      {image ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ImageUploaded
            imgSrc={image}
            handleRemoveFile={() => setImage('')}
            width={450}
            height={250}
          />
          {/* <img src={image} alt="avatar" width={450} height={250}></img> */}
        </Box>
      ) : (
        <FileUpload
          smallView={false}
          onFilesAdded={onFilesAdded}
          accept={config.accept}
          recommendFileText={`${t(
            'serviceManagement.create-notification.recommended-upload'
          )}`}
          multiple={false}
        />
      )}
    </Box>
  );
};
