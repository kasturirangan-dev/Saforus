import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { SettingSiteStore } from '@web-workspace/saforus/components/settings/sites/data';
import { useSnapshot } from 'valtio';

const useDeleteStorageData = ({ onClose }: { onClose: () => void }) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const { turnOffStorageForm } = useSnapshot(SettingSiteStore);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  const { mutate, isLoading } = useMutation(SettingSiteStore.deleteStorage, {
    onSuccess: () => {
      onClose();
      turnOffStorageForm();
    },
  });

  const onDelete = () => {
    const storageId = SettingSiteStore.editingStorageId;
    if (storageId) {
      mutate(storageId);
    }
  };

  return {
    checkboxValue,
    handleCheckboxChange,
    onDelete,
    isLoading,
  };
};

export default useDeleteStorageData;
