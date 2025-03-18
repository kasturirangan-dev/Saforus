import { IconButton } from '@mui/material';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import MyAccountStore from '@web-workspace/saforus/components/user-info/my-account/data';
import { useSnapshot } from 'valtio';
import { useState } from 'react';
import { AvatarState } from './config/enum';
import { AvatarContent } from './main-content';
import CancelChangeAvatarProps from '@web-workspace/saforus/components/user-info/my-account/dialogs/cancel-change-avatar';
import {pxToVw} from '@web-workspace/saforus/common/utils';
export interface AvatarEditorProps {
  onClose: () => void;
  avatarUrl: string;
}


export function DialogsAvatarEditor({ onClose, avatarUrl}: AvatarEditorProps) {
  const { t } = useTranslation();

  const { loginInformation } = useSnapshot(MyAccountStore);
  const initialStep = avatarUrl ? AvatarState.Preview : AvatarState.Uploading;
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
          style: { boxShadow: 'var(--shadow-2xl)', borderRadius: pxToVw('5px') },
        }}
        rightIcon={
          <IconButton onClick={handleRightIconClick}>
            <CloseIcon />
          </IconButton>
        }
        rightIconCss={{
          marginTop: '0rem',
          marginRight: '0rem',
        }}
        disableBackdropClick={true}
        onClose={onClose}
        contentCss={{ margin: 'auto' }}
        footerCss={{
          justifyContent: 'flex-start',
        }}
        dialogContent={
          <AvatarContent step={step} setStep={setStep} onClose={onClose} avatarUrl={avatarUrl}/>
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
