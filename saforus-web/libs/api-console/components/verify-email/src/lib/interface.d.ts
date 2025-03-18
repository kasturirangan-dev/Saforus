export interface ActivationExpiredViewProps {
  handleSubmit: UseFormHandleSubmit<ReActivationEmail>;
  onSubmit: (data: ReActivationEmail) => void;
  register: UseFormRegister<ReActivationEmail>
  errors: FieldErrors<ReActivationEmail>
  loading: boolean;
  onClose: () => void;
  email: string;
}

export interface VerifyEmailViewProps {
  onSubmit: () => void;
  loading: boolean;
  email?: string;
  completed?: boolean;
}

export interface ComponentVerifyEmailProps {
  token?: string;
  email?: string;
}

export interface IActivationRequest {
  jwt: string,
};

export interface VerificationEmailApi {
  postVerificationEmail: (activationInfo: IActivationRequest) => Promise<any>;
}

export interface ResendEmailApi {
  postResendEmail: (email: string) => Promise<any>;
}