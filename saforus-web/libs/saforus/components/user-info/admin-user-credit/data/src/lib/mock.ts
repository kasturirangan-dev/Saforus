import {
  ResponseUserCredit,
  ResponseUserCreditList,
  UserCreditModel
} from './interface';

export function mockFetchUserCredits(): Promise<ResponseUserCredit> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create some mock data
      const users: UserCreditModel[] = [
        {
          id: '1',
          email: 'alice@markany.com',
          fullName: 'Alice',
          type: 'Super Admin',
          credit: 100,
          totalCredit: 2000,
        },
        {
          id: '2',
          email: 'tes@markany.com',
          fullName: 'Test',
          type: 'Admin',
          credit: 2000,
          totalCredit: 2000,
        },
        {
          id: '3',
          email: 'charlie@markany.com',
          fullName: 'Charlie',
          type: 'Admin cs',
          credit: 0,
          totalCredit: 2000,
        },
      ];
      // Resolve the promise with the mock data
      const response = {
        pageNo: 0,
        elementPerPage: 10,
        totalElements: 3,
        totalPages: 1,
        elementList: users,
      };
      resolve({ data: response, httpStatus: 200, resultCode: 'OK' });
    });
  });
};
