import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
  UseFormReturn,
} from 'react-hook-form';
import { PiracyCreateForm } from './const';

export interface PiracyCreateRequestProps {
  handleSubmit: UseFormHandleSubmit<PiracyCreateForm>;
  onSubmit: (data: PiracyCreateForm) => void;
  errors: FieldErrors<PiracyCreateForm>;
  getValues: UseFormGetValues<PiracyCreateForm>;
  setValue: UseFormSetValue<PiracyCreateForm>;
  watch: UseFormWatch<PiracyCreateForm>;
  methods: UseFormReturn<PiracyCreateForm>;
}
