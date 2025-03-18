import { number, object, string } from 'yup';
import {
  SettingSiteStore,
  SiteStorage,
  StorageFieldName,
  StorageValidation,
  ValidationSchema,
} from '@web-workspace/saforus/components/settings/sites/data';
import { useMutation } from 'react-query';
import { i18n } from '@web-workspace/shared/i18n';

const storageValidationSchema: ValidationSchema<StorageValidation> = {
  storageName: string().required(i18n.t('error-message.required') as string),
  bucketName: string().required(i18n.t('error-message.required') as string),
  storagePath: string(),
  accessKey: string().required(i18n.t('error-message.required') as string),
  secretKey: string().required(i18n.t('error-message.required') as string),
  storageId: string(),
  storageType: string(),
  serviceRegionIdx: number().required(i18n.t('error-message.required')),
  ioType: number().min(1, i18n.t('error-message.required')),
  description: string(),
};

export const validationSchema = object().shape(storageValidationSchema);

export const useUpdateStorage = () => {
  return useMutation(
    async ({
      storageId,
      updatedStorage,
    }: {
      storageId: number | null;
      updatedStorage: SiteStorage;
    }) => {
      return await SettingSiteStore.updateStorage(storageId, updatedStorage);
    }
  );
};

export const useCreateStorage = () => {
  return useMutation(async (data: { newStorage: SiteStorage }) => {
    const { newStorage } = data;
    return await SettingSiteStore.addNewStorage(newStorage);
  });
};

export const formFields: {
  name: StorageFieldName;
  label: string;
  isRequired: boolean;
  canEdit: boolean;
}[] = [
  {
    name: 'storageName',
    label: 'Storage Name',
    isRequired: true,
    canEdit: true,
  },
  {
    name: 'storageId',
    label: 'Storage ID',
    isRequired: false,
    canEdit: false,
  },
  {
    name: 'bucketName',
    label: 'Bucket Name',
    isRequired: true,
    canEdit: true,
  },
  {
    name: 'storageType',
    label: 'Storage Type',
    isRequired: false,
    canEdit: false,
  },
  {
    name: 'storagePath',
    label: 'File Path',
    isRequired: false,
    canEdit: true,
  },
  {
    name: 'serviceRegionIdx',
    label: 'Service Region',
    isRequired: true,
    canEdit: true,
  },
  {
    name: 'accessKey',
    label: 'Access Key',
    isRequired: true,
    canEdit: true,
  },
  {
    name: 'ioType',
    label: 'I/O Type',
    isRequired: true,
    canEdit: true,
  },
  {
    name: 'secretKey',
    label: 'Secret Key',
    isRequired: true,
    canEdit: true,
  },
  {
    name: 'description',
    label: 'Description',
    isRequired: false,
    canEdit: true,
  },
];
