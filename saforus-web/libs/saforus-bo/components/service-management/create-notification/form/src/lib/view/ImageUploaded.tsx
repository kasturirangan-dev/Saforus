import { ButtonBase, styled } from '@mui/material';
import removeFile from '../assets/remove-file.svg';
import { memo } from 'react';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.2,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'black',
  opacity: 0.1,
  transition: 'opacity',
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

interface FileUploadProps {
  imgSrc: string;
  handleRemoveFile: () => void;
  width: number;
  height: number;
}

const ImageUploaded = ({
  handleRemoveFile,
  imgSrc,
  width,
  height,
}: FileUploadProps) => {
  return (
    <ImageButton focusRipple style={{ width: width, height: height }}>
      <ImageSrc
      >
        <img
          src={imgSrc}
          alt="notiImage"
          width={width}
          height={height}
          loading="lazy"
        />
      </ImageSrc>
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <img
          src={removeFile}
          onClick={handleRemoveFile}
          alt="removeFile"
          width={40}
          height={40}
          loading="lazy"
        />
      </Image>
    </ImageButton>
  );
};
export default memo(ImageUploaded);
