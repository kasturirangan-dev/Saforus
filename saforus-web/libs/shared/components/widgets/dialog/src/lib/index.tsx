import * as React from 'react';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

interface CustomDialogProps extends Omit<DialogProps, 'open'> {
  title?: string;
  dialogContent?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  iconCss?: React.CSSProperties;
  rightIcon?: React.ReactNode;
  rightIconCss?: React.CSSProperties;
  titleCss?: React.CSSProperties;
  contentCss?: React.CSSProperties;
  footerCss?: React.CSSProperties;
  open?: boolean;
  subtitle?: React.ReactNode | string;
  subtitleCss?: React.CSSProperties;
  dialogCss?: React.CSSProperties;
  disableBackdropClick?: boolean;
  notion?: React.ReactNode;
}

const CustomIcon = styled(Box)(({ theme }) => ({
  // Add your custom styles for the icon here
  display: 'flex',
  padding: '1.5rem',
  justifyContent: 'center',
  paddingBottom: 0,
}));

const CustomRightIcon = styled(Box)(({ theme }) => ({
  marginTop: '1.5rem',
  marginRight: '1.5rem',
  paddingBottom: 0,
  float: 'right',
  position: 'absolute',
  top: '0',
  right: '0',
}));

const CustomTitle = styled(DialogTitle)(({ theme }) => ({
  marginBottom: 0,
  fontSize: 20,
}));

const CustomContent = styled(DialogContent)(({ theme }) => ({
  // Add your custom styles for the content here
}));

const CustomFooter = styled(DialogActions)(({ theme }) => ({
  // Add your custom styles for the footer here
  padding: '1.5rem',
  paddingTop: 0,
}));

const CustomSubtitle = styled(Typography)(({ theme }) => ({
  // Add your custom styles for the subtitle here
  color: 'var(--gray-50)',
}));

const CustomMuiDialog = styled(MuiDialog)(({ theme }) => ({
  // Add your custom styles for the wrapper here
  '& .MuiPaper-root': {
    // Add your custom styles for MuiPaper-root here
    minWidth: 400,
  },
}));

const CustomNote = styled(Box)(({ theme }) => ({
  // Add your custom styles for the subtitle here
  color: 'var(--gray-50)',
  margin: '0 1.5rem 1.5rem 1.5rem',
}));

const Dialog: React.FC<CustomDialogProps> = ({
  title,
  dialogContent,
  footer,
  icon,
  iconCss,
  rightIcon,
  rightIconCss,
  titleCss,
  contentCss,
  footerCss,
  open = true,
  subtitle,
  subtitleCss,
  dialogCss,
  notion,
  disableBackdropClick = false,
  onClose,
  ...props
}) => {
  const handleClose = (
    event: NonNullable<unknown>,
    reason: 'backdropClick'
  ) => {
    if (
      (disableBackdropClick && reason === 'backdropClick')
    ) {
      return;
    }
    if (onClose) {
      onClose(event, reason);
    }
  };
  return (
    <CustomMuiDialog
      open={open}
      sx={dialogCss}
      keepMounted={true}
      disableEscapeKeyDown={true}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {icon && <CustomIcon sx={iconCss}>{icon}</CustomIcon>}
      {rightIcon && (
        <CustomRightIcon sx={rightIconCss}>{rightIcon}</CustomRightIcon>
      )}
      {title && (
        <CustomTitle
          sx={{ ...titleCss, ...(subtitle ? { paddingBottom: 2 } : {}) }}
        >
          {title}
        </CustomTitle>
      )}
      {subtitle && (
        <CustomSubtitle sx={{ px: 6, ...subtitleCss }}>
          {subtitle}
        </CustomSubtitle>
      )}
      {dialogContent && (
        <CustomContent sx={contentCss}>{dialogContent}</CustomContent>
      )}
      {footer && <CustomFooter sx={footerCss}>{footer}</CustomFooter>}
      {notion && <CustomNote>{notion}</CustomNote>}
    </CustomMuiDialog>
  );
};

export default Dialog;
