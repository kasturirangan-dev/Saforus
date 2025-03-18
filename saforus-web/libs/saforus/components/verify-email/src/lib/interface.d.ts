export interface ActivationExpiredViewProps {
  handleSubmit: UseFormHandleSubmit<ReActivationEmail>;
  onSubmit: (data: ReActivationEmail) => void;
  register: UseFormRegister<ReActivationEmail>
  errors: FieldErrors<ReActivationEmail>
  loading: boolean;
  onClose: () => void;
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
  targetUserName: string,
};

export interface VerificationEmailApi {
  putVerificationEmail: (activationInfo: IActivationRequest) => Promise<any>;
}

export interface ResendEmailApi {
  getResendEmail: (email: string) => Promise<any>;
}