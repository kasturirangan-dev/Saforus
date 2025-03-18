import { Box, CircularProgress, IconButton, styled } from '@mui/material';
import SaveIcon from '../assets/save.svg';
import CancelIcon from '../assets/cancel.svg';
import EditIcon from '../assets/edit.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActionsButtonsProps {
  isEdit: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const ButtonWrapper = styled(Box)`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
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
  isEdit,
  onCancel,
  onEdit,
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation();

  if (isEdit) {
    return (
      <ButtonWrapper>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            <StyledIconButton type="submit" onClick={onSubmit}>
              <img
                src={SaveIcon}
                alt="Save"
                title="Save"
                width={20}
                height={20}
                loading="lazy"
              />
              {t('button.save')}
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
              {t('button.cancel')}
            </StyledIconButton>
          </>
        )}
      </ButtonWrapper>
    );
  }

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
        {t('button.edit')}
      </StyledIconButton>
    </ButtonWrapper>
  );
};

export default ActionsButtons;
