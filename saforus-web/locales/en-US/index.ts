import watermarking from './page-watermarking';
import { gnbmenu, sidemenu } from './menus';
import { myaccount } from './my-account';
import { errmsg } from './error-message';
import multiDrm from './multi-drm';
import { dashboard } from './dashboard';
import piracyDetection from './piracy-detection';
import home from './home';
import teamMember from './team-member';
import help from './help';
import servicePlan from './service-plan';
import { billDetail } from './bill-detail';
import userManagement from './bo-user-management';
import boLogin from './bo-login';
import { calender } from './calender';
import { boSidemenu, boGnbmenu } from './bo-menus';
import orderManagement from './bo-order-management';
import userCredit from './user-credit';
import boSettings from './bo-setting';
import boInquiry from './bo-inquiry';
import serviceManagement from './bo-service-management';
import pageHeader from './page-header';
import apidoc from './api-doc';
import adminDashboard from './bo-admin-dashboard';
import apiConsole from './api-console';
import apiBo from './api-bo';
import apiDocs from './api-docs';
import watermarkingV2 from './page-watermarking-v2';

const enTranslation = {
  ' ': ' ', // Workaround for ' ' key
  button: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    search: 'Search',
    close: 'Close',
    'back-to-start': 'Back to start',
    continue: 'Continue',
    'reset-continue': 'Continue',
    'reset-login': 'Log In',
    'log-in': 'Log In',
    'back-previous-step': 'Go back to the previous step',
    register: 'Register',
    'sign-up': 'Sign Up',
    support: 'Support',
    delete: 'Delete',
    archive: 'Archive',
    activate: 'Activate My Account',
    edit: 'Edit',
    next: 'Next',
    prev: 'Prev',
    'cancel-order': 'Cancel Order',
    'cancel-order-prev': 'Back to Prev',
    invite: 'Invite',
    remove: 'Remove',
    'see-more': 'See more',
    submit: 'Submit',
    undo: 'Undo',
    'see-all': 'See All',
    upgrade: 'View Service Plan',
    update: 'Update',
    add: 'Add',
    no: 'No',
    leave: 'Leave',
    'hide-a-day': 'Do not view for a day',
    ok: 'OK',
    'reset-filters': 'Reset filters',
    view: {
      thumbnail: 'Thumbnail View',
      list: 'List View',
    },
  },

  menu: {
    home: 'Home',
    resources: 'Resources',
    contacts: 'Contacts',
    products: 'Our Products',
    documentation: 'Documentation',
    search: 'Search',
    help: 'Help',
    contact: 'Contact',
  },
  'tool-tip': {
    'pass-required-title': 'Requirement',
    'pass-des':
      'Minimum 8 characters and maximum 12 characters in numbers, lower case letters, and special symbols',
  },
  'page-not-found': {
    '404-not-found': '404 Not Found',
    'page-not-exist': 'Whoops! That page doesn’t exist.',
    'page-not-exist-description': 'The page you requested could not be found',
  },
  'page-login': {
    welcome: 'Welcome Back!',
    'keep-login': 'Keep me logged in',
    'forgot-pass': 'Forgot Password?',
    'api-forgot-pass': 'Forgot Password?',
    'don-have-account': 'Don’t have an account?',
    'contact-us': 'Contact Us',
    'google-login': 'Continue with Google',
    'sign-up': 'Sign Up',
  },
  common: {
    'email-address': 'Email Address',
    email: 'Email',
    password: 'Password',
    'placeholder-email': 'Enter your email',
    'placeholder-pass': 'Enter your password',
    'placeholder-email2': 'Please enter your email address.',
    'placeholder-email3': 'Enter your email',
    'login-email-placeholder': 'Enter the email',
    'login-pass-placeholder': 'Enter the password',
    loading: 'Loading...',
    notification: 'Notification',
    'copy-success': 'Copied to clipboard',
    'file-upload': {
      'drop-file': 'Drag the file or attach it here',
      'browse-file': 'Browse from <0>Your Computer</0>',
      'drop-here': 'Drop the files here...',
      error: 'File upload failed. Please try again.',
    },
    'image-preview': 'Image Preview',
    preview: 'Preview',
    'content-type': {
      image: 'Image',
      video: 'Video',
      audio: 'Audio',
      document: 'Document',
    },
    'order-status': {
      'in-queue': 'In queue',
      'in-progress': 'In progress',
      completed: 'Completed',
      failed: 'Failed',
      expired: 'Expired',
      detected: 'Detected',
      undetected: 'Undetected',
      processed: 'Processed',
    },
    'active-status': {
      active: 'Active',
      inactive: 'Inactive',
    },
    'password-requirements': {
      title: 'Password Requirements',
      '8-characters': 'At least 8 characters',
      '1-number': 'At least 1 number',
      '1-uppercase': 'At least 1 uppercase letter and lowercase letter',
      '1-symbol': 'At least 1 special character',
    },
    next: 'Next',
    previous: 'Prev',
    total: 'Total %{total}',
    selected: '%{total} Selected',
    notice: 'Notice',
    event: 'Event',
    'read-more': 'Read more',
    'no-list': 'There is no list',
    'no-results': 'No results found',
    'no-list-title': 'No order available',
    'no-list-description': 'The data will update once an order is created.',
    'watermarking-order': 'Watermarking Order',
    'detection-order': 'Detection Order',
    'no-list-title-list': 'No order available',
    'no-list-description-list': 'Get started and create a ',
    'cancel-title': 'Cancel changes?',
    'cancel-description':
      'Your changes will not be saved. \n Do you still want to leave?',
  },
  'page-register': {
    'your-name': 'Your Name',
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
    'placeholder-email3': 'Enter your email to create a new account',
    'placeholder-country': 'Select the country of Incorporation',
    'agree-all': 'Agree to all',
    'consent-email': '[Optional] Consent to receive marketing emails',
    'mobile-number': 'Mobile Number',
    'placeholder-mobilenumber': 'Enter your mobile number',
  },
  'page-reset': {
    'reset-password': 'Reset password',
    'reset-pass-description': 'Enter your information to reset your password',
    'request-reset': 'Request reset link',
    'back-to-login': 'Back to Login',
    'resent-email': 'Resend the password reset email',
    dialog: {
      'title-reset-email': 'Password reset link has been sent to ‘%{email}’',
      'content-description-1':
        'It will be expired in 1 hour, please check your inbox and click on the button in the email.',
      'content-description-2':
        'If you do not see it in a few minutes, check your Junk mail or Spam folder.',
      'contact-support': 'Contact Us for Support',
      'blocked-sending-email':
        'Password reset email can be sent up to 5 times in a day.',
      'back-to-reset': 'Go Back to Reset Password',
      'title-reset-email-failed':
        'Your password reset request to ‘%{email}’ could not be processed',
      'content-failed-description-1':
        'Email or name entered appears to be invalid. Please check them carefully.',
      'content-failed-description-2':
        'If both are correct, please contact us for Customer Support.',
    },
    'email-resent-successfully': 'Email resend successfully!',
  },
  'page-settings': {
    dashboard: 'Dashboard',
    'service-usage': 'Packaging & Delivery',
    'search-orders': 'Search Orders',
    'multi-drm-packaging': 'Multi-DRM Packaging',
    'packaging-history': 'Packaging History',
    'distribution-service': 'Distribution Service',
    'new-forensic-watermarking': 'New Forensic Watermarking',
    'watermarking-history': 'Watermarking History',
    'piracy-detection': 'Piracy Detection',
    'new-request': 'New Request',
    'detection-report': 'Detection Report',
    settings: 'Settings',
    'my-sites-storages': 'My Sites & Storages',
    'multi-drm': 'Multi-DRM Settings',
    'my-account': 'My Account',
    'streaming-service': 'Streaming Service',
  },
  'settings-pages': {
    'error-message': {
      'site-name-required': 'Site Name is required.',
      'url-invalid': 'Url is invalid.',
      'url-required': 'Url is required.',
    },
    sites: {
      title: 'My Site List',
      'add-site': 'Add New Site',
      'empty-list':
        'There are no registered sites \nClick <0>Add New Site</0> and register the site.',
    },
    'create-site': {
      title: 'Add My Site',
      subtitle: 'Please register your site to use SaForus service.',
      'site-name': 'Site Name',
      'site-url': 'Site URL',
    },
    'site-detail': {
      'url-label': 'Site URL',
      'site-id-label': 'Site ID',
      'site-key-label': 'Site Key',
      'access-key-label': 'Access Key',
    },
    storage: {
      title: 'My Storage List',
      'add-storage': 'Add New Storage',
      'add-storage-description':
        'Click here to safely register the storage where the contents can be stored.',
      'empty-list':
        'There are no registered storages \nClick <bold>"Add New Storage"</bold> and register the storage.',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      'cancel-add-new': 'Adding a new storage information has been canceled.',
      'add-new-success': 'New storage information has been added successfully.',
    },
    'delete-site': {
      title: "Do you really want to delete your '%{name}' site information?",
      content:
        'You can not search your previous tasks in the site once deleting this. You can use ‘Archive’ instead of ‘Delete’.',
      'agree-term': 'I have read and understood the notice above',
    },
    'delete-storage': {
      title:
        "Do you really want to delete your '%{name}' storage information ?",
      content:
        'You can not search your previous tasks with the storage once deleting this. You can use ‘Archive’ instead of ‘Delete’.',
      'agree-term': 'I have read and understood the notice above',
    },
  },
  api: {
    '400':
      'The request could not be understood by the server due to malformed syntax.',
    '404':
      "The requested page is unavailable or, in some cases, doesn't exist. ",
    '500': ' 500 internal server error',
    'unknown-error':
      "Oops! Something went wrong. We're working on fixing it. Please try again later.",
    'download-file-failed':
      'Internal error. Please try again after some time. If the problem persists, please contact Customer Support.',
    login: {
      '401000': 'Invalid Email. Please check the email you have entered.',
      '401005':
        'The email or password is incorrect. Please check and try again!',
      '401008':
        'Your account is inactive. Please contact Customer Support to activate the account.',
      '401010':
        'Your account has not activated yet.\n Please check your mailbox and press ‘Confirm Email Address’ button.',
      '401012':
        'You cannot login as your account use has been suspended. Please contact customer service to log in with the account you entered.',
      '401013':
        'You cannot login as your account has been deleted. Please create a new account to use the service.',
      '401014':
        'Your account has been temporarily blocked in 24 hours due to too many incorrect login attempts. \nPlease try ‘Forgot password’ to reset it.',
      '501002':
        '[Error Code: 501002] Failed to save user data. Please contact customer service to resolve the issue.',
      '400': 'Your information is incorrect. Please check again.',
      '401': 'Email or password is incorrect.',
      '404':
        'Unregistered email account. Please confirm you entered it correctly. Please sign up first to use service.',
      '405':
        'Wrong password. Please try to enter it again.\n Please click ‘Forgot password’ if you can not remember it',
      '406':
        'You typed wrong password more than 5 times. Try to use ‘Forgot password’ to reset it.',
      '423': 'Your account has been locked',
      unregistered:
        'We couldn’t find an account with that email address. Please sign up for a new account.',
      CSA11111:
        'Your account has been temporarily blocked in 24 hours due to too many incorrect login attempts.\n Please try ‘Forgot password’ to reset it.',
    },
    signup: {
      '400':
        'TThe information you entered is invalid. Please check the information you entered.',
      '401000':
        'The information you entered is invalid. Please check the information you entered.',
      '403':
        'Email is already in use. Please try again with a different email.',
      '401004':
        'Email is already in use. Please try again with a different email.',
      '501002':
        '[Error Code: 501002] Failed to save user data. Please contact customer service to resolve the issue.',
      CSA1102:
        'Email is already in use. Please try again with a different email.',
    },
    'reset-password': {
      '401017':
        'You have exceeded the number of allowed attempts. Please try again in 24 hours.',
      '401008':
        'Your account is inactive. Please contact Customer Support to activate the account.',
      '401010':
        'Your account has not activated yet. Please check your mailbox and press ‘Confirm Email Address’ button.',
      '401012':
        'Your account use has been suspended. Please contact customer service to activate your account.',
      '401013':
        'The password cannot be set as the account has been deleted. Please create a new account to use the service.',
      '401016':
        'You have exceeded the number of allowed attempts. Please try again in 24 hours. ',
      '401018':
        '[Error Code: 401018 Bad Request] JWT (JSON Web Token) value does not exist.',
      '401019': '[Error Code: 401019] The access token has expired or changed.',
      '401020': 'User not found. Please sign up for a new account.',
      '401021': '[Error Code: 401021 Bad Request] Invalid token.',
      '401022':
        '[Error Code: 401022] Account information not found. Please contact customer service to resolve the issue.',
      '401023':
        'Your account must be active before you can reset your password. Please check inbox of the email you signed up with and activate your account.',
      '401024':
        '[Error Code: 401024] Your account information has been updated. Please try to log in again. If the problem persists, please contact customer service.',
      '501002':
        '[Error Code: 501002] Failed to save user data. Please contact customer service to resolve the issue.',
      '400': 'Your information is incorrect. Please check again.',
      '404':
        'Unregistered email account. Please confirm you entered it correctly. Please sign up first to use service.',
      '406': 'You have exceeded the maximum number of requests per day.',
      '423': 'Your account has been locked',
      CSA1100: `Unregistered email account. Please confirm you entered it correctly.\nPlease sign up first to use service.`,
    },
    'new-password': {
      '401000': 'Invalid email. Please check the email you have entered.',
      '401008':
        'Your account is inactive. Please contact Customer Support to activate the account.',
      '401010':
        'Your account must be active before you can reset your password. Please check inbox of the email you signed up with and activate your account.',
      '401012':
        'Your account use has been suspended. Please contact customer service to activate your account.',
      '401013':
        'The password cannot be set as the account has been deleted. Please create a new account to use the service.',
      '401016':
        'You have exceeded the number of allowed attempts. Please try again in 24 hours.',
      '401018':
        '[Error Code: 401018 Bad Request] JWT (JSON Web Token) value does not exist.',
      '401019': '[Error Code: 401019] The access token has expired or changed.',
      '401020': 'User not found. Please sign up for a new account.',
      '401021': '[Error Code: 401021 Bad Request] Invalid token.',
      '401022':
        '[Error Code: 401022] Account information not found. Please contact customer service to resolve the issue.',
      '401023':
        'Your account must be active before you can reset your password. Please check inbox of the email you signed up with and activate your account.',
      '401024':
        '[Error Code: 401024] Your account information has been updated. Please try to log in again. If the problem persists, please contact customer service.',
      '501002':
        '[Error Code: 501002] Failed to save user data. Please contact customer service to resolve the issue.',
      '400': 'Your information is incorrect. Please check again.',
      '401': 'Your session has expired. Please request a new password reset.',
      '404': 'Your information is incorrect. Please check again.',
      '406': 'You have exceeded the maximum number of requests per day.',
      '423': 'Your account has been locked',
    },
    activation: {
      '400': 'Your information is incorrect. Please check again.',
      '401':
        'Your account has not activated yet. Please check your mailbox and press ‘Confirm Email Address’ button.',
      '404':
        'Unregistered email account. Please confirm you entered it correctly. Please sign up first to use service.',
      '423': 'Your account has been locked',
      '401008':
        'Your account is inactive. Please contact Customer Support to activate the account.',
      '401010':
        'An activation email has been sent. Please check inbox of the email you signed up with and activate your account.',
      '401018':
        '[Error Code: 401018 Bad Request] JWT (JSON Web Token) value does not exist.',
      '401019': '[Error Code: 401019] The access token has expired or changed.',
      '401020': 'User not found. Please sign up for a new account.',
      '401021': '[Error Code: 401021 Bad Request] Invalid token.',
      '401022':
        '[Error Code: 401022] Account information not found. Please contact customer service to resolve the issue.',
      '401023':
        'Your account must be active before you can reset your password. Please check inbox of the email you signed up with and activate your account.',
      '401024':
        '[Error Code: 401024] Your account information has been updated. Please try to log in again. If the problem persists, please contact customer service.',
      '501002':
        '[Error Code: 501002] Failed to save user data. Please contact customer service to resolve the issue.',
    },
    'resend-activation': {
      '401':
        'Your account has not activated yet. Please check your mailbox and press ‘Confirm Email Address’ button.',
      '404':
        'Unregistered email account. Please confirm you entered it correctly. Please sign up first to use service.',
      '406': 'You have exceeded the maximum number of requests per day.',
      '423': 'Your account has been locked',
      '401001': 'Account is already active. Log in to use the service.',
      '401006':
        'Unregistered account. Please sign up and create an account to use the service.',
      '401010':
        'An activation email has been sent. Please check inbox of the email you signed up with and activate your account.',
      '401012':
        'Your account has been suspended. Please contact customer service to activate your account.',
      '401013':
        'Your account cannot be activated as it has been deleted. Please create a new account to use the service.',
      '401015':
        'You have exceeded the number of allowed attempts. Please try again in 24 hours.',
      '501002':
        '[Error Code: 501002] Failed to save user data. Please contact customer service to resolve the issue.',
    },
    'submit-order-fwm': {
      timeout:
        'Order submission failed due to file upload time-out. Please try again.',
      'incorrect-format':
        'The uploaded file format is not supported. Supported file formats are only- Image: JPEG; Audio: MP3, WAV; Video: MP4. Please check the uploaded file format and try again. Any arbitrary changes to the file type may restrict the order operation.',
      'key-already-exists':
        'The order number already exists. Create a new order to upload your file.',
    },
  },
  'page-new-password': {
    'reset-account-pass': 'Reset account password',
    'reset-password-email': 'Enter a new password for',
    'new-password': 'New Password',
    'confirm-pass': 'Confirm Password',
    'placeholder-confirm-pass': 'Please re-enter your password',
    'reset-password': 'Reset Password',
  },
  'page-reset-done': {
    title: 'Password changed!',
    description: 'Your password has been changed successfully.',
  },
  'page-verify-email': {
    title: 'Confirm your registration',
    'content-description-1': 'You signed up with',
    'content-description-2':
      'Please click the button below to activate your account.',
    'expired-title': 'Email verification link has expired!',
    'expired-description': 'Your account can not be activated.',
    'expired-button': 'Resend Activation Link',
    'activation-title': 'Account activation is required',
    'activation-description-1': 'We have sent an email to',
    'activation-description-2':
      'Please check your inbox and verify email address in 3 days.',
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
  },
  'error-message': errmsg,
  'expired-dialog': {
    title: 'Your session has expired',
    body: 'Please login again to use SaForus service.',
    button: 'Login',
  },
  'inactive-dialog': {
    title: 'Your session is about to expire due to inactivity',
    description: 'You will be logged out in %{remain} seconds.',
    'button-stay': 'Stay Logged In',
    'button-logout': 'Logout Now',
  },
  'session-timeout': {
    title:
      'Your session has automatically expired after 24 hours of login for security purposes.',
    description: 'Please login again to use SaForus service.',
    'button-login': 'Log In',
  },
  'logout-confirm': {
    title: 'Log Out',
    description: 'Are you sure you want to log out?',
    'button-logout': 'Log Out',
  },
  'announcement-dialog': {
    title: 'New Service Launch Announcement & \n Beta Service Termination',
    greeting: 'Dear valued users,',
    description1:
      'We’re thrilled to announce the launch of our brand-new SaForus service on',
    date: 'Tuesday, March 4',
    description2: '- completely redesigned and upgraded to serve you better!',
    note: 'Please note:',
    'list-item1': 'All existing accounts and data will be permanently deleted',
    'list-item1-desc': 'as we transition to the new system.',
    'list-item2':
      'After the official launch, you’ll need to register a new account',
    'list-item2-desc': 'to access the new service.',
    apology:
      'We apologize for any inconvenience this may cause, but this upgrade ensures a smoother, more efficient service moving\nforward.',
    regards: 'Warm regards,\nThe SaForus Team',
    button: {
      dontshowtoday: 'Do not show again today',
      remindmelater: 'Remind me later',
    },
  },
  'redirection-dialog': {
    title: 'Welcome to SaForus!',
    description:
      'To use this feature, you need to log in.\nWould you like to continue?',
    button: {
      continue: 'Continue',
      cancel: 'Cancel',
    },
  },
  apidoc,
  sidemenu,
  gnbmenu,
  ...watermarking,
  ...watermarkingV2,
  multiDrm,
  myaccount,
  dashboard,
  ...piracyDetection,
  home,
  help,
  billDetail,
  servicePlan,
  ...teamMember,
  userManagement,
  boLogin,
  ...calender,
  boSidemenu,
  boGnbmenu,
  orderManagement,
  userCredit,
  boSettings,
  boInquiry,
  serviceManagement,
  pageHeader,
  adminDashboard,
  ...apiConsole,
  ...apiBo,
  ...apiDocs,
};

export default enTranslation;
