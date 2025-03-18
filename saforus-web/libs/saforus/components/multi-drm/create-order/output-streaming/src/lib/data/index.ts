import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  DrmOutputStreamSchema,
  SupportedResolution,
} from '@web-workspace/saforus/components/multi-drm/create-order/data';

export function useOutputStreamData() {
  const methods = useForm({
    defaultValues: {
      formats: ['DASH'],
      duration: 0,
      applyAverageBand: true,
      minBandTime: 0,
      useCodeConfig: true,
      videoCodecId: '',
      audioCodecId: '',
      videoBitrate: '',
      resolutions: [] as SupportedResolution[],
    },
    resolver: yupResolver(DrmOutputStreamSchema),
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
