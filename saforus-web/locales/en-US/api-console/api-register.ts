const apiRegister = {
  form: {
    'your-name': 'Your Name',
    email: 'Email Address',
    password: 'Password',
    'placeholder-companyname': 'Enter your company name',
    'placeholder-confirm-pass': 'Enter the same password',
    'confirm-pass': 'Confirm Password',
    'company-name': 'Company Name',
    'placeholder-yourname': 'Enter your name',
    'country-of-incorporation': 'Country of Incorporation',
    'has-account': 'Already have an account?',
    'agree-condition': 'terms of service',
    'agree-policy': 'privacy policy',
    'more-14': '[Required] Confirm that I am above 14 years of age',
    'join-us': 'Join Us!',
    'placeholder-pass2': 'Enter the password',
    'placeholder-email3': 'Enter your email to create account',
    'placeholder-country': 'Select the country of Incorporation',
    'agree-all': 'Agree to all',
    'consent-email': '[Optional] Consent to receive marketing emails',
    'mobile-number': 'Mobile Number',
    'placeholder-mobilenumber': 'Enter your mobile number',
    donthaveaccount: "Don't have an account?",
  },
  errors: {
    'name-start-no-space': 'The first character must be a letter',
    phone: 'Mobile number is required',
    'phone-invalid': 'Invalid phone number',
    'confirm-pass-req': 'Confirm password is required.',
    'confirm-pass-match': 'The Confirm Password does not match',
    'pass-incorrect-format': 'The Password format is not correct',
    'account-verified':
    'This activation link may have already been used. Please try logging in with your account. You can contact us for further assistance.',
  },
  'page-register-done': {
    'content-description-1': 'We have sent you an email to',
    'content-description-2':
      'Please check your inbox and verify email address in 3 days to activate your account.',
    title: 'Thank you for your registration',
  },
  'page-register-completed': {
    title: 'Registration completed!',
    description1: 'Your registration process is completed.',
    description2: 'You can login now.',
    'title-expired': 'Email verification link expired!',
    'expired-description':
      'Looks like the verification link has expired. Your account can not be activated. Not to worry, we can send the link again to',
  },
  'page-register-verify': {
    description1: 'SaForus 서비스에  가입했습니다.',
  },
  button: {
    resend: 'Resend Activation Link',
    login: 'Log In',
    'sign-up': 'Sign Up',
  },
  dialogs: {
    'register-error': {
      title: 'We’re sorry, but something went\nwrong.',
      description:
        'Your registration failed. Please try again or\ncontact us for Support.',
      button: {
        contact: 'Contact Us',
        'try-again': 'Try Again',
      },
    },
  },
};

export { apiRegister };
