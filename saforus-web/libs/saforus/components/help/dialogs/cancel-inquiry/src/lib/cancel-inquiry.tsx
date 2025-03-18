import React from 'react';
import CancelInquiryDialogView from './view';

export type CancelInquiryDialogProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const RemoveTeamDialogContainer: React.FC<CancelInquiryDialogProps> = ({
  onClose,
  onConfirm,
}) => {
  return <CancelInquiryDialogView onClose={onClose} onConfirm={onConfirm} />;
};

export default RemoveTeamDialogContainer;
