import { UseFormGetValues } from 'react-hook-form';
import { WatermarkingCreateOrder } from './utils';

export interface CreateOrderWatermarkingProps {
  handleSubmit: UseFormHandleSubmit<WatermarkingCreateOrder>;
  onSubmit: (data: WatermarkingCreateOrder) => void;
  register: UseFormRegister<WatermarkingCreateOrder>;
  errors: FieldErrors<WatermarkingCreateOrder>;
  setValue: UseFormSetValue<WatermarkingCreateOrder>;
  getValues: UseFormGetValues<WatermarkingCreateOrder>;
  watch: UseFormWatch<WatermarkingCreateOrder>;
  methods: UseFormReturn<WatermarkingCreateOrder>;
  loading: boolean;
}
