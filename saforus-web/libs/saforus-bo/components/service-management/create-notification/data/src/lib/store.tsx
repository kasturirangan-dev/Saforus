/* 
Note:
(1) formData is defined and used as parameter for api. So the question is why i have to 
define while i can simply define it at api func. The answer is when append image file to field 
banner the field requestCreateNotification.banner is used here at proxy state and it will be 
considered as string instead a File. By save formData when form being edited it will work fine.
(2) Considering remove
(3) to update notice there is a version to control. 
eg a notice have just create will have version is 0 and a content will have version is 0. The
first time you update a exist content you just have to pass version of notice and content(This case is noticeVer
  0 and noticeContentVer 0). after update successfully now noticeVer is 1 and noticeContent is 1. This also mean 
  each time content of notice update the notice ver plus 1 to current notice ver
  timeUpdate noticeVer contentVer
    0           0         0(content for en)
    1           1         1(content for en)
    2           2         0(content for ko)
    3           3         2(content for en)
    4           4         1(content for ko)
    ...
(4) this is used to map data for form. Content for English with correct field for English and same for Korean
*/

import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  FormMode,
  Notice,
  NotificationForm,
  NotificationLang,
  NotificationStatus,
  NotificationType,
  RequestCreateNotification,
  ResponseGetNotificationContent,
} from './interface';
import { TOption } from '@web-workspace/saforus-bo/common/model';

type FieldKeys = 'typeOption' | 'pageOption';

type State = {
  formData: FormData | undefined; // (1)
  notificationForm: NotificationForm;
  requestCreateNotification: RequestCreateNotification; // (2)
  responseGetNotificationContent: ResponseGetNotificationContent;
  typeOption: TOption[];
  pageOption: TOption[];
  formLanguage: NotificationLang;
  formState: FormMode;
  [key: string]: any;
};

type Actions = {
  setNotificationForm: (notificationForm: NotificationForm) => void;
  setRequestCreateNotification: () => void; // (2)
  setResponseGetNotificationContent: (
    response: ResponseGetNotificationContent
  ) => void;
  saveFormData: (formData: FormData) => void; // (1)
  setOptionData: (field: FieldKeys, options: TOption[]) => void;
  setFormLanguage: (value: NotificationLang) => void;
  onSetFormLanguage: () => void;
  setFormStatus: (state: FormMode) => void;
  setCurrentNoticeVersion: (increaseContentVersion: boolean) => void;
  resetState: () => void;
};

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

export const initialState: State = {
  requestCreateNotification: {
    type: NotificationType.Notice,
    title: '',
    // titleInEnglish: '',
    // titleInKorean: '',
    banner: undefined,
    showDoNotViewButton: true,
    showBanner: true,
    message: '',
    // descriptionInEnglish: '',
    // descriptionInKorean: '',
    // editor: '',
    status: NotificationStatus.Hide,
    displayedOn: undefined,
    startTime: currentDate,
    endTime: currentDate,
    lang: NotificationLang.EN,
    noticePeriodInvalid: true,
    statusInvalid: false,
    description: '',
  },
  formLanguage: NotificationLang.EN,
  typeOption: [],
  pageOption: [],
  notificationForm: {
    id: '',
    type: NotificationType.Notice,
    title: '',
    imgFile: null,
    isDoNotViewButtonShow: true,
    isBannerShow: true,
    description: '',
    editor: '',
    status: undefined,
    showOnPage: undefined,
    startNotice: currentDate,
    endNotice: currentDate,
    titleInEnglish: '',
    titleInKorean: '',
    descriptionInEnglish: '',
    descriptionInKorean: '',
    noticePeriodInvalid: false,
    summary: '',
    filePreview: '',
    filePreviewEn: undefined,
    filePreviewKo: undefined,
    noticeVersion: 0,
    noticeContentVersionEn: 0,
    noticeContentVersionKo: 0,
    contentEnId: undefined,
    contentKoId: undefined,
    noticeContentVersion: undefined,
    contentId: undefined,
    updatedAt: currentDate
  },
  formData: undefined, // (1)
  formState: FormMode.Create,
  responseGetNotificationContent: {
    transactionId: null,
    httpStatus: null,
    resultCode: 0,
    resultMsg: null,
    resourceId: null,
    resourceURL: null,
    data: [],
  },
};

const CreateNotificationStore = proxy<State & Actions>(createStore());

function createStore() {
  const store: State & Actions = {
    ...initialState,
    setNotificationForm(notificationForm) {
      CreateNotificationStore.notificationForm = {
        ...CreateNotificationStore.notificationForm,
        ...notificationForm,
      };
      if (CreateNotificationStore.formLanguage === NotificationLang.EN) {
        CreateNotificationStore.notificationForm.titleInEnglish =
          notificationForm.title;
        CreateNotificationStore.notificationForm.descriptionInEnglish =
          notificationForm.description;
      } else {
        CreateNotificationStore.notificationForm.titleInKorean =
          notificationForm.title;
        CreateNotificationStore.notificationForm.descriptionInKorean =
          notificationForm.description;
      }
      CreateNotificationStore.setRequestCreateNotification();
    },
    setCurrentNoticeVersion(increaseContentVersion) {
      CreateNotificationStore.notificationForm.noticeVersion += 1;
      CreateNotificationStore.formData?.set(
        'noticeVersion',
        `${CreateNotificationStore.notificationForm.noticeVersion}`
      );
      if (
        CreateNotificationStore.notificationForm.noticeContentVersion &&
        increaseContentVersion
      )
        CreateNotificationStore.notificationForm.noticeContentVersion += 1;
      CreateNotificationStore.formData?.set(
        'noticeContentVersion',
        `${CreateNotificationStore.notificationForm.noticeContentVersion}`
      );
    },
    setResponseGetNotificationContent(response) {
      const contentInEnglish = response.data.find(
        (content) => content.lang === NotificationLang.EN
      );
      const contentInKorean = response.data.find(
        (content) => content.lang === NotificationLang.KO
      );
      CreateNotificationStore.notificationForm.title = contentInEnglish?.title;
      CreateNotificationStore.notificationForm.titleInEnglish =
        contentInEnglish?.title;
      CreateNotificationStore.notificationForm.titleInKorean =
        contentInKorean?.title;
      CreateNotificationStore.notificationForm.description =
        contentInEnglish?.message;
      CreateNotificationStore.notificationForm.descriptionInEnglish =
        contentInEnglish?.message;
      CreateNotificationStore.notificationForm.descriptionInKorean =
        contentInKorean?.message;
      CreateNotificationStore.notificationForm.noticeContentVersionEn =
        contentInEnglish?.version;
      CreateNotificationStore.notificationForm.noticeContentVersionKo =
        contentInKorean?.version;
      CreateNotificationStore.notificationForm.contentEnId =
        contentInEnglish?.id;
      CreateNotificationStore.notificationForm.contentKoId =
        contentInKorean?.id;
      CreateNotificationStore.notificationForm.contentId = contentInEnglish?.id;
      CreateNotificationStore.notificationForm.noticeContentVersion =
        contentInEnglish?.version;
      CreateNotificationStore.notificationForm.filePreview =
        contentInEnglish?.bannerUrl;
      CreateNotificationStore.notificationForm.filePreviewEn =
        contentInEnglish?.bannerUrl;
      CreateNotificationStore.notificationForm.filePreviewKo =
        contentInKorean?.bannerUrl;
    },
    saveFormData(formData) {
      // (1)
      CreateNotificationStore.formData = formData;
    },
    setRequestCreateNotification() {
      // (2)
      const {
        title,
        description,
        isDoNotViewButtonShow,
        isBannerShow,
        showOnPage,
        startNotice,
        endNotice,
        status,
        type,
        noticePeriodInvalid,
        summary,
      } = CreateNotificationStore.notificationForm;
      CreateNotificationStore.requestCreateNotification.type = type;
      CreateNotificationStore.requestCreateNotification.description = summary;
      CreateNotificationStore.requestCreateNotification.title = title;
      CreateNotificationStore.requestCreateNotification.message = description;
      CreateNotificationStore.requestCreateNotification.displayedOn =
        showOnPage;
      CreateNotificationStore.requestCreateNotification.lang =
        CreateNotificationStore.formLanguage;
      CreateNotificationStore.requestCreateNotification.showDoNotViewButton =
        isDoNotViewButtonShow;
      CreateNotificationStore.requestCreateNotification.showBanner =
        isBannerShow;
      CreateNotificationStore.requestCreateNotification.startTime = startNotice;
      CreateNotificationStore.requestCreateNotification.endTime = endNotice;
      CreateNotificationStore.requestCreateNotification.noticePeriodInvalid =
        noticePeriodInvalid;
      CreateNotificationStore.requestCreateNotification.status = status;
    },
    setOptionData: (field: FieldKeys, options) => {
      CreateNotificationStore[field] = options;
    },
    setFormLanguage(value) {
      CreateNotificationStore.formLanguage = value;
      CreateNotificationStore.onSetFormLanguage();
    },
    onSetFormLanguage() {
      CreateNotificationStore.notificationForm.title =
        CreateNotificationStore.formLanguage === NotificationLang.EN
          ? CreateNotificationStore.notificationForm.titleInEnglish
          : CreateNotificationStore.notificationForm.titleInKorean;

      CreateNotificationStore.notificationForm.description =
        CreateNotificationStore.formLanguage === NotificationLang.EN
          ? CreateNotificationStore.notificationForm.descriptionInEnglish
          : CreateNotificationStore.notificationForm.descriptionInKorean;

      CreateNotificationStore.notificationForm.contentId =
        CreateNotificationStore.formLanguage === NotificationLang.EN
          ? CreateNotificationStore.notificationForm.contentEnId
          : CreateNotificationStore.notificationForm.contentKoId;

      CreateNotificationStore.notificationForm.noticeContentVersion =
        CreateNotificationStore.formLanguage === NotificationLang.EN
          ? CreateNotificationStore.notificationForm.noticeContentVersionEn
          : CreateNotificationStore.notificationForm.noticeContentVersionKo;

      CreateNotificationStore.notificationForm.filePreview =
        CreateNotificationStore.formLanguage === NotificationLang.EN
          ? CreateNotificationStore.notificationForm.filePreviewEn
          : CreateNotificationStore.notificationForm.filePreviewKo;
    },
    setFormStatus(state) {
      CreateNotificationStore.formState = state;
    },
    resetState() {
      CreateNotificationStore.formLanguage = NotificationLang.EN;
      CreateNotificationStore.typeOption = [];
      CreateNotificationStore.pageOption = [];
      CreateNotificationStore.notificationForm = {
        id: '',
        type: NotificationType.Notice,
        title: '',
        imgFile: null,
        isDoNotViewButtonShow: true,
        isBannerShow: true,
        description: '',
        editor: '',
        status: undefined,
        showOnPage: undefined,
        startNotice: currentDate,
        endNotice: currentDate,
        titleInEnglish: '',
        titleInKorean: '',
        descriptionInEnglish: '',
        descriptionInKorean: '',
        noticePeriodInvalid: false,
        summary: '',
        filePreview: '',
        filePreviewEn: undefined,
        filePreviewKo: undefined,
        noticeVersion: 0,
        noticeContentVersionEn: 0,
        noticeContentVersionKo: 0,
        contentEnId: undefined,
        contentKoId: undefined,
        noticeContentVersion: undefined,
        contentId: undefined,
        updatedAt: currentDate
      };
      CreateNotificationStore.formState = FormMode.Create;
    },
  };
  return store;
}

devtools(CreateNotificationStore, { name: 'CREATE_NOTIFICATION' });

export default CreateNotificationStore;
