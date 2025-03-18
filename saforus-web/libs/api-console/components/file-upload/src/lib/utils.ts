import {
  IConfigMedia,
  MediaConfigs,
  OrderType,
  PLAN_TYPE,
} from '@web-workspace/api-console/common/model';

export function getConfig(mediaTypes: string[]): IConfigMedia {
  return mediaTypes.reduce(
    (acc, key) => {
      const config = MediaConfigs[key as keyof typeof MediaConfigs];

      // Combine supportedExts
      acc.supportedExts = [
        ...(acc.supportedExts || []),
        ...config.supportedExts,
      ];

      // Combine supportedFormats
      acc.supportedFormats = [
        ...(acc.supportedFormats || []),
        ...config.supportedFormats,
      ];

      // Combine accept objects
      acc.accept = { ...acc.accept, ...config.accept };

      return acc;
    },
    {
      multiple: false,
      maxFile: 50,
    } as IConfigMedia
  );
}

export const getSupportedSize = (
  tier?: string | null | undefined,
  serviceType?: string | null | undefined
) => {
  if (serviceType === OrderType.DETECTION) {
    switch (tier) {
      case PLAN_TYPE.FREE:
      case PLAN_TYPE.BASIC:
      case PLAN_TYPE.PROFESSIONAL:
        return 500 * 1024 * 1024; // 50MB
      default:
        return 10 * 1024 * 1024 * 1024; // 10GB
    }
  }

  switch (tier) {
    case PLAN_TYPE.FREE:
      return 5 * 1024 * 1024; // 5MB
    case PLAN_TYPE.BASIC:
      return 20 * 1024 * 1024; // 20MB
    case PLAN_TYPE.PROFESSIONAL:
      return 50 * 1024 * 1024; // 50MB
    default:
      return 10 * 1024 * 1024 * 1024; // 10GB
  }
};

export const contentTypeMap = {
  image: 'IMG',
  audio: 'AUDIO',
  video: 'VIDEO',
  application: 'DOCUMENT',
};
