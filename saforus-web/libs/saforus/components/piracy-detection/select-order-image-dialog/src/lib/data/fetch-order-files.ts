import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';
import { getTeamId } from '@web-workspace/saforus/common/utils';
import {
  IOrderFile,
  getOrderFileList,
} from '@web-workspace/saforus/components/forensic-watermarking-v2/data';
import { IMediaData } from '@web-workspace/shared/components/widgets/vertical-image-slider';
import {
  getAttachment,
  getAttachmentByUrl,
} from '@web-workspace/shared/helpers/files/download-file';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
const QUERY_KEY = 'file-list-inside-piracy-create-dialog';

const useFetchOrderFiles = (orderId: string, mediaType: string) => {
  const { data, isLoading } = useQuery<IOrderFile[]>([QUERY_KEY, orderId], () =>
    getOrderFileList(orderId)
  );
  const [mediaData, setMediaData] = useState<IMediaData[] | null | undefined>(
    undefined
  );
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const updateMediaData = (updateData: Partial<IMediaData>[]) => {
    const newMediaData = mediaData?.map((mediaItem) => {
      const updateItem = updateData.find(
        (updateItem) => updateItem.orderInfoSq === mediaItem.orderInfoSq
      );
      return {
        ...mediaItem,
        ...updateItem,
      };
    });
    setMediaData(newMediaData);
  };

  // Set default data before load
  useEffect(() => {
    if (!data) {
      return;
    }
    setMediaData(
      data.map((item) => ({
        title: item.psnInfoFileNm || '',
        src: '',
        thumbnail: '',
        teamId: getTeamId() || null, // Handle undefined case
        psnInfoId: item.psnInfoId,
        psnInfoFileNm: item.psnInfoFileNm,
        orderInfoSq: item.personOrderInfoSq,
      }))
    );
    setIsLoadingFiles(true);
  }, [data]);

  // Load files list
  useEffect(() => {
    if (!isLoadingFiles) {
      return;
    }
    Promise.allSettled(
      data?.map((item) => item.moreInfo?.craftedLinks?.medium) || []
    )
      .then((res) => {
        // Always show the file/thumbnail whether API is successful or failed
        const resData = res as PromiseFulfilledResult<string>[];
        const thumbnailData = resData.map((item, index) => ({
          thumbnail: item.status === 'fulfilled' ? item.value : '',
          orderInfoSq: data?.[index].personOrderInfoSq,
        }));
        updateMediaData(thumbnailData);
      })
      .finally(() => {
        setIsLoadingFiles(false);
        setIsLoadingPreview(true);
      });
  }, [isLoadingFiles]);

  // Load files preview
  useEffect(() => {
    if (!isLoadingPreview) {
      return;
    }
    setIsLoadingPreview(true);
    Promise.allSettled(
      data?.map((item) => {
        if (
          mediaType === MEDIA_TYPE.IMG &&
          item.moreInfo?.craftedLinks?.large
        ) {
          return item.moreInfo?.craftedLinks?.large;
        } else {
          return getAttachment({
            teamId: getTeamId(),
            orderInfoId: item.psnInfoId,
            orderInfoFileName: item.psnInfoFileNm,
            getImageinBase64: true,
            timeout: 60000,
          });
        }
      }) || []
    )
      .then((res) => {
        // Always show the file/thumbnail whether API is successful or failed
        const resData = res as PromiseFulfilledResult<string>[];
        const previewData = resData.map((item, index) => ({
          src: item.status === 'fulfilled' ? item.value : '',
          orderInfoSq: data?.[index].personOrderInfoSq,
        }));
        updateMediaData(previewData);
      })
      .finally(() => {
        setIsLoadingPreview(false);
      });
  }, [isLoadingPreview]);

  return {
    mediaData,
    isLoading: isLoadingFiles,
    isLoadingPreview: isLoadingPreview,
  };
};

export default useFetchOrderFiles;
