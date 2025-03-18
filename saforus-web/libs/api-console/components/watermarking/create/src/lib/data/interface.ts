import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
  UseFormReturn,
} from 'react-hook-form';
import { WatermarkingForm } from './const';

export interface WatermarkingRequestProps {
  handleSubmit: UseFormHandleSubmit<WatermarkingForm>;
  onSubmit: (data: WatermarkingForm) => void;
  errors: FieldErrors<WatermarkingForm>;
  getValues: UseFormGetValues<WatermarkingForm>;
  setValue: UseFormSetValue<WatermarkingForm>;
  watch: UseFormWatch<WatermarkingForm>;
  methods: UseFormReturn<WatermarkingForm>;
}
