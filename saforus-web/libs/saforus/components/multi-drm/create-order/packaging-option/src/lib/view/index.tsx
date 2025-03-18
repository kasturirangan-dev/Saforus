import { Box, Button, styled } from '@mui/material';
import ForensicWatermarkingView from './forensic-watermarking-view';
import MultiDrmView from './multi-drm-view';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import {
  CreateOrderStepsEnum,
  DrmPackageOption,
  MultiDrmCreateOrderStore,
  generateOrderNo,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';
import { usePackageOptionData } from '../data';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';

const CustomButton = styled(Button)(({ theme }) => ({
  height: 40,
  borderRadius: '0px 6px 6px 0px',
  cursor: 'pointer',
  boxShadow: `var(--shadow-xsm)`,
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 600,
  padding: '10px 16px',
  color: 'var(--base-white)',
  '&.MuiButton-containedPrimary': {
    background: 'var(--main-brand-color3)',
    '&:hover': {
      background: 'var(--main-brand-color3-revert)',
    },
  },
  '&.Mui-disabled': {
    background: 'var(--neutral-700)',
    color: 'var(--base-white)',
  },
  '&.MuiButton-containedSecondary': {
    background: 'var(--base-white)',
    color: 'var(--neutral-400))',
    '&:hover': {
      background: 'var(--neutral-600)',
    },
  },
  '&.MuiButton-textPrimary': {
    elevation: 0,
    color: 'var(--purple-800)',
  },
}));

const CreateMultiDrmView = () => {
  const { t } = useTranslation();
  const { onSetStep, onSetStepData, commonData, getStepData } = useSnapshot(
    MultiDrmCreateOrderStore
  );
  const drmOptions = commonData.drmOptions;

  const { methods, handleSubmit, reset, setValue, watch } =
    usePackageOptionData();
  const formValue = methods.watch();

  useEffect(() => {
    const dataRestore = getStepData(CreateOrderStepsEnum.PACKAGING_OPTION);
    reset({
      ...dataRestore,
    });
  }, []);

  const handleNext = (value: DrmPackageOption) => {
    const stepperElement = document.getElementById('stepper');
    if (stepperElement) {
      stepperElement.scrollIntoView({ behavior: 'smooth' });
    }

    let createOrderNo = value.orderNo;
    if (createOrderNo === '') {
      createOrderNo = generateOrderNo(
        value.useWatermark ?? false,
        value.useMultiDrm ?? false
      );

      setValue('orderNo', createOrderNo);
    }

    const newValue = { ...value, orderNo: createOrderNo };
    onSetStepData(CreateOrderStepsEnum.PACKAGING_OPTION, newValue);
    onSetStep(CreateOrderStepsEnum.CHOOSE_STORAGE);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '24px',
        flexDirection: 'column',
      }}
    >
      <FormProvider {...methods}>
        <ForensicWatermarkingView />
        <MultiDrmView drmOptions={drmOptions} />
        <CustomButton
          disabled={
            !formValue.useWideVine &&
            !formValue.usePlayReady &&
            !formValue.useFairPlay
          }
          type="submit"
          variant="contained"
          onClick={handleSubmit(handleNext)}
          sx={{
            order: 2,
            borderRadius: '5px',
            margin: '0 7px',
          }}
        >
          {t('multiDrm.button.create-order')}
        </CustomButton>
      </FormProvider>
    </Box>
  );
};

export default CreateMultiDrmView;
