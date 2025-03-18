import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

function ImageWithFallback({
  src,
  alt,
  width,
  height,
  color,
  errorImg = '',
  disableRightClick = false,
  ...rest
}: any) {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (errorImg) {
      setImgSrc(errorImg);
    }
    setImgError(true);
  };

  useEffect(() => {
    setImgSrc(src);
    setImgError(false);
  }, [src]);

  return (
    <Box>
      {!imgError ? (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onError={handleImageError}
          {...rest}
          onContextMenu={(e) => {
            if (disableRightClick) {
              e.preventDefault();
            }
          }}
        />
      ) : (
        <div
          style={{
            width: width,
            height: height,
            backgroundColor: '#D9D9D9',
          }}
        />
      )}
    </Box>
  );
}

export default ImageWithFallback;
