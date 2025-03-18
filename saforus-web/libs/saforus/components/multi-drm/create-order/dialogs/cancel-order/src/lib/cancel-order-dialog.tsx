import React from 'react';
import useCancelOrderData from './data';
import CancelOrderView from './view';

type CancelOrderDialogProps = {
  onClose: () => void;
};

const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({ onClose }) => {
  const { checkboxValue, handleCheckboxChange, onCancelOrder, onPrev } =
    useCancelOrderData({
      onClose,
    });

  return (
    <CancelOrderView
      onPrev={onPrev}
      onClose={onClose}
      checkboxValue={checkboxValue}
      handleCheckboxChange={handleCheckboxChange}
      onCancelOrder={onCancelOrder}
    />
  );
};

export default CancelOrderDialog;
