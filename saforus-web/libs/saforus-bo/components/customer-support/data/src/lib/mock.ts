import { isNotEmpty } from '@web-workspace/shared/helpers/strings';
import { Inquiry, InquiryStatus, RequestMyInquiries, ResponseInquiries } from './interface';

const mockInquiries: Inquiry[] = [
  {
    id: '1131233',
    category: 'USE_OF_SERVICE',
    inquiryNo: '1131233',
    title: 'Test inquiry 1',
    createdDate: '2011-10-05T14:48:00.000Z',
    createdBy: 'npham@markany.com',
    status: 'ANSWERED',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktopLorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop',
  },
  {
    id: '1231313',
    category: 'OTHERS',
    inquiryNo: '1131233',
    title: 'Test inquiry 2',
    createdDate: '2023-08-27T08:32:17.937Z',
    createdBy: 'npham@markany.com',
    status: 'CANCELED',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktopLorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop',
  },
  {
    id: '1231314',
    category: 'SERVICE_PLAN_PAYMENT_RELATED',
    inquiryNo: '1231314',
    title: 'Test inquiry 3',
    createdDate: '2023-08-27T08:32:17.937Z',
    createdBy: 'npham@markany.com',
    status: 'IN_QUEUE',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktopLorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop',
  }
];

const responseInquiries: ResponseInquiries = {
  pageNo: 0,
  elementPerPage: 10,
  totalElements: 3,
  totalPages: 1,
  elementList: mockInquiries
};

export function mockFetchInquiryList(
  query?: Partial<RequestMyInquiries>
): Promise<ResponseInquiries> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (query && Object.keys(query).length > 0) {
        return resolve(
          responseInquiries
        );
      }
      return resolve(responseInquiries);
    }, 1000);
  });
}

export function mockCancelInquiry(
  inquiryId: string
): Promise<InquiryDetail | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isNotEmpty(inquiryId)) {
        const inquiryIndex = mockInquiries.findIndex((inquiry) => inquiry.id === inquiryId);
        if (inquiryIndex !== -1) {
          const inquiry = mockInquiries[inquiryIndex];
          inquiry.status = InquiryStatus.CANCELED;
          mockInquiries[inquiryIndex] = inquiry;

          return resolve(inquiry as InquiryDetail);
        } else {
          return resolve(null);
        }
      } else {
        return resolve(null);
      }

    }, 1000);
  });
}

export function mockFetchStatus(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'ALL',
          desc: 'All'
        },
        {
          id: 'ANSWERED',
          desc: 'Answered'
        },
        {
          id: 'IN_PROGRESS',
          desc: 'In Progress'
        },
        {
          id: 'IN_QUEUE',
          desc: 'In Queue'
        },
        {
          id: 'CANCELED',
          desc: 'Canceled'
        }
      ]);
    }, 1000);
  });
}

export function mockFetchCategories(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'ALL',
          desc: 'All',
        },
        {
          id: 'USE_OF_SERVICE',
          desc: 'Use of Service',
        },
        {
          id: 'SERVICE_TECHNOLOGY',
          desc: 'Service technology',
        },
        {
          id: 'SERVICE_BUG_AND_REPORT',
          desc: 'Service bug or error report',
        },
        {
          id: 'SERVICE_PLAN_PAYMENT_RELATED',
          desc: 'Service plan & payment',
        },
        {
          id: 'TEAM_AND_PERSONAL_ACCOUNT',
          desc: 'Team and account',
        },
        {
          id: 'OTHERS',
          desc: 'Others',
        }
      ]);
    }, 1000);
  });
}

