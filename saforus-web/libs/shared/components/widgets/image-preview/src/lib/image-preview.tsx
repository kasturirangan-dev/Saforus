import { Box } from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import {
  AudioPlaceholder,
  DocumentPlaceholder,
  ImagePlaceholder,
  VideoPlaceholder,
  AudioIcon,
  DocumentIcon,
  ImageIcon,
  VideoIcon,
} from './assets';
import { loadTiff } from '@web-workspace/shared/components/widgets/image-or-tiff';

function mediaIcon({ mediaType }: { mediaType: string }) {
  switch (mediaType) {
    case 'IMG':
      return ImageIcon;
    case 'AUDIO':
      return AudioIcon;
    case 'DOCUMENT':
      return DocumentIcon;
    case 'VIDEO':
      return VideoIcon;
    default:
      return ImageIcon;
  }
}

function defaultThumbnail({ mediaType }: { mediaType: string }) {
  switch (mediaType) {
    case 'IMG':
      return ImagePlaceholder;
    case 'AUDIO':
      return AudioPlaceholder;
    case 'DOCUMENT':
      return DocumentPlaceholder;
    case 'VIDEO':
      return VideoPlaceholder;
    default:
      return ImagePlaceholder;
  }
}

export interface ImagePreviewProps {
  src?: string;
  alt?: string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  width?: string | number;
  height?: string | number;
  mediaType?: string;
  isTiff?: boolean;
  disableRightClick?: boolean;
  thumbnailStyle?: 'image' | 'icon';
  iconStyle?: CSSProperties;
  thumbStyle?: CSSProperties;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ImagePreview({
  src,
  alt,
  style,
  containerStyle,
  width,
  height,
  mediaType = 'IMG',
  isTiff = false,
  disableRightClick = false,
  thumbnailStyle = 'image',
  iconStyle,
  thumbStyle,
  onLoad,
}: ImagePreviewProps) {
  const defaultImage = defaultThumbnail({ mediaType });
  const defaultIcon = mediaIcon({ mediaType });
  const [dataURL, setDataURL] = useState<string | undefined>('');

  useEffect(() => {
    if (isTiff && src) {
      loadTiff(src, setDataURL);
    } else {
      setDataURL(src);
    }
  }, [src]);

  return (
    <Box
      sx={{
        backgroundColor: 'var(--neutral-300)',
        ...containerStyle,
      }}
    >
      {dataURL || thumbnailStyle === 'image' ? (
        <img
          src={dataURL || defaultImage}
          alt={alt}
          style={{
            display: 'block',
            width: width ? width : '100%',
            height: height ? height : '100%',
            objectFit: 'contain',
            ...style,
          }}
          onLoad={onLoad}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
          onContextMenu={(e) => {
            if (disableRightClick) {
              e.preventDefault();
            }
          }}
        />
      ) : (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--purple-25)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...thumbStyle,
          }}
        >
          <img
            src={defaultIcon}
            alt="audio"
            style={{
              height: '60px',
              width: '60px',
              ...iconStyle,
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default ImagePreview;
