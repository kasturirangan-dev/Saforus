import { yupResolver } from '@hookform/resolvers/yup';
import {
  FieldWithSupport,
  FileType,
  IConfigMedia,
  IResponse,
} from '@web-workspace/saforus/common/model';
import { getMediaTypeByString } from '@web-workspace/saforus/common/utils';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';
import { randomId } from '@web-workspace/shared/helpers/strings';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import axios from 'axios';
import React from 'react';
import _ from 'lodash-es';
import { useForm } from 'react-hook-form';
import { DrmStorageSchema } from '@web-workspace/saforus/components/multi-drm/create-order/data';

export function useMyStorageData(config: IConfigMedia) {
  const [loading, setLoading] = React.useState(false);
  const [loadFilesResponse, setLoadFilesResponse] = React.useState({});
  const [createFolderResponse, setCreateFolderResponse] = React.useState({});

  const methods = useForm({
    defaultValues: {
      storageType: 'AWS_S3',
      fileKey: '',
      siteId: '',
      siteName: '',
      inputStorageId: '',
      inputBucketName: '',
      inputCloudRegion: '',
      inputAccessKey: '',
      inputSecretKey: '',
      outputBucketName: '',
      outputStorageId: '',
      outputCloudRegion: '',
      inputPath: '',
      outputPath: '',
      outputAccessKey: '',
      outputSecretKey: '',
      originalFiles: [] as FileType[],
      files: [] as FileType[],
      isCreatedFolder: false,
    },
    resolver: yupResolver(DrmStorageSchema),
  });

  const createFolder = async (outputStorage?: any, outputPath?: string) => {
    setLoading(true);
    try {
      const mainURL = getEnvVar('VITE_API_URL');
      // FIXME: dummy data for store id
      const reqCreateFolder = {
        token: AuthStore.token,
        storageIdx: '99',
        folderName: outputPath ?? '',
      };

      const res = await axios.post(
        `${mainURL}/s3/createFolder`,
        reqCreateFolder
      );
      if (res.data?.resultCd === '0') {
        setCreateFolderResponse({ isSuccess: true, data: 'SUCCESSFUL' });
      } else if (res.data?.resultCd === '1') {
        setCreateFolderResponse({ isSuccess: false, data: 'EXISTED' });
      } else {
        setCreateFolderResponse({ isSuccess: false, data: 'FAILED' });
      }
    } catch (e) {
      setCreateFolderResponse({ isSuccess: false, data: 'FAILED' });
    } finally {
      setLoading(false);
    }
  };

  const loadFiles = async (inputStorage?: any, inputPath?: string) => {
    setLoading(true);
    // const data = {
    //   token: AuthStore.userInfo?.token,
    //   storageIdx: inputStorage.id,
    //   curDir: inputPath,
    // };
    // FIXME: dummy data for store id
    const path = inputPath ?? '';
    const data = {
      token: AuthStore.token,
      storageIdx: '99',
      curDir: path,
    };

    try {
      const mainURL = getEnvVar('VITE_API_URL');
      const res = await axios.post(`${mainURL}/s3/searchDir`, data);

      if (res.data?.resultCd === '0') {
        const cloneData = _.cloneDeep(res.data);
        if (cloneData?.dirInfo?.length > 0) {
          const convertFiles = cloneData.dirInfo.map((item: any) => {
            const ext = item?.fileEx?.split('.').pop() || '';
            const supported =
              config.supportedExts?.includes(ext.toUpperCase()) ?? false;
            const id = randomId();
            const sizeInt = parseInt(item?.fileSize);
            const size = isNaN(sizeInt) ? 0 : sizeInt;
            const mediaType = getMediaTypeByString(item?.mediaType || '--');

            return {
              id: id,
              psnInfoId: id,
              psnInfoFileNm: item?.fileName,
              contentType: {
                field: mediaType,
                supported: supported,
              } as FieldWithSupport,
              format: ext,
              size: { field: size, supported: supported } as FieldWithSupport,
              supported: supported,
              file: null,
              preview: null,
            };
          });

          setLoadFilesResponse({ isSuccess: true, data: convertFiles });
        } else {
          setLoadFilesResponse({ isSuccess: true, data: [] });
        }
      } else {
        setLoadFilesResponse({ isSuccess: false, data: res.data });
      }
    } catch (e) {
      setLoadFilesResponse({ isSuccess: false, data: e });
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,
    handleSubmit: methods.handleSubmit,
    errors: methods.formState.errors,
    register: methods.register,
    setValue: methods.setValue,
    watch: methods.watch,
    control: methods.control,
    reset: methods.reset,
    loading,
    loadFiles,
    createFolder,
    filesResponse: loadFilesResponse as IResponse,
    folderResponse: createFolderResponse as IResponse,
  };
}
