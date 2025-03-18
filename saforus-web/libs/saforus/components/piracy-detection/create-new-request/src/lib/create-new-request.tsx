import CreateRequestView from './view';
import { Box, styled } from '@mui/material';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import { usePiracyData } from './data';
import { FormProvider } from 'react-hook-form';
import PiracyStore from './data/store';
import { PiracyCreateForm } from './data/interface';
import { generateOrderNo } from './data/utils';
import { getTeamId, showToast } from '@web-workspace/saforus/common/utils';
import { useTranslation } from 'react-i18next';
import { UserRole } from '@web-workspace/saforus/common/model';
import AuthStore from '@web-workspace/shared/hooks/use-auth';
import {
  TrackingEvent,
  logEventAnalytics,
} from '@web-workspace/shared/analytics';

const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

export function CreateNewRequest() {
  const { onReset } = useSnapshot(PiracyStore);
  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  const {
    methods,
    onSubmit,
    handleSubmit,
    register,
    errors,
    setValue,
    watch,
    onFilesAdded,
    handleRemoveFile,
    trigger,
    contentType,
    onSearch,
    isSearching,
  } = usePiracyData();

  const { t } = useTranslation();
  const teamId = getTeamId();
  const onSubmitHandler = (data: PiracyCreateForm) => {
    if (AuthStore?.userInfo?.role === UserRole.TEAM_VIEWER) {
      showToast.error(t('create-new-request.message.need-permission'));
      return;
    }
    data.orderId = generateOrderNo({ contentType });
    data.contentType = contentType;
    data.teamId = teamId?.toString() ?? '';
    data.autoDetection = true;
    // LogEvent before submit
    logEventAnalytics(TrackingEvent.PD_CreateOrder);
    onSubmit(data);
  };

  return (
    <BoxContainer>
      <FormProvider {...methods}>
        <CreateRequestView
          onSubmit={onSubmitHandler}
          handleSubmit={handleSubmit}
          register={register}
          setValue={setValue}
          watch={watch}
          methods={methods}
          handleRemoveFile={handleRemoveFile}
          onFilesAdded={onFilesAdded}
          errors={errors}
          trigger={trigger}
          onSearch={onSearch}
          isSearching={isSearching}
        />
      </FormProvider>
    </BoxContainer>
  );
}

export default CreateNewRequest;
