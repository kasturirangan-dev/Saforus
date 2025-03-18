import { Register } from "./data/utils";
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
export interface RegisterProps {
  handleSubmit: UseFormHandleSubmit<Register>;
  onSubmit: (data: Register) => void;
  register: UseFormRegister<Register>
  errors: FieldErrors<Register>
  watch: UseFormWatch<Register>
  loading: boolean;
  countries: Country[];
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  country: any;
  disabledCompany: boolean;
  disabledCountry: boolean;
  disabledEmail: boolean;
  control: Control<Register>
}
