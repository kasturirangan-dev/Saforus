import { Box, useTheme } from '@mui/material';
import {
  TypeOptions,
  toast,
  ToastContainer as BaseToastContainer,
  Zoom,
} from 'react-toastify';
import Icon from '@web-workspace/shared/components/widgets/icon';

import './toast.scss';

const ToastContainer = () => {
  const theme = useTheme();

  const toastClassName = ({ type }: { type: TypeOptions }) => {
    switch (type) {
      case toast.TYPE.SUCCESS:
        return 'custom-toast-message success-toast';
      case toast.TYPE.ERROR:
        return 'custom-toast-message error-toast';
      case toast.TYPE.WARNING:
        return 'custom-toast-message warning-toast';
      default:
        return '';
    }
  };

  const icon = ({ type }: { type: TypeOptions }) => {
    switch (type) {
      case toast.TYPE.SUCCESS:
        return (
          <Box>
            <Icon name="check_loading" size={20} color="green" />
          </Box>
        );
      case toast.TYPE.ERROR:
        return (
          <Box>
            <Icon name="information" size={20} color="red" />
          </Box>
        );
      case toast.TYPE.WARNING:
        return (
          <Box>
            <Icon name="information" size={20} color="red" />
          </Box>
        );
      default:
        return '';
    }
  };

  const toastContainerProps = {
    closeOnClick: true,
    closeButton: false,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: true,
    theme: theme.palette.mode,
    autoClose: 5000,
    toastClassName: toastClassName,
    transition: Zoom,
    icon: icon,
    position: 'top-center',
  };

  return (
    <BaseToastContainer className={'base-toast'} {...toastContainerProps} />
  );
};

export default ToastContainer;
