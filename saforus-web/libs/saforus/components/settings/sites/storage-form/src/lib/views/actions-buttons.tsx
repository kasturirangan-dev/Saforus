import { Box, IconButton, styled } from '@mui/material';
import SaveIcon from '../assets/save.svg';
import CancelIcon from '../assets/cancel.svg';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsButtonsProps {
  isEditing: boolean;
  isAnyFormActive: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ButtonWrapper = styled(Box)`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 50px;
  grid-column: span 2;
`;

const StyledIconButton = styled(IconButton)`
  font-size: 15px;
  gap: 2px;
  &:hover {
    background: transparent;
  }
`;

const ActionsButtons: React.FC<ActionsButtonsProps> = ({
  isEditing,
  isAnyFormActive,
  onCancel,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);

  React.useEffect(() => {
    setIsEdit(isEditing);
  }, [isEditing]);

  if (isEdit) {
    return (
      <ButtonWrapper>
        <StyledIconButton type="submit">
          <img
            src={SaveIcon}
            alt="Save"
            title="Save"
            width={20}
            height={20}
            loading="lazy"
          />
          {t('settings-pages.storage.save')}
        </StyledIconButton>
        <StyledIconButton onClick={onCancel}>
          <img
            src={CancelIcon}
            alt="Cancel"
            title="Cancel"
            width={20}
            height={20}
            loading="lazy"
          />
          {t('settings-pages.storage.cancel')}
        </StyledIconButton>
      </ButtonWrapper>
    );
  }

  if (!isAnyFormActive) {
    return (
      <ButtonWrapper>
        <StyledIconButton onClick={onEdit}>
          <img
            src={EditIcon}
            alt="Edit"
            title="Edit"
            width={20}
            height={20}
            loading="lazy"
          />
          {t('settings-pages.storage.edit')}
        </StyledIconButton>
        <StyledIconButton onClick={onDelete}>
          <img
            src={DeleteIcon}
            alt="Delete"
            title="Delete"
            width={20}
            height={20}
            loading="lazy"
          />
          {t('button.delete')}
        </StyledIconButton>
      </ButtonWrapper>
    );
  }
  return <ButtonWrapper />;
};

export default ActionsButtons;
