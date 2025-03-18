import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  QUERY_KEY,
  SettingSiteStore,
} from '@web-workspace/saforus/components/settings/sites/data';
import { useSnapshot } from 'valtio';

const useDeleteSiteData = ({ onClose }: { onClose: () => void }) => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const { turnOffStorageForm } = useSnapshot(SettingSiteStore);
  const queryClient = useQueryClient();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(event.target.checked);
  };

  const { mutate, isLoading } = useMutation(SettingSiteStore.deleteSite, {
    onSuccess: () => {
      onClose();
      turnOffStorageForm();
      queryClient.invalidateQueries(QUERY_KEY.SITES_LIST);
    },
  });

  const onDelete = () => {
    const siteId = SettingSiteStore.currentSiteId;
    if (siteId) {
      mutate(siteId);
    }
  };

  return {
    checkboxValue,
    handleCheckboxChange,
    onDelete,
    isLoading,
  };
};

export default useDeleteSiteData;
