export const enum DialogType {
  CreateSite = 'createSite',
  SentEmail = 'sentEmail',
  DeleteSite = 'deleteSite',
  DeleteStorage = 'deleteStorage',
  Loading = 'loading',
  WatermarkConfirm = 'watermarkConfirm',
  WatermarkContinue = 'watermarkContinue',
  CancelOrder = 'cancelOrder',
  ExpiredToken = 'expiredToken',
  BoExpiredToken = 'BoExpiredToken',
  Cancel = 'cancel',
  PiracyDetectionUploadConfirm = 'piracyDetectionUploadConfirm',
  Inactive = 'inactive',
  Session24Timeout = 'session24Timeout',
  CreateTeam = 'createTeam',
  InviteMember = 'inviteMember',
  RemoveTeamMember = 'removeTeamMember',
  ChangeTeamOwner = 'changeTeamOwner',
  RemoveTeam = 'removeTeam',
  CancelSubscription = 'cancelSubscription',
  UserFeedBack = 'userFeedBack',
  CancelInquiry = 'cancelInquiry',
  FindOrderNumberDialog = 'FindOrderNumberDialog',
  SelectWMImageDialog = 'selectWMImageDialog',
  ChangePassword = 'changePassword',
  VerifyPassword = 'verifyPassword',
  ChangePasswordSuccess = 'changePasswordSuccess',
  IncorrectPassword = 'incorrectPassword',
  LogoutOnSubscribeSuccess = 'logoutOnSubscribeSuccess',
  DeleteAccount = 'deleteAccount',
  ResetPassword = 'resetPassword',
  BoUpdateExpertDetection = 'boUpdateExpertDetection',
  BoDeleteAdminUsers = 'boDeleteAdminUsers',
  BoAddAdminUser = 'boAddAdminUser',
  BoUpdateAdminUser = 'boUpdateAdminUser',
  AvatarEditor = 'avatarEditor',
  ShareDialog = 'shareDialog',
  Notification = 'notification',
  LinkExpired = 'linkExpired',
  WarningFilesLength = 'WarningFilesLength',
  IncorrectImageUpload = 'incorrectImageUpload',
  UpdateBillingAddress = 'updateBillingAddress',
  AcceptInvitation = 'acceptInvitation',
  WatermarkingSubmitError = 'watermarkingSubmitError',
  ConfirmInvitation = 'confirmInvitation',
  SessionExpired = 'sessionExpired',
  ContactSupport = 'notice',
  CsApiCreateApiKey = 'createApiKey',
  CsApiEditApiKey = 'editApiKey',
  CsApiDeleteApiKey = 'deleteApiKey',
  CsApiAvatarEditor = 'CsApiAvatarEditor',
  CsApiChangePassword = 'CsApiChangePassword',
  CsApiVerifyPassword = 'CsApiVerifyPassword',
  CsApiEditProfile = 'CsApiEditProfile',
  CsApiEditTimezone = 'CsApiEditTimezone',
  CommonError = 'CommonError',
  CsApiBoAdminAddUser = 'CsApiBoAdminAddUser',
  CsApiBoAdminEditUser = 'CsApiBoAdminEditUser',
  CsApiBoAddUser = 'CsApiBoAddUser',
  CsApiBoEditUser = 'CsApiBoEditUser',
  DeleteDetectionOrder = 'DeleteDetectionOrder',
  LogoutConfirm = 'LogoutConfirm',
  Announcement = 'Announcement',
  RegisterError = 'RegisterError',
  DeleteOrderConfirm = 'DeleteOrderConfirm',
  GuestRedirect = 'GuestRedirect',
  CsApiPlanInfo = 'CsApiPlanInfo',
  PaymentFail = 'PaymentFail',
  SubscriptionResult = 'SubscriptionResult',
  StorageLimit = 'StorageLimit',
  RequestLimit = 'RequestLimit',
  CsApiFindOrderNumberDialog = 'CsApiFindOrderNumberDialog',
}

export type DialogMappingsType = {
  [DialogType.CreateSite]: () => Promise<
    typeof import('@web-workspace/saforus/components/settings/sites/dialogs/create-site')
  >;
  [DialogType.SentEmail]: () => Promise<
    typeof import('@web-workspace/saforus/components/resetpassword/dialogs/sent-reset')
  >;
  [DialogType.DeleteSite]: () => Promise<
    typeof import('@web-workspace/saforus/components/settings/sites/dialogs/delete-site')
  >;
  [DialogType.DeleteStorage]: () => Promise<
    typeof import('@web-workspace/saforus/components/settings/sites/dialogs/delete-storage')
  >;
  [DialogType.Loading]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/loading')
  >;
  [DialogType.WatermarkConfirm]: () => Promise<
    typeof import('@web-workspace/saforus/components/forensic-watermarking/dialogs/confirm-dialog')
  >;
  [DialogType.CancelOrder]: () => Promise<
    typeof import('@web-workspace/saforus/components/multi-drm/create-order/dialogs/cancel-order')
  >;
  [DialogType.ExpiredToken]: () => Promise<
    typeof import('@web-workspace/saforus/components/layouts/dialogs/expired-token-dialog')
  >;
  [DialogType.Inactive]: () => Promise<
    typeof import('@web-workspace/saforus/components/layouts/dialogs/inactive-dialog')
  >;
  [DialogType.Session24Timeout]: () => Promise<
    typeof import('@web-workspace/saforus/components/layouts/dialogs/session-24-time-out-dialog')
  >;
  [DialogType.LogoutConfirm]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/logout-confirmation')
  >;
  [DialogType.Cancel]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/cancel')
  >;
  [DialogType.StorageLimit]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/storage-limit')
  >;
  [DialogType.RequestLimit]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/request-limit')
  >;
  [DialogType.PiracyDetectionUploadConfirm]: () => Promise<
    typeof import('@web-workspace/saforus/components/piracy-detection/confirm-dialog')
  >;
  [DialogType.CreateTeam]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/create-team')
  >;
  [DialogType.InviteMember]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/invite-member')
  >;
  [DialogType.RemoveTeamMember]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/remove-team-member')
  >;
  [DialogType.ChangeTeamOwner]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/change-team-owner')
  >;
  [DialogType.RemoveTeam]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/remove-team')
  >;
  [DialogType.CancelSubscription]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/cancel-subscription')
  >;
  [DialogType.UserFeedBack]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/user-feedback')
  >;
  [DialogType.CancelInquiry]: () => Promise<
    typeof import('@web-workspace/saforus/components/help/dialogs/cancel-inquiry')
  >;
  [DialogType.FindOrderNumberDialog]: () => Promise<
    typeof import('@web-workspace/saforus/components/piracy-detection/find-order-number-dialog')
  >;
  [DialogType.SelectWMImageDialog]: () => Promise<
    typeof import('@web-workspace/saforus/components/piracy-detection/select-order-image-dialog')
  >;
  [DialogType.DeleteDetectionOrder]: () => Promise<
    typeof import('@web-workspace/saforus/components/piracy-detection/delete-detection-order-dialog')
  >;
  [DialogType.ChangePassword]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/my-account/dialogs/change-password')
  >;
  [DialogType.VerifyPassword]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/my-account/dialogs/current-password')
  >;
  [DialogType.ChangePasswordSuccess]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/my-account/dialogs/change-password-success')
  >;
  [DialogType.IncorrectPassword]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/my-account/dialogs/incorrect-password')
  >;
  [DialogType.LogoutOnSubscribeSuccess]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/service-plan-billing/dialogs/logout-on-subscribe-success')
  >;
  [DialogType.DeleteAccount]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/user-management/search-user/dialogs/delete-user-dialog')
  >;
  [DialogType.ResetPassword]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/user-management/search-user/dialogs/reset-password-dialog')
  >;
  [DialogType.BoExpiredToken]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/layouts/dialogs/session-expired')
  >;
  [DialogType.BoUpdateExpertDetection]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/dialogs/update-expert-detection')
  >;
  [DialogType.BoDeleteAdminUsers]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/settings/admin-user-management/dialogs/delete-admin-users')
  >;
  [DialogType.BoAddAdminUser]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/settings/admin-user-management/dialogs/add-admin-user')
  >;
  [DialogType.BoUpdateAdminUser]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/settings/admin-user-management/dialogs/update-admin-user')
  >;
  [DialogType.WatermarkContinue]: () => Promise<
    typeof import('@web-workspace/saforus/components/forensic-watermarking/dialogs/continue-dialog')
  >;
  [DialogType.AvatarEditor]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/my-account/dialogs/avatar-editor')
  >;
  [DialogType.ShareDialog]: () => Promise<
    typeof import('@web-workspace/saforus/components/forensic-watermarking/dialogs/share-dialog')
  >;
  [DialogType.Notification]: () => Promise<
    typeof import('@web-workspace/saforus/components/layouts/dialogs/notification/dialog')
  >;
  [DialogType.LinkExpired]: () => Promise<
    typeof import('@web-workspace/saforus/components/forensic-watermarking/dialogs/link-expired-dialog')
  >;
  [DialogType.WarningFilesLength]: () => Promise<
    typeof import('@web-workspace/saforus/components/forensic-watermarking/dialogs/warning-files-length')
  >;
  [DialogType.IncorrectImageUpload]: () => Promise<
    typeof import('@web-workspace/saforus-bo/components/service-management/dialogs/incorrect-image-upload')
  >;
  [DialogType.UpdateBillingAddress]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/billing-details/dialogs/update-billing-address')
  >;
  [DialogType.AcceptInvitation]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/accept-invitation')
  >;
  [DialogType.WatermarkingSubmitError]: () => Promise<
    typeof import('@web-workspace/saforus/components/forensic-watermarking/dialogs/submit-error-dialog')
  >;
  [DialogType.ConfirmInvitation]: () => Promise<
    typeof import('@web-workspace/saforus/components/user-info/team-member/dialogs/confirm-invitation')
  >;
  [DialogType.SessionExpired]: () => Promise<
    typeof import('@web-workspace/shared/helpers/layout/dialogs/session-expired')
  >;
  [DialogType.ContactSupport]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/contact-support')
  >;
  [DialogType.GuestRedirect]: () => Promise<
    typeof import('@web-workspace/api-console/components/layouts/dialogs/guest-redirect-dialog')
  >;
  [DialogType.RegisterError]: () => Promise<
    typeof import('@web-workspace/api-console/components/register/form/src/lib/dialogs/error-dialog')
  >;
  [DialogType.CsApiCreateApiKey]: () => Promise<
    typeof import('@web-workspace/api-console/components/api-key/dialogs/create-api-key')
  >;
  [DialogType.CsApiEditApiKey]: () => Promise<
    typeof import('@web-workspace/api-console/components/api-key/dialogs/edit-api-key')
  >;
  [DialogType.CsApiDeleteApiKey]: () => Promise<
    typeof import('@web-workspace/api-console/components/api-key/dialogs/delete-api-key')
  >;
  [DialogType.CsApiAvatarEditor]: () => Promise<
    typeof import('@web-workspace/api-console/components/my-account/dialogs/avatar-editor')
  >;
  [DialogType.CsApiChangePassword]: () => Promise<
    typeof import('@web-workspace/api-console/components/my-account/dialogs/change-password')
  >;
  [DialogType.CsApiVerifyPassword]: () => Promise<
    typeof import('@web-workspace/api-console/components/my-account/dialogs/current-password')
  >;
  [DialogType.CsApiEditProfile]: () => Promise<
    typeof import('@web-workspace/api-console/components/my-account/dialogs/edit-profile')
  >;
  [DialogType.CsApiEditTimezone]: () => Promise<
    typeof import('@web-workspace/api-console/components/my-account/dialogs/edit-timezone')
  >;
  [DialogType.CommonError]: () => Promise<
    typeof import('@web-workspace/shared/components/dialogs/error')
  >;
  [DialogType.CsApiBoAdminAddUser]: () => Promise<
    typeof import('@web-workspace/api-bo/components/admin-dashboard/dialogs/add-user')
  >;
  [DialogType.CsApiBoAdminEditUser]: () => Promise<
    typeof import('@web-workspace/api-bo/components/admin-dashboard/dialogs/edit-user')
  >;
  [DialogType.CsApiBoAddUser]: () => Promise<
    typeof import('@web-workspace/api-bo/components/user-management/dialogs/add-user')
  >;
  [DialogType.CsApiBoEditUser]: () => Promise<
    typeof import('@web-workspace/api-bo/components/user-management/dialogs/edit-user')
  >;
  [DialogType.Announcement]: () => Promise<
    typeof import('@web-workspace/saforus/components/layouts/dialogs/announcement-dialog')
  >;
  [DialogType.DeleteOrderConfirm]: () => Promise<
    typeof import('@web-workspace/api-console/components/view-orders/delete-confirm-dialog')
  >;
  [DialogType.CsApiPlanInfo]: () => Promise<
    typeof import('@web-workspace/api-console/components/myplan/dialogs/plan-info')
  >;
  [DialogType.PaymentFail]: () => Promise<
    typeof import('@web-workspace/api-console/components/myplan/dialogs/payment-fail')
  >;
  [DialogType.SubscriptionResult]: () => Promise<
    typeof import('@web-workspace/api-console/components/myplan/dialogs/subscription-result')
  >;
  [DialogType.CsApiFindOrderNumberDialog]: () => Promise<
    typeof import('@web-workspace/api-console/components/piracy-detection/find-order-number-dialog')
  >;

  // Add more dialog mappings here as needed
};

export const dialogMappings: DialogMappingsType = {
  [DialogType.CreateSite]: () =>
    import(
      '@web-workspace/saforus/components/settings/sites/dialogs/create-site'
    ),
  [DialogType.SentEmail]: () =>
    import(
      '@web-workspace/saforus/components/resetpassword/dialogs/sent-reset'
    ),
  [DialogType.DeleteSite]: () =>
    import(
      '@web-workspace/saforus/components/settings/sites/dialogs/delete-site'
    ),
  [DialogType.DeleteStorage]: () =>
    import(
      '@web-workspace/saforus/components/settings/sites/dialogs/delete-storage'
    ),
  [DialogType.Loading]: () =>
    import('@web-workspace/shared/components/dialogs/loading'),
  [DialogType.WatermarkConfirm]: () =>
    import(
      '@web-workspace/saforus/components/forensic-watermarking/dialogs/confirm-dialog'
    ),
  [DialogType.CancelOrder]: () =>
    import(
      '@web-workspace/saforus/components/multi-drm/create-order/dialogs/cancel-order'
    ),
  [DialogType.ExpiredToken]: () =>
    import(
      '@web-workspace/saforus/components/layouts/dialogs/expired-token-dialog'
    ),
  [DialogType.Inactive]: () =>
    import('@web-workspace/saforus/components/layouts/dialogs/inactive-dialog'),
  [DialogType.Session24Timeout]: () =>
    import(
      '@web-workspace/saforus/components/layouts/dialogs/session-24-time-out-dialog'
    ),
  [DialogType.LogoutConfirm]: () =>
    import('@web-workspace/shared/components/dialogs/logout-confirmation'),
  [DialogType.Cancel]: () =>
    import('@web-workspace/shared/components/dialogs/cancel'),
  [DialogType.StorageLimit]: () =>
    import('@web-workspace/shared/components/dialogs/storage-limit'),
  [DialogType.RequestLimit]: () =>
    import('@web-workspace/shared/components/dialogs/request-limit'),
  [DialogType.PiracyDetectionUploadConfirm]: () =>
    import('@web-workspace/saforus/components/piracy-detection/confirm-dialog'),

  [DialogType.CreateTeam]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/create-team'
    ),
  [DialogType.InviteMember]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/invite-member'
    ),
  [DialogType.RemoveTeamMember]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/remove-team-member'
    ),
  [DialogType.ChangeTeamOwner]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/change-team-owner'
    ),
  [DialogType.RemoveTeam]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/remove-team'
    ),
  [DialogType.CancelSubscription]: () =>
    // eslint-disable-next-line @nx/enforce-module-boundaries
    import('@web-workspace/saforus/components/user-info/cancel-subscription'),
  [DialogType.UserFeedBack]: () =>
    import('@web-workspace/saforus/components/user-info/user-feedback'),
  [DialogType.CancelInquiry]: () =>
    import('@web-workspace/saforus/components/help/dialogs/cancel-inquiry'),
  [DialogType.FindOrderNumberDialog]: () =>
    import(
      '@web-workspace/saforus/components/piracy-detection/find-order-number-dialog'
    ),
  [DialogType.SelectWMImageDialog]: () =>
    import(
      '@web-workspace/saforus/components/piracy-detection/select-order-image-dialog'
    ),
  [DialogType.DeleteDetectionOrder]: () =>
    import(
      '@web-workspace/saforus/components/piracy-detection/delete-detection-order-dialog'
    ),
  [DialogType.ChangePassword]: () =>
    import(
      '@web-workspace/saforus/components/user-info/my-account/dialogs/change-password'
    ),
  [DialogType.VerifyPassword]: () =>
    import(
      '@web-workspace/saforus/components/user-info/my-account/dialogs/current-password'
    ),
  [DialogType.ChangePasswordSuccess]: () =>
    import(
      '@web-workspace/saforus/components/user-info/my-account/dialogs/change-password-success'
    ),
  [DialogType.IncorrectPassword]: () =>
    import(
      '@web-workspace/saforus/components/user-info/my-account/dialogs/incorrect-password'
    ),
  [DialogType.LogoutOnSubscribeSuccess]: () =>
    import(
      '@web-workspace/saforus/components/user-info/service-plan-billing/dialogs/logout-on-subscribe-success'
    ),
  [DialogType.DeleteAccount]: () =>
    import(
      '@web-workspace/saforus-bo/components/user-management/search-user/dialogs/delete-user-dialog'
    ),
  [DialogType.ResetPassword]: () =>
    import(
      '@web-workspace/saforus-bo/components/user-management/search-user/dialogs/reset-password-dialog'
    ),
  [DialogType.BoExpiredToken]: () =>
    import(
      '@web-workspace/saforus-bo/components/layouts/dialogs/session-expired'
    ),
  [DialogType.BoUpdateExpertDetection]: () =>
    import(
      '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/dialogs/update-expert-detection'
    ),
  [DialogType.BoDeleteAdminUsers]: () =>
    import(
      '@web-workspace/saforus-bo/components/settings/admin-user-management/dialogs/delete-admin-users'
    ),
  [DialogType.BoAddAdminUser]: () =>
    import(
      '@web-workspace/saforus-bo/components/settings/admin-user-management/dialogs/add-admin-user'
    ),
  [DialogType.BoUpdateAdminUser]: () =>
    import(
      '@web-workspace/saforus-bo/components/settings/admin-user-management/dialogs/update-admin-user'
    ),
  [DialogType.WatermarkContinue]: () =>
    import(
      '@web-workspace/saforus/components/forensic-watermarking/dialogs/continue-dialog'
    ),
  [DialogType.AvatarEditor]: () =>
    import(
      '@web-workspace/saforus/components/user-info/my-account/dialogs/avatar-editor'
    ),
  [DialogType.ShareDialog]: () =>
    import(
      '@web-workspace/saforus/components/forensic-watermarking/dialogs/share-dialog'
    ),
  [DialogType.Notification]: () =>
    import(
      '@web-workspace/saforus/components/layouts/dialogs/notification/dialog'
    ),
  [DialogType.LinkExpired]: () =>
    import(
      '@web-workspace/saforus/components/forensic-watermarking/dialogs/link-expired-dialog'
    ),
  [DialogType.WarningFilesLength]: () =>
    import(
      '@web-workspace/saforus/components/forensic-watermarking/dialogs/warning-files-length'
    ),
  [DialogType.IncorrectImageUpload]: () =>
    import(
      '@web-workspace/saforus-bo/components/service-management/dialogs/incorrect-image-upload'
    ),
  [DialogType.UpdateBillingAddress]: () =>
    import(
      '@web-workspace/saforus/components/user-info/billing-details/dialogs/update-billing-address'
    ),
  [DialogType.AcceptInvitation]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/accept-invitation'
    ),
  [DialogType.WatermarkingSubmitError]: () =>
    import(
      '@web-workspace/saforus/components/forensic-watermarking/dialogs/submit-error-dialog'
    ),
  [DialogType.ConfirmInvitation]: () =>
    import(
      '@web-workspace/saforus/components/user-info/team-member/dialogs/confirm-invitation'
    ),
  [DialogType.SessionExpired]: () =>
    import('@web-workspace/shared/helpers/layout/dialogs/session-expired'),
  [DialogType.ContactSupport]: () =>
    import('@web-workspace/shared/components/dialogs/contact-support'),

  [DialogType.CsApiCreateApiKey]: () =>
    import(
      '@web-workspace/api-console/components/api-key/dialogs/create-api-key'
    ),
  [DialogType.RegisterError]: () =>
    import(
      '@web-workspace/api-console/components/register/form/src/lib/dialogs/error-dialog'
    ),
  [DialogType.GuestRedirect]: () =>
    import(
      '@web-workspace/api-console/components/layouts/dialogs/guest-redirect-dialog'
    ),
  [DialogType.CsApiEditApiKey]: () =>
    import(
      '@web-workspace/api-console/components/api-key/dialogs/edit-api-key'
    ),

  [DialogType.CsApiDeleteApiKey]: () =>
    import(
      '@web-workspace/api-console/components/api-key/dialogs/delete-api-key'
    ),
  [DialogType.CsApiAvatarEditor]: () =>
    import(
      '@web-workspace/api-console/components/my-account/dialogs/avatar-editor'
    ),
  [DialogType.CsApiChangePassword]: () =>
    import(
      '@web-workspace/api-console/components/my-account/dialogs/change-password'
    ),
  [DialogType.CsApiVerifyPassword]: () =>
    import(
      '@web-workspace/api-console/components/my-account/dialogs/current-password'
    ),
  [DialogType.CsApiEditProfile]: () =>
    import(
      '@web-workspace/api-console/components/my-account/dialogs/edit-profile'
    ),
  [DialogType.CsApiEditTimezone]: () =>
    import(
      '@web-workspace/api-console/components/my-account/dialogs/edit-timezone'
    ),
  [DialogType.CsApiBoAdminAddUser]: () =>
    // eslint-disable-next-line @nx/enforce-module-boundaries
    import('@web-workspace/api-bo/components/admin-dashboard/dialogs/add-user'),
  [DialogType.CsApiBoAdminEditUser]: () =>
    // eslint-disable-next-line @nx/enforce-module-boundaries
    import(
      '@web-workspace/api-bo/components/admin-dashboard/dialogs/edit-user'
    ),
  [DialogType.CsApiBoAddUser]: () =>
    // eslint-disable-next-line @nx/enforce-module-boundaries
    import('@web-workspace/api-bo/components/user-management/dialogs/add-user'),
  [DialogType.CsApiBoEditUser]: () =>
    // eslint-disable-next-line @nx/enforce-module-boundaries
    import(
      '@web-workspace/api-bo/components/user-management/dialogs/edit-user'
    ),
  [DialogType.CommonError]: () =>
    import('@web-workspace/shared/components/dialogs/error'),
  [DialogType.Announcement]: () =>
    import(
      '@web-workspace/saforus/components/layouts/dialogs/announcement-dialog'
    ),
  [DialogType.DeleteOrderConfirm]: () =>
    import(
      '@web-workspace/api-console/components/view-orders/delete-confirm-dialog'
    ),
  [DialogType.CsApiPlanInfo]: () =>
    import('@web-workspace/api-console/components/myplan/dialogs/plan-info'),
  [DialogType.PaymentFail]: () =>
    import('@web-workspace/api-console/components/myplan/dialogs/payment-fail'),
  [DialogType.SubscriptionResult]: () =>
    import(
      '@web-workspace/api-console/components/myplan/dialogs/subscription-result'
    ),
  [DialogType.CsApiFindOrderNumberDialog]: () =>
    import(
      '@web-workspace/api-console/components/piracy-detection/find-order-number-dialog'
    ),
  // Add more dialog mappings here as needed
};
