import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  styled,
} from '@mui/material';
import MultiDrmMyStorageForm from './view/drm-my-storage-form';
import { FileList } from '@web-workspace/saforus/common/views';
import Button from '@web-workspace/shared/components/widgets/button';
import { useTranslation } from 'react-i18next';
import { useMyStorageData } from './data';
import { FileType, MediaConfigs } from '@web-workspace/saforus/common/model';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  CreateOrderStepsEnum,
  DrmCommonData,
  DrmStorage,
  MultiDrmCreateOrderStore,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { FormProvider } from 'react-hook-form';
import { isEmpty } from 'lodash-es';
import WarningIcon from '../assets/warning.svg';
import SuccessIcon from '../assets/check-loading.svg';
import { Site } from '@web-workspace/saforus/components/settings/sites/data';
import { isNotEmpty } from '@web-workspace/shared/helpers/strings';

const StyledAlert = styled(Alert)`
  background: #f9f8fb;
  border: 1.5px solid #648ef7;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.04);
  border-radius: 5px;
  padding: 13px 24px;

  & .MuiAlert-message {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    padding: 0;
    overflow: hidden;
  }

  & .MuiAlert-icon {
    padding: 0;
    margin-right: 1rem;
  }
`;

export function MultiDrmMyStorage() {
  const { t } = useTranslation();
  const { onSetStep, onSetStepData, getStepData, commonData } = useSnapshot(
    MultiDrmCreateOrderStore
  );
  const [sites, setSites] = useState<Site[]>([]);

  const {
    methods,
    handleSubmit,
    setValue,
    watch,
    loadFiles,
    createFolder,
    filesResponse,
    folderResponse,
    loading,
    errors,
    reset,
  } = useMyStorageData(MediaConfigs.VIDEO);

  useEffect(() => {
    const siteList = (commonData as DrmCommonData).sites;
    setSites(siteList);
    let dataRestore = getStepData(
      CreateOrderStepsEnum.CHOOSE_STORAGE
    ) as DrmStorage;
    if (!isNotEmpty(dataRestore?.siteId) && siteList?.length > 0) {
      dataRestore = {
        ...dataRestore,
        siteId: siteList[0].siteId,
        siteName: siteList[0].siteName,
      };
    }
    reset(dataRestore);
  }, []);

  const originalFiles = watch('originalFiles', []) ?? ([] as FileType[]);
  const selectedFiles = watch('files', []) ?? ([] as FileType[]);
  const [loadFilesAlert, setLoadFilesAlert] = React.useState({
    title: '',
    isSuccess: false,
  });

  const [createFolderAlert, setCreateFolderAlert] = React.useState({
    title: '',
    isSuccess: false,
  });

  const onSubmit = (value: DrmStorage) => {
    const stepperElement = document.getElementById('stepper');
    if (stepperElement) {
      stepperElement.scrollIntoView({ behavior: 'smooth' });
    }

    onSetStepData(CreateOrderStepsEnum.CHOOSE_STORAGE, value);
    onSetStep(CreateOrderStepsEnum.OUTPUT_STREAMING);
  };

  const handlePrev = () => {
    const stepperElement = document.getElementById('stepper');
    if (stepperElement) {
      stepperElement.scrollIntoView({ behavior: 'smooth' });
    }

    onSetStep(CreateOrderStepsEnum.PACKAGING_OPTION);
  };
  const handleLoadFiles = (value: string) => {
    const text = value.replace(/^\/+|\/+$/gm, '');
    setValue('inputPath', text);
    loadFiles(null, text);
  };

  const handleCreateFolder = (value: string) => {
    const text = value.replace(/^\/+|\/+$/gm, '');
    setValue('outputPath', `${text}/`);
    createFolder(null, text);
  };

  useEffect(() => {
    if (filesResponse.isSuccess === true) {
      const files = filesResponse.data as FileType[];
      setValue('originalFiles', files);
      setLoadFilesAlert({ title: '', isSuccess: true });
    } else if (filesResponse?.isSuccess === false) {
      setValue('originalFiles', []);
      if (filesResponse?.isSuccess === false) {
        setLoadFilesAlert({
          title: 'page-watermarking.create.message.permission',
          isSuccess: false,
        });
      }
    } else {
      const isCreatedFolder = watch('isCreatedFolder');
      if (!isCreatedFolder) {
        setValue('originalFiles', []);
      }
      setLoadFilesAlert({
        title: '',
        isSuccess: false,
      });
    }
  }, [filesResponse]);

  useEffect(() => {
    if (folderResponse.isSuccess === true) {
      setValue('isCreatedFolder', true);
      setCreateFolderAlert({
        title: `${t(
          'page-watermarking.create.message.create-folder-successful'
        )}`,
        isSuccess: true,
      });
    } else if (folderResponse.isSuccess === false) {
      setValue('isCreatedFolder', false);
      const message =
        folderResponse?.data === 'EXISTED'
          ? 'page-watermarking.create.message.folder-existed'
          : 'page-watermarking.create.message.permission';
      setCreateFolderAlert({
        title: message,
        isSuccess: false,
      });
    } else {
      if (errors?.isCreatedFolder?.message) {
        setCreateFolderAlert({
          title: errors?.isCreatedFolder?.message,
          isSuccess: false,
        });
      }
    }
  }, [folderResponse]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Box
          sx={{
            width: '100%',
            padding: '1.5rem',
            backgroundColor: 'var(--base-white)',
            borderRadius: '0.5rem',
            border: '1px solid #DAE0E6',
            boxShadow: 'var(--shadow-xsm)',
            gap: '1.5rem',
          }}
        >
          <MultiDrmMyStorageForm
            sites={sites}
            loadFiles={handleLoadFiles}
            createFolder={handleCreateFolder}
            filesResponse={filesResponse}
          />
          {!isEmpty(loadFilesAlert.title) && (
            <StyledAlert
              sx={{
                marginTop: '1rem',
                border: '1.5px solid #FEB8AE',
                backgroundColor: 'var(--red-50)',
              }}
              severity="error"
              icon={
                <img
                  src={WarningIcon}
                  alt="Warning"
                  title="Warning"
                  width={20}
                  height={22}
                  loading="lazy"
                />
              }
            >
              {t(loadFilesAlert.title)}
            </StyledAlert>
          )}
          {!isEmpty(createFolderAlert.title) &&
            createFolderAlert.isSuccess === false && (
              <StyledAlert
                sx={{
                  marginTop: '1rem',
                  border: '1.5px solid #FEB8AE',
                  backgroundColor: 'var(--red-50)',
                }}
                severity="error"
                icon={
                  <img
                    src={WarningIcon}
                    alt="Warning"
                    title="Warning"
                    width={20}
                    height={22}
                    loading="lazy"
                  />
                }
              >
                {t(createFolderAlert.title)}
              </StyledAlert>
            )}
          {!isEmpty(createFolderAlert.title) &&
            createFolderAlert.isSuccess === true && (
              <StyledAlert
                sx={{
                  marginTop: '1rem',
                  border: '1.5px solid #2D8A39',
                  backgroundColor: '#F0FAF0',
                  color: 'var(--green-500)',
                }}
                severity="success"
                icon={
                  <img
                    src={SuccessIcon}
                    alt="success"
                    title="success"
                    width={20}
                    height={22}
                    loading="lazy"
                  />
                }
              >
                {t(createFolderAlert.title)}
              </StyledAlert>
            )}
        </Box>
        <Box
          sx={{
            marginTop: '1.5rem',
            backgroundColor: 'var(--base-white)',
            border: '1px solid #DAE0E6',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}
        >
          <Box>
            <Typography color={'var(--gray-700)'} variant="h5" fontWeight={600}>
              {t('page-watermarking.create.file-list', {
                selectedFiles: selectedFiles.length,
                allFiles: originalFiles.length,
              })}
            </Typography>
            <Typography
              color={'var(--gray-50)'}
              variant={'body2'}
              sx={{
                marginTop: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              {t('page-watermarking.create.file-list-description')}
            </Typography>
          </Box>
          <FileList
            files={originalFiles}
            selectedFiles={selectedFiles}
            supportedFiles={MediaConfigs.VIDEO.supportedExts}
            setSelectedFiles={(selectedFiles) => {
              setValue('files', selectedFiles as FileType[]);
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            width: '100%',
          }}
        >
          <Button
            fullWidth
            color="secondary"
            sx={{ height: 46 }}
            onClick={handlePrev}
          >
            {t('button.prev')}
          </Button>
          <Button
            fullWidth
            sx={{ height: 46 }}
            color="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {t('button.next')}
          </Button>
        </Box>
      </FormProvider>
      <Backdrop
        open={loading}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default MultiDrmMyStorage;
