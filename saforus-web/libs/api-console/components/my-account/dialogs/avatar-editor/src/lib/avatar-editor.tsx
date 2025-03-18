import { IconButton } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { AvatarState } from './config/enum';
import { AvatarContent } from './main-content';
import MyAccountStore from '@web-workspace/api-console/components/my-account/data';
import CancelChangeAvatarProps from '@web-workspace/saforus/components/user-info/my-account/dialogs/cancel-change-avatar';
import { useSnapshot } from 'valtio';

export interface AvatarEditorProps {
  onClose: () => void;
}

export function DialogsAvatarEditor({ onClose }: AvatarEditorProps) {
  const { profile } = useSnapshot(MyAccountStore);
  const initialStep = profile?.avatarPreview
    ? AvatarState.Preview
    : AvatarState.Uploading;
  const [step, setStep] = useState(initialStep);
  const [open, setOpen] = useState(false);
  const handleRightIconClick = () => {
    if (step === AvatarState.Editing) setOpen((prevOpen) => !prevOpen);
    else onClose();
  };
  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            boxShadow: 'var(--shadow-2xl)',
            borderRadius: '5px',
          },
        }}
        rightIcon={
          <IconButton onClick={handleRightIconClick}>
            <CloseIcon />
          </IconButton>
        }
        rightIconCss={{
          marginRight: '1rem',
          marginTop: '1rem',
        }}
        onClose={onClose}
        contentCss={{ padding: '1.5rem' }}
        footerCss={{
          justifyContent: 'flex-start',
        }}
        dialogContent={
          <AvatarContent step={step} setStep={setStep} onClose={onClose} />
        }
        dialogCss={{
          width: '100%',
          height: 'auto',
          justifyContent: 'center',
        }}
      />
      <CancelChangeAvatarProps
        open={open}
        onCancel={handleRightIconClick}
        onLeave={onClose}
      />
    </>
  );
}

export default DialogsAvatarEditor;
