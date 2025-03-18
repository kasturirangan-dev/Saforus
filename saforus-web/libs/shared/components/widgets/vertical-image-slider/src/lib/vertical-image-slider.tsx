import styled from '@emotion/styled';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MEDIA_TYPE } from '@web-workspace/saforus/common/model';
import ImageOrTiff from '@web-workspace/shared/components/widgets/image-or-tiff';
import ImagePreview from '@web-workspace/shared/components/widgets/image-preview';
import { useEffect, useRef, useState } from 'react';
import { IMediaData } from './interface';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import PreviewPdf from '@web-workspace/shared/components/widgets/preview-pdf';
import FailedRetrieve from './failed-retrieve';
import { MediaIcon } from '@web-workspace/shared/components/widgets/icon';
import { set } from 'date-fns';

export function VerticalImageSlider({
  mediaType,
  onSelect,
  mediaData = [],
  loading,
  loadingPreview,
}: {
  mediaType: string;
  onSelect: (item: IMediaData | null) => void;
  mediaData: IMediaData[] | null | undefined;
  loading: boolean;
  loadingPreview: boolean;
}) {
  const [selectedMedia, setSelectedMedia] = useState<IMediaData | null>(null);

  const [selectedAudioDuration, setSelectedAudioDuration] = useState(
    readableDuration(0)
  );

  // const [audioDurationList, setAudioDurationList] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const { t } = useTranslation();

  const audioRef = useRef();

  function readableDuration(seconds: number) {
    let sec, min;
    sec = Math.floor(seconds);
    min = Math.floor(sec / 60);
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ':' + sec;
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setSelectedAudioDuration(readableDuration(audioRef.current.duration));
    }
  };

  // function getDuration(src: string): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     const audio = new Audio();
  //     audio.src = `${src.replace(
  //       'data:image/jpeg;base64,',
  //       'data:audio/mpeg;base64,'
  //     )}`;

  //     audio.addEventListener('loadedmetadata', () => {
  //       resolve(audio.duration);
  //     });

  //     audio.addEventListener('error', (error) => {
  //       reject(error);
  //     });

  //     audio.load();
  //   });
  // }

  // async function handleSetAudioDurationList() {
  //   const durationPromiseList = mediaData?.map(async (media) => {
  //     try {
  //       const duration = await getDuration(media?.src);
  //       return readableDuration(duration);
  //     } catch (error) {
  //       console.error('Error processing audio:', error);
  //     }
  //   });
  //   const durationList = await Promise.all(durationPromiseList);
  //   setAudioDurationList(durationList);
  // }

  useEffect(() => {
    if (!loading && mediaType === MEDIA_TYPE.VIDEO && mediaData) {
      setSelectedMedia(mediaData[0]);
      onSelect(mediaData[0]);
    }
    // if (!loading && mediaType === MEDIA_TYPE.AUDIO && mediaData) {
    //   handleSetAudioDurationList();
    // }
  }, [loading]);

  useEffect(() => {
    if (mediaType === MEDIA_TYPE.AUDIO && mediaData && audioRef.current) {
      audioRef.current.load();
    }
  }, [selectedMedia]);

  // Update preview when loading is done
  useEffect(() => {
    if (selectedMedia && !selectedMedia.src) {
      const updateMedia = mediaData?.find(
        (item) => item.orderInfoSq === selectedMedia.orderInfoSq
      );
      updateMedia && setSelectedMedia(updateMedia);
    }
  }, [loadingPreview]);

  const showListType = [MEDIA_TYPE.IMG, MEDIA_TYPE.AUDIO, MEDIA_TYPE.DOCUMENT];
  const mediaIconName = mediaType.toLowerCase();

  return (
    <Box
      sx={{
        display: 'flex',
      }}
      gap={'24px'}
    >
      {showListType.includes(mediaType) && (
        <Box
          sx={{
            height: '450px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            width: '200px',
            paddingRight: '1rem',
            gap: '16px',
            border: '1px solid #EAEBF0',
            padding: '8px',
            backgroundColor: 'var(--neutral-200)',
          }}
        >
          {mediaData?.map((item, idx) => {
            return (
              <Box
                sx={{
                  width: '100%',
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
                key={idx}
                onClick={() => {
                  if (!loading && !isDownloading) {
                    setSelectedMedia(item);
                    onSelect && onSelect(item);
                  }
                }}
              >
                <LoadingOverLayer loading={loading} />
                <ImageCheckbox
                  selected={
                    JSON.stringify(item) === JSON.stringify(selectedMedia)
                  }
                />

                <ImagePreview
                  src={item.thumbnail}
                  containerStyle={{ height: '148px', width: '148px' }}
                  style={{ objectFit: 'cover' }}
                  mediaType={mediaType}
                  isTiff={item?.title?.split('.')?.[1]?.includes('tif')}
                />

                {/* {item.src && mediaType === MEDIA_TYPE.IMG && (
                  <Stack sx={{ height: '90px' }}>
                    {item?.title?.split('.')?.[1]?.includes('tif') ? (
                      <ImageOrTiff src={item.src} height={90} />
                    ) : (
                      <img
                        srcSet={item?.src}
                        src={item?.src}
                        alt={'item'}
                        loading="lazy"
                        height={'100%'}
                        width={'100%'}
                        style={{
                          margin: 'auto',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </Stack>
                )}
                {item.src && mediaType === MEDIA_TYPE.AUDIO && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '90px',
                      border: '1px solid var(--neutral-750)',
                      borderRadius: '3px',
                      padding: '10px',
                    }}
                  >
                    <MediaIcon name={mediaIconName} />

                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '18px',
                        color: 'var(--gray-25)',
                      }}
                    >
                      {audioDurationList[idx]}
                    </Typography>
                  </Box>
                )}
                {item.src && mediaType === MEDIA_TYPE.DOCUMENT && (
                  <DefaultThumnail icon={mediaIconName} />
                )}

                {!item.src && <DefaultThumnail icon={mediaIconName} />} */}
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: 'var(--gray-25)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'var(--neutral-500)',
          height: '450px',
          width: '100%',
        }}
      >
        {selectedMedia?.src && mediaType === MEDIA_TYPE.IMG && (
          <ImagePreview
            src={selectedMedia?.src}
            containerStyle={{
              height: '450px',
              backgroundColor: 'var(--gray-900)',
            }}
            mediaType={mediaType}
            isTiff={selectedMedia?.title?.split('.')?.[1]?.includes('tif')}
          />
        )}

        {selectedMedia?.src && mediaType === MEDIA_TYPE.AUDIO && (
          <Stack flexDirection="column" sx={{ height: '100%' }}>
            <Stack sx={{ flex: '1', height: '100%' }}>
              <Stack
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  gap: '10px',
                  width: '160px',
                  height: '90px',
                  border: '1px solid var(--neutral-750)',
                  borderRadius: '3px',
                  padding: '10px',
                  backgroundColor: 'var(--base-white)',
                  margin: 'auto',
                }}
              >
                <MediaIcon name={mediaIconName} />
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '18px',
                    color: 'var(--gray-25)',
                  }}
                >
                  {selectedAudioDuration}
                </Typography>
              </Stack>
            </Stack>
            <Box
              sx={{
                backgroundColor: '#f1f3f4',
                border: '1px solid var(--neutral-750)',
              }}
            >
              <audio
                ref={audioRef}
                controls
                style={{ width: '100%' }}
                onLoadedMetadata={onLoadedMetadata}
              >
                <source src={selectedMedia?.src} type="audio/x-wav" />
              </audio>
            </Box>
          </Stack>
        )}

        {selectedMedia?.src && mediaType === MEDIA_TYPE.VIDEO && (
          <video width="100%" height="450" controls>
            <source src={selectedMedia?.src} type="video/mp4" />
          </video>
        )}

        {selectedMedia?.src && mediaType === MEDIA_TYPE.DOCUMENT && (
          <PreviewPdf title={selectedMedia?.title} link={selectedMedia?.src} />
        )}

        {/* Is loading or load fail */}
        <LoadingOverLayer loading={Boolean(selectedMedia) && loadingPreview} />
        {selectedMedia && !selectedMedia.src && !loadingPreview && (
          <FailedRetrieve
            selectedMedia={selectedMedia}
            setIsDownloading={setIsDownloading}
          />
        )}

        {/* SELECTED IMG/AUDIO WHEN EMPTY */}
        {!selectedMedia && showListType.includes(mediaType) && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <MediaIcon name={mediaIconName} />
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '22px',
                color: 'var(--gray-50)',
                whiteSpace: 'pre-wrap',
                textAlign: 'center',
              }}
            >
              {mediaType === MEDIA_TYPE.IMG
                ? t('find-order-number.no-image')
                : mediaType === MEDIA_TYPE.AUDIO
                ? t('find-order-number.no-audio')
                : t('find-order-number.no-document')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const RoundedBox = styled(Box)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

function ImageCheckbox({ selected }: { selected?: boolean }) {
  return selected ? (
    <RoundedBox
      sx={{
        border: '5px solid var(--blue-600)',
      }}
    />
  ) : (
    <RoundedBox
      sx={{
        backgroundColor: 'var(--neutral-700)',
      }}
    />
  );
}

// function DefaultThumnail({ icon }: { icon: string }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '90px',
//         border: '1px solid var(--neutral-750)',
//         borderRadius: '3px',
//         padding: '10px',
//       }}
//     >
//       <MediaIcon name={icon} />
//     </Box>
//   );
// }

export default VerticalImageSlider;
