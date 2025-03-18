import {
  BaseResponseAdminUser,
  AdminUserModel,
  ResponseAdminUser,
  AdminType
} from './interface';

export function mockFetchAdminUsers(): Promise<BaseResponseAdminUser> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create some mock data
      const users: AdminUserModel[] = [
        {
          id: '1',
          userId: '1',
          email: 'alice@markany.com',
          fullName: 'Alice',
          role: AdminType.SUPER_ADMIN,
          createdDate: '2021-08-31T07:00:00.000+0000',
          status: 'active',
          isAdmin: true,
        },
        {
          id: '2',
          userId: '2',
          email: 'tes@markany.com',
          fullName: 'Test',
          role: AdminType.ADMIN_CS,
          createdDate: '2021-08-31T07:00:00.000+0000',
          status: 'active',
          isAdmin: false,
        },
        {
          id: '3',
          userId: '3',
          email: 'charlie@markany.com',
          fullName: 'Charlie',
          role: AdminType.ADMIN,
          createdDate: '2021-08-31T07:00:00.000+0000',
          status: 'active',
          isAdmin: false,
        },
      ];
      // Resolve the promise with the mock data
      const response = {
        pageNo: 0,
        elementPerPage: 10,
        totalElements: 3,
        totalPages: 1,
        elementList: users,
      } as ResponseAdminUser;
      resolve({ data: response, httpStatus: 200, resultCode: 'OK' });
    });
  });
};
