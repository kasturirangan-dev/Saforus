import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DrmPackageOptionSchema } from '@web-workspace/saforus/components/multi-drm/create-order/data';

export function usePackageOptionData() {
  const methods = useForm({
    defaultValues: {
      useWatermark: true,
      useMultiDrm: true,
      useWideVine: true,
      usePlayReady: true,
      useFairPlay: false,
      orderNo: '',
    },
    resolver: yupResolver(DrmPackageOptionSchema),
  });

  return {
    methods,
    handleSubmit: methods.handleSubmit,
    errors: methods.formState.errors,
    register: methods.register,
    setValue: methods.setValue,
    watch: methods.watch,
    control: methods.control,
    reset: methods.reset,
  };
}
