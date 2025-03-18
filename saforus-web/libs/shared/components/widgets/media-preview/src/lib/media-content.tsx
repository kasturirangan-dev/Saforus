import { Box } from '@mui/material';
import ImagePreview, {
  isTiffFile,
} from '@web-workspace/shared/components/widgets/image-preview';
import { PreviewFirstPage } from '@web-workspace/shared/components/widgets/preview-pdf';
import { MediaContentProps } from './interface';
import { useState } from 'react';

const MEDIA_TYPE = {
  IMG: 'IMG',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  DOCUMENT: 'DOCUMENT',
};

const MediaContent = ({
  file,
  control = true,
  height = '300px',
  width = 'auto',
  maxPdfPage = 1,
}: MediaContentProps) => {
  const {
    contentType: mediaType = MEDIA_TYPE.IMG,
    preview: src = '',
    fileName = '',
  } = file;

  const isTiff = isTiffFile(fileName);
  let previewType = mediaType;
  if (!src || !control) {
    previewType = MEDIA_TYPE.IMG;
  }
  const viewSize = height.match(/\d+px/) ? parseInt(height) : 300;

  const [objectFit, setObjectFit] = useState<'contain' | 'cover'>('cover');

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (naturalWidth > naturalHeight && mediaType !== MEDIA_TYPE.DOCUMENT) {
      // Display cover for document thumbnails
      setObjectFit('cover');
    } else {
      setObjectFit('contain');
    }
  };

  const handleVideoLoad = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (videoWidth > videoHeight) {
      setObjectFit('cover');
    } else {
      setObjectFit('contain');
    }
  };

  switch (previewType) {
    case MEDIA_TYPE.IMG:
      return (
        <ImagePreview
          src={mediaType === MEDIA_TYPE.AUDIO ? '' : src} // Display default thumbnail for audio files
          containerStyle={{
            height: height,
            width: width,
            backgroundColor: 'inherit',
          }}
          style={{
            objectFit: objectFit,
          }}
          mediaType={mediaType}
          isTiff={isTiff}
          onLoad={handleImageLoad}
          thumbnailStyle="icon"
          thumbStyle={{
            minWidth: viewSize,
          }}
        />
      );

    case MEDIA_TYPE.VIDEO:
      return (
        <video
          controls
          style={{
            display: 'block',
            height: height,
            width: width,
            objectFit: objectFit,
          }}
          disablePictureInPicture
          onLoadedMetadata={handleVideoLoad}
          controlsList="nodownload noplaybackrate"
        >
          <source src={src} type="video/mp4" />
        </video>
      );

    case MEDIA_TYPE.AUDIO:
      return (
        <>
          <ImagePreview
            src={''}
            containerStyle={{
              height: height,
              width: width,
            }}
            mediaType={mediaType}
            thumbnailStyle="icon"
            thumbStyle={{
              minWidth: viewSize,
            }}
          />
          <Box
            sx={{
              '& audio::-webkit-media-controls-panel': {
                backgroundColor: 'var(--purple-25)',
              },
            }}
          >
            <audio
              controls
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
              controlsList="nodownload noplaybackrate"
            >
              <source src={src} type="audio/x-wav" />
            </audio>
          </Box>
        </>
      );
    case MEDIA_TYPE.DOCUMENT:
      return (
        <PreviewFirstPage
          link={src}
          viewHeight={viewSize}
          viewWidth={'100%'}
          maxPage={maxPdfPage}
        />
      );
    default:
      return null;
  }
};

export default MediaContent;
