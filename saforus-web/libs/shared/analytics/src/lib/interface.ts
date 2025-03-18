export const enum TrackingEvent {
  Default = 'Default_Event',

  Watermarking_CreateOrder = 'Watermarking_CreateOrder',
  Watermarking_CreateOrder_Completed = 'Watermarking_CreateOrder_Completed',
  Watermarking_CreateOrder_Failed = 'Watermarking_CreateOrder_Failed',
  Watermarking_CreateOrder_Image = 'Watermarking_CreateOrder_Image',
  Watermarking_CreateOrder_Video = 'Watermarking_CreateOrder_Video',
  Watermarking_CreateOrder_Audio = 'Watermarking_CreateOrder_Video_Completed',
  Watermarking_CreateOrder_Document = 'Watermarking_CreateOrder_Document',

  PD_CreateOrder = 'PD_CreateOrder',
  PD_CreateOrder_Completed = 'PD_CreateOrder_Completed',
  PD_CreateOrder_Failed = 'PD_CreateOrder_Failed',

  User_Nonlogged = 'User_Nonlogged',
  User_Logged = 'User_Logged',
  User_AccountCreated = 'User_AccountCreated',

  Dashboard_ServiceUsage = 'Dashboard_ServiceUsage',
  Dashboard_SearchOrder = 'Dashboard_SearchOrder',
  Watermarking_CreateNewOrder = 'Watermarking_CreateNewOrder',
  Watermarking_ViewOrder = 'Watermarking_ViewOrder',
  PD_CreateNewRequest = 'PD_CreateNewRequest',
  PD_ViewRequest = 'PD_ViewRequest',
  HelpCenter = 'HelpCenter',
  Inquiry = 'Inquiry',
  MyAccount = 'MyAccount',
  TeamMember = 'TeamMember',
}
