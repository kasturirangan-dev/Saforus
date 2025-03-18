import { Avatar, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AvatarHeader } from '../header';
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import AvatarPhoto from '../assets/photo.svg';
import UploadImg from '../assets/upload.svg';
import rotateIcon from '../assets/ico_rotate_black.svg';
import { AvatarFooter } from '../footer';
import { FileRejection, useDropzone } from 'react-dropzone';
import {
  IConfigMedia,
  MediaConfigs,
} from '@web-workspace/saforus/common/model';
import { AvatarState, AvatarTypeMessage } from '../config/enum';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../ultis/cropImage';
import { randomId } from '@web-workspace/shared/helpers/strings';
import { useMainContentData } from './data';
import { useSnapshot } from 'valtio';
import MyAccountStore from '@web-workspace/saforus/components/user-info/my-account/data';
import { showToast } from '@web-workspace/shared/components/widgets/toast';

export interface AvatarContentProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<AvatarState>>;
  onClose: () => void;
  avatarUrl?: string;
}

export const AvatarContent = ({
  step,
  setStep,
  onClose,
  avatarUrl,
}: AvatarContentProps) => {
  const avatarSize = 400;
  const { t } = useTranslation();
  const { loginInformation } = useSnapshot(MyAccountStore);
  const [previewAvatar, setPreviewAvatar] = useState(loginInformation.avatar);
  const [editAvatar, setEditAvatar] = useState(loginInformation.avatar || '');
  const [uploadError, setUploadError] = useState(false);

  const [fileName, setFileName] = useState('');
  const {
    uploadAvatar,
    isUploadAvatarLoading,
    deleteAvatar,
    isDeleteAvatarSuccess,
  } = useMainContentData(onClose);

  const [type, setType] = useState(AvatarTypeMessage.Information);

  const config = MediaConfigs.IMG as IConfigMedia;
  const maxImageSize = 5 * 1024 * 1024;

  const SetMessage = ({ type }: { type: number }) => {
    let text;
    let textColor = 'var(--purple-300)';

    switch (type) {
      default:
        text = (
          <Typography color={uploadError ? 'error' : 'textColor'}>
            JPEG, PNG, SVG, WebP, BMP
            <br />({t('myaccount.login-information.dialog.avatar-requirement')})
          </Typography>
        );
        break;
      case AvatarTypeMessage.Error:
        text = (
          <>
            {t('myaccount.login-information.dialog.capacity-error-upload-a')}
            <br />
            {t('myaccount.login-information.dialog.capacity-error-upload-b')}
          </>
        );
        textColor = 'var(--red-450)';
        break;
      case AvatarTypeMessage.Uploading:
        text = `${t('myaccount.login-information.dialog.uploading')}...`;
        break;
      case AvatarTypeMessage.Saving:
        text = `${t('myaccount.login-information.dialog.saving')}...`;
        break;
      case AvatarTypeMessage.Saved:
        text = `${t('myaccount.login-information.dialog.saved')}!`;
        break;
    }

    if (step === AvatarState.Editing && type !== AvatarTypeMessage.Error) {
      text = '';
    }
    return (
      <Typography variant="subtitle2" color={textColor}>
        {text}
      </Typography>
    );
  };

  // handle drag and upload with react-dropzone
  const handleFileDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    const file = acceptedFiles[0];
    const allowedFormats = [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp',
      'image/bmp',
    ];

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (!allowedFormats.includes(file.type) || fileSizeInMB > 5) {
        showToast.error(t('myaccount.avatar.failUpload'));
        setUploadError(true);
        return;
      }
    }
    
    setUploadError(false);
    setFileName(file.name);
    const convertedFiles = {
      id: randomId(),
      file: file,
      preview: URL.createObjectURL(file),
    };
    setEditAvatar(convertedFiles.preview);
    setStep(AvatarState.Editing);
    setType(AvatarTypeMessage.Information);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    disabled: step === AvatarState.Preview || step === AvatarState.Editing,
    accept: config.accept,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) =>
      handleFileDrop(acceptedFiles, fileRejections),
  });
  //////////////////////////////////////////////

  // handle rotate and crop with react-easy-crop
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  /** Added resize functionality to the Cropper component for the Avatar Editor
   * Intermediate zoom level, used for calculations during resizing
   */
  const [intermediateZoom, setIntermediateZoom] = useState(1);
  /**
   * Previous zoom level, used to calculate new zoom level during resizing
   */
  const [previousZoom, setPreviousZoom] = useState(1);
  /**
   * Current size of the crop area
   */
  const [cropSize, setCropSize] = useState({
    width: avatarSize,
    height: avatarSize,
  });

  /**
   * Resets crop size when zoom level changes
   */

  useEffect(() => {
    setCropSize({ width: avatarSize, height: avatarSize });
  }, [zoom]);

  /**
   * Resets zoom level when avatar type changes to saving
   */

  useEffect(() => {
    if (type === AvatarTypeMessage.Saving) {
      setZoom(1);
      setPreviousZoom(1);
    }
  }, [type]);

  let initialMousePosition: number | null = null;
  let initialCropSize: number | null = null;
  let isLeft = false;
  const [mouseUp, setMouseUp] = useState(false);
  const isResizing = useRef(false);
  const [divPosition, setDivPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const [divSize, setDivSize] = useState({
    width: avatarSize,
    height: avatarSize,
  });

  /**
   * Handles mouse down event to start resizing
   * @param {React.MouseEvent} e - The mouse event
   * @param {boolean} left - Flag indicating if resizing is from the left
   */
  const handleMouseDown = (e: React.MouseEvent, left: boolean) => {
    e.preventDefault();
    isResizing.current = true;
    initialMousePosition = e.clientX;
    initialCropSize = cropSize.width;
    isLeft = left;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  /**
   * Handles mouse move event during resizing
   * @param {MouseEvent} e - The mouse event
   */
  const handleMouseMove = (e: MouseEvent) => {
    if (
      !isResizing.current ||
      initialMousePosition === null ||
      initialCropSize === null
    )
      return;
    let changeInMousePosition = initialMousePosition - e.clientX;
    if (isLeft) {
      changeInMousePosition = -changeInMousePosition;
    }
    const newValue = initialCropSize + changeInMousePosition;
    const newDivPosition = {
      ...divPosition,
      left: divPosition.left + changeInMousePosition,
      right: divPosition.right - changeInMousePosition,
      top: divPosition.top + changeInMousePosition,
      bottom: divPosition.bottom - changeInMousePosition,
    };
    setDivPosition(newDivPosition);

    // Calculate the new div size in pixels
    const changeInWidth = changeInMousePosition;
    const changeInHeight = changeInMousePosition; // Calculate the change in height
    const newDivSize = {
      width: divSize.width - 2 * changeInWidth, // Multiply the change by 2
      height: divSize.height - 2 * changeInHeight, // Adjust the height
    };
    setDivSize(newDivSize);

    // If divSize.width or divSize.height is greater than avatarSize, set the newZoom value immediately
    if (newDivSize.width > avatarSize || newDivSize.height > avatarSize) {
      setCropSize({ width: avatarSize, height: avatarSize });
      const zoomChange = (newValue - avatarSize) / 220;
      let newZoom = previousZoom + zoomChange;
      if (newZoom < 1) {
        newZoom = 1;
      }
      setIntermediateZoom(newZoom);
      setDivSize({ width: avatarSize, height: avatarSize });
      setDivPosition({ top: 0, left: 0, right: 0, bottom: 0 });
      setMouseUp(true);
    } else {
      // Calculate the new zoom level and size in the same way as the Sliders
      const zoomChange = (newValue - avatarSize) / 220;
      let newZoom = previousZoom + zoomChange;
      if (newZoom < 1) {
        newZoom = 1;
      }
      setIntermediateZoom(newZoom);
      setCropSize({ width: newDivSize.width, height: newDivSize.height }); // Use the reversedValue
    }
  };
  /**
   * Handles mouse up event to end resizing
   * @param {MouseEvent} e - The mouse event
   */
  const handleMouseUp = (e: MouseEvent) => {
    isResizing.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    setDivSize({ width: avatarSize, height: avatarSize });
    setDivPosition({ top: 0, left: 0, right: 0, bottom: 0 });
    setMouseUp(true);
  };
  /**
   * Updates zoom level after mouse up event
   */
  useEffect(() => {
    if (mouseUp) {
      setZoom(intermediateZoom);
      setPreviousZoom(intermediateZoom);
      // Reset mouseUp to false after updating the zoom
      setMouseUp(false);
    }
  }, [intermediateZoom, mouseUp]);

  //////////////////////////////////////////////

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        editAvatar,
        croppedAreaPixels as any,
        rotation,
        undefined,
        fileName
      );
      if (croppedImage.size < maxImageSize) {
        uploadAvatar(croppedImage);
        setPreviewAvatar(URL.createObjectURL(croppedImage));
        setType(AvatarTypeMessage.Saving);
      } else {
        setType(AvatarTypeMessage.Error);
      }
      setStep(AvatarState.Uploading);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAvatar = () => {
    deleteAvatar();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  const renderDefaultAvatar = useMemo(() => {
    return loginInformation.fullName ? (
      <Typography variant="h1" fontWeight={400}>
        {getInitials(loginInformation.fullName)}
      </Typography>
    ) : (
      <img src={AvatarPhoto} alt="avatar"></img>
    );
  }, [loginInformation.fullName]);

  return (
    <Box
      sx={{
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <AvatarHeader />
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {step === AvatarState.Uploading ? (
            isUploadAvatarLoading ? (
              <Avatar
                sx={{
                  width: 338,
                  height: 338,
                  backgroundColor: 'var(--neutral-500)',
                  color: 'var(--gray-25)',
                  ...(type === AvatarTypeMessage.Saving ||
                  type === AvatarTypeMessage.Saved
                    ? {
                        borderRadius: '338px',
                      }
                    : {}),
                }}
                src={previewAvatar}
                imgProps={{ loading: 'lazy' }}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  border: '2px var(--neutral-500)',
                  backgroundColor: 'var(--neutral-100)',
                  color: 'var(--gray-500)',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--gray-25)',
                  }}
                >
                  {t('myaccount.login-information.dialog.drop-here')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: '0.75rem', color: 'var(--gray-25)' }}
                >
                  {t('myaccount.login-information.dialog.or')}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'var(--neutral-400)',
                    backgroundColor: 'var(--base-white)',
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    color: 'var(--gray-25)',
                  }}
                  startIcon={<img src={UploadImg} alt="upload-icon" />}
                  onClick={open}
                >
                  {t('myaccount.login-information.button.upload')}
                </Button>
              </Box>
            )
          ) : (
            step !== AvatarState.Editing && (
              <Avatar
                sx={{
                  width: 338,
                  height: 338,
                  backgroundColor: 'var(--neutral-500)',
                  color: 'var(--gray-25)',
                  ...(type === AvatarTypeMessage.Saving ||
                  type === AvatarTypeMessage.Saved
                    ? {
                        borderRadius: '338px',
                        border: '3px solid var(--Main-BrandColor1, #9C32EF)',
                      }
                    : {}),
                }}
                src={previewAvatar}
                imgProps={{ loading: 'lazy' }}
              >
                {previewAvatar === '' && renderDefaultAvatar}
              </Avatar>
            )
          )}
        </Box>
        {step === AvatarState.Editing && (
          <Box
            sx={{
              height: avatarSize,
              position: 'relative',
            }}
          >
            {/* Cropper component */}
            <div
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              <Cropper
                image={editAvatar}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                cropSize={cropSize}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                objectFit="cover"
              />
              <div
                style={{
                  position: 'absolute',
                  top: divPosition.top,
                  left: divPosition.left,
                  right: divPosition.right,
                  bottom: divPosition.bottom,
                  width: divSize.width,
                  height: divSize.height,
                  border: '2px solid var(--purple-400)',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: -4,
                    bottom: -4,
                    width: '9px',
                    height: '9px',
                    border: '2px solid var(--purple-400)',
                    backgroundColor: 'white',
                    cursor: 'nwse-resize',
                    pointerEvents: 'auto',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMouseDown(e, false);
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: -4,
                    bottom: -4,
                    width: '9px',
                    height: '9px',
                    border: '2px solid var(--purple-400)',
                    backgroundColor: 'white',
                    cursor: 'nesw-resize',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMouseDown(e, true);
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: -4,
                    top: -4,
                    width: '9px',
                    height: '9px',
                    border: '2px solid var(--purple-400)',
                    backgroundColor: 'white',
                    cursor: 'nesw-resize',
                    pointerEvents: 'auto',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMouseDown(e, false);
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: -4,
                    top: -4,
                    width: '9px',
                    height: '9px',
                    border: '2px solid var(--purple-400)',
                    backgroundColor: 'white',
                    cursor: 'nwse-resize',
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMouseDown(e, true);
                  }}
                />
              </div>
            </div>
            {/* Copper component ends */}
            <Button
              color="secondary"
              fullWidth
              sx={{ marginRight: 'auto', padding: '12px 18px' }}
              onClick={() =>
                setRotation((prevRotation: number) => prevRotation - 90)
              }
            >
              <img src={rotateIcon} alt="" style={{ margin: '4px' }} />
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {(step === AvatarState.Uploading || step === AvatarState.Editing) && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
            >
              <SetMessage type={type} />
            </Box>
          )}
        </Box>
        <AvatarFooter
          step={step}
          setStep={setStep}
          getInputProps={getInputProps}
          open={open}
          setRotation={() => {
            setRotation(0);
          }}
          cropImage={showCroppedImage}
          deleteAvatar={handleDeleteAvatar}
          isDefaultAvatar={loginInformation.avatar === ''}
          uploading={isUploadAvatarLoading}
          onClose={onClose}
        />
      </Box>
    </Box>
  );
};
