import React from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import ContentCopyIcon from './assets/copy.svg';
import EditIcon from './assets/edit.svg';
import SaveIcon from './assets/check.svg';
import CancelIcon from './assets/cancel.svg';
import Icon from '@web-workspace/shared/components/widgets/icon';

interface ActionsButtonsProps {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  canCopy: boolean;
  canEdit: boolean;
  handleCopy?: () => void;
  onSubmit?: () => void;
  iconSize?: number;
  isLoading: boolean;
  onCancel?: () => void;
  onEdit?: () => void;
  canSubmit?: boolean;
}

export const ActionsButtons: React.FC<ActionsButtonsProps> = ({
  editMode,
  setEditMode,
  canCopy,
  canEdit,
  handleCopy,
  onSubmit,
  iconSize,
  isLoading,
  onCancel,
  onEdit,
  canSubmit,
}) => {
  const handleEdit = () => {
    onEdit ? onEdit() : setEditMode((isEdit) => !isEdit);
  };

  if (editMode) {
    if (onSubmit) {
      return (
        <Box display={'flex'} flexDirection={'row'}>
          {isLoading ? (
            <CircularProgress size={iconSize} />
          ) : (
            <>
              <IconButton onClick={onSubmit} disabled={!canSubmit}>
                <Icon
                  name="check_loading"
                  size={18}
                  color={canSubmit ? 'var(--green-400)' : 'var(--neutral-700)'}
                />
              </IconButton>

              <IconButton
                onClick={() => {
                  handleEdit();
                  onCancel && onCancel();
                }}
              >
                <img
                  src={CancelIcon}
                  alt="Cancel"
                  title="Cancel"
                  width={iconSize}
                  height={iconSize}
                  loading="lazy"
                />
              </IconButton>
            </>
          )}
        </Box>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Box>
      {canCopy && (
        <IconButton onClick={handleCopy}>
          <img
            src={ContentCopyIcon}
            alt="Copy"
            title="Copy"
            width={iconSize}
            height={iconSize}
            loading="lazy"
          />
        </IconButton>
      )}
      {canEdit && (
        <IconButton onClick={handleEdit}>
          <img
            src={EditIcon}
            alt="Edit"
            title="Edit"
            width={iconSize}
            height={iconSize}
            loading="lazy"
          />
        </IconButton>
      )}
    </Box>
  );
};
