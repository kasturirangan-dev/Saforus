import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  ExpertDetectionModel,
  ExpertDetectionSchema,
  PiracyDetailData,
  patchExpertPiracyOrderDetail,
} from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';

interface DataProps {
  onClose: () => void;
  piracyOrder: PiracyDetailData;
}

const useUpdateExpertDetection = ({ onClose, piracyOrder }: DataProps) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    getValues,
    setValue,
    control,
  } = useForm<Partial<ExpertDetectionModel>>({
    resolver: yupResolver(ExpertDetectionSchema),
    defaultValues: {
      code: piracyOrder.fileList?.at(0)?.detectedCode ?? '',
      status: piracyOrder.status ?? '',
      type: piracyOrder.autoDetection ? 'true' : 'false',
    },
  });

  const onSubmit = async (data: Partial<ExpertDetectionModel>) => {
    try {
      setLoading(true);

      const reqData = {
        status: data.status,
        autoDetection: data.type === 'true' ? true : false,
        detectedCode: data.code,
      };
      const res = await patchExpertPiracyOrderDetail(piracyOrder.id, reqData);
      if (res.resultCode === 202) {
        queryClient.invalidateQueries('PIRACY_ORDER_DETAIL');
        showToast.success('Update expert piracy detection successful', {
          delay: 0,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleKeyPress,
    watch,
    setError,
    control,
    getValues,
    setValue,
    loading,
  };
};

export default useUpdateExpertDetection;
