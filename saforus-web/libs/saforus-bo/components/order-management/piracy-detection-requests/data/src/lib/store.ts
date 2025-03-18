import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  RequestPiracyDetectionRequests,
  PiracyDetectionRequest,
  HelpTexts,
} from './interface';
import { sub } from 'date-fns';
import { TOption, ServiceType } from '@web-workspace/saforus-bo/common/model';

type FieldKeys =
  | 'expertTypes';

interface PiracyDetectionRequestsStoreType {
  // this field below used for set data for table
  requests: PiracyDetectionRequest[];
  total: number;
  totalPages: number;
  setRequests: (data: PiracyDetectionRequest[]) => void;
  setTotal: (value: number) => void;
  setTotalPages: (value: number) => void;
  ///////////////////////////////////////////////

  // this field below used for set search param for calling api
  searchQuery: Partial<RequestPiracyDetectionRequests>;
  setSearchQuery: (query: Partial<RequestPiracyDetectionRequests>) => void;
  //////////////////////////////////////////////////

  // this field below used for order detail page
  helpText: string | undefined;
  mediaType: string | null;
  localHelpTexts: HelpTexts;
  currentRequestId: string | null;
  setCurrentRequestId: (orderId: string | null) => void;
  currentRequest: PiracyDetectionRequest | null;
  setCurrentRequest: (request: PiracyDetectionRequest | null) => void;
  setMediaType: (mediaType: string) => void;
  ////////////////////////////////////////////////////////
  expertTypes: TOption[];
  setOptionData: (field: FieldKeys, options: TOption[]) => void;
  ///////////////////////////////////////////////////
  resetPiracyDetectionRequestStore: () => void;
}

function PiracyDetectionRequestsStore() {
  const currentDate = new Date();
  const store: PiracyDetectionRequestsStoreType = {
    requests: [],
    total: 0,
    totalPages: 1,
    setRequests: (response) => {
      ViewOrderStore.requests = response;
    },
    setTotal: (value) => {
      ViewOrderStore.total = value;
    },
    setTotalPages: (value) => {
      ViewOrderStore.totalPages = value;
    },
    setMediaType: (mediaType) => {
      ViewOrderStore.mediaType = mediaType;
    },
    searchQuery: {
      // teamId: 0,
      // userId: 0,
      emailIdOrName: '',
      orderNo: '',
      serviceType: ServiceType.PIRACY_DETECTION,
      orderRequestStatus: 'ALL',
      contentType: 'ALL',
      format: 'ALL',
      startDate: sub(currentDate, { days: 30 }),
      endDate: currentDate,
      pageNo: 0,
      elementPerPage: 10,
    },
    setSearchQuery: (query: Partial<RequestPiracyDetectionRequests>) => {
      ViewOrderStore.searchQuery = {
        ...ViewOrderStore.searchQuery,
        ...query,
      };
    },

    currentRequestId: null,
    setCurrentRequestId: (requestId: string | null) => {
      ViewOrderStore.currentRequestId = requestId;
    },
    currentRequest: null,
    setCurrentRequest: (request: PiracyDetectionRequest | null) => {
      ViewOrderStore.currentRequest = request;
    },
    expertTypes: [
      { value: 'true', label: 'Auto Detection' },
      { value: 'false', label: 'Expert Detection' },
    ],
    setOptionData: (field, options) => {
      ViewOrderStore[field] = options;
    },
    resetPiracyDetectionRequestStore: () => {
      ViewOrderStore.total = 0;
      ViewOrderStore.searchQuery = {
        // teamId: 0,
        // userId: null,
        emailIdOrName: '',
        orderNo: '',
        serviceType: ServiceType.PIRACY_DETECTION,
        orderRequestStatus: 'ALL',
        contentType: 'ALL',
        format: 'ALL',
        startDate: sub(currentDate, { days: 30 }),
        endDate: currentDate,
        pageNo: 0,
        elementPerPage: 10,
      };
    },
    mediaType: 'IMG',
    helpText: undefined,
    localHelpTexts: {
      img: [
        {
          keyLabel: 'create-new-request.requirement.img.resolution-in-pixels',
          child: ['create-new-request.requirement.img.resolution-1'],
        },
        {
          keyLabel: 'create-new-request.requirement.img.supported-file-format',
          child: [
            'create-new-request.requirement.img.supported-format-1',
            'create-new-request.requirement.img.supported-format-2',
          ],
        },
        {
          keyLabel: 'create-new-request.requirement.img.not-supported',
          child: [
            'create-new-request.requirement.img.not-supported-1',
            'create-new-request.requirement.img.not-supported-2',
            'create-new-request.requirement.img.not-supported-3',
          ],
        },
      ],
      video: [
        {
          keyLabel: 'create-new-request.requirement.video.play-time',
          child: [
            'create-new-request.requirement.video.play-time-1',
            'create-new-request.requirement.video.play-time-2',
          ],
        },
        {
          keyLabel: 'create-new-request.requirement.video.resolution',
          child: [
            'create-new-request.requirement.video.resolution-1',
            'create-new-request.requirement.video.resolution-2',
          ],
        },
        {
          keyLabel:
            'create-new-request.requirement.video.supported-file-formats',
          child: [
            'create-new-request.requirement.video.supported-file-formats-1',
          ],
        },
        {
          keyLabel: 'create-new-request.requirement.video.supported-codec',
          child: [
            'create-new-request.requirement.video.supported-codec-1',
            'create-new-request.requirement.video.supported-codec-2',
          ],
        },
        {
          keyLabel: 'create-new-request.requirement.video.note',
          child: [
            'create-new-request.requirement.video.note-1',
            'create-new-request.requirement.video.note-2',
          ],
        },
      ],
      audio: [
        {
          keyLabel: 'create-new-request.requirement.audio.play-time',
          child: [
            'create-new-request.requirement.audio.play-time-1',
            'create-new-request.requirement.audio.play-time-2',
          ],
        },
        {
          keyLabel: 'create-new-request.requirement.audio.file-format',
          child: ['create-new-request.requirement.audio.file-format-1'],
        },
        {
          keyLabel: 'create-new-request.requirement.audio.sampling-rate',
          child: [
            'create-new-request.requirement.audio.sampling-rate-1',
            'create-new-request.requirement.audio.sampling-rate-2',
          ],
        },
      ],
    },
  };
  return store;
}

const ViewOrderStore = proxy<PiracyDetectionRequestsStoreType>(
  PiracyDetectionRequestsStore()
);
devtools(ViewOrderStore, {
  name: 'PIRACY_DETECTION_VIEW_ORDER_STORE',
});

export default ViewOrderStore;
