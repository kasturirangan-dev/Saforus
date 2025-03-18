import { CSSProperties, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MediaIcon } from '@web-workspace/shared/components/widgets/icon';
import loadTiff from './load-tiff';

export interface ImageOrTiffProps {
  src: string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  width?: number;
  height?: number;
}

const ImageOrTiff = ({
  src,
  style,
  containerStyle,
  width,
  height,
}: ImageOrTiffProps) => {
  const [dataURL, setDataURL] = useState('');
  useEffect(() => {
    loadTiff(src, setDataURL);
  }, [src]);

  return (
    <Box sx={{ ...containerStyle }}>
      {dataURL ? (
        <img
          src={dataURL}
          alt="TIFF"
          style={{
            width: width ? width : '100%',
            height: height ? height : '100%',
            objectFit: 'cover',
            ...style,
          }}
        />
      ) : (
        <Box
          display="flex"
          sx={{
            width: width ? width : '100%',
            height: height ? height : '100%',
            backgroundColor: 'var(--neutral-600)',
          }}
        >
          <MediaIcon name={'img'} iconStyle={{ margin: 'auto' }} />
        </Box>
      )}
    </Box>
  );
};

export default ImageOrTiff;
