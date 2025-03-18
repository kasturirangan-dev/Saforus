import { TOption } from '@web-workspace/saforus-bo/common/model';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';
import {
  RequestSearchAndList,
  UpdateUserInformationRequest,
  UserInformation,
} from './interface';
import { Languages, TimeZone, formatedCountries } from './constants';

type FieldKeys = 'userRoles' | 'status' | 'teamName' | 'subscription';

interface SearchUserStoreType {
  // this field below use as parameter when call api
  searchQuery: Partial<RequestSearchAndList>;
  setSearchQuery: (query: Partial<RequestSearchAndList>) => void;
  ///////////////////////////////////////////////////

  //  this field below use as option for select box
  userRoles: TOption[];
  status: TOption[];
  teamName: TOption[];
  subscription: TOption[];
  setOptionData: (field: FieldKeys, options: Promise<TOption[]>) => void;
  ////////////////////////////////////////////////////

  // this field below used to store data for table
  users: UserInformation[];
  totalPage: number;
  total: number;
  setUsers: (users: UserInformation[]) => void;
  setTotal: (value: number) => void;
  setTotalPage: (value: number) => void;
  ///////////////////////////////////////////////////

  // this field below used to store data for user detail page
  userInformation: UserInformation | null | undefined;
  userId: number;
  setUserInformation: (data?: UserInformation | null) => void;
  setUserId: (value: number) => void;
  // The service plan name is null and it is received from another api so this
  // function below is only responsible for setting the value for subscriptionPlanName
  // in userInformation
  setUserServicePlanName: (value: string) => void;
  //////////////////////////////////////////////////

  // this field below used to store data for update user information with api
  userInformationRequest: UpdateUserInformationRequest;
  setUserInformationRequest: (data: UpdateUserInformationRequest) => void;
  //////////////////////////////////////////////////

  // this field below used for store options of select language and timezone
  languageOptions: TOption[];
  timezoneOptions: TOption[];
  setLanguageOptions: (options: TOption[]) => void;
  setTimezoneOptions: (options: TOption[]) => void;
  countries: TOption[];
  //////////////////////////////////////////////////

  /* this function below can be used in some situation
  eg: 1.you search for the user's information with input or select       
  2. You go to other pages to do smth else      
  3. You come back to this page and do not want options in select boxes 
  stay the same as the last time you here*/
  resetSearchUserStore: () => void;
}

function searchUserStore() {
  const currentDate = new Date();
  const store: SearchUserStoreType = {
    // set initial value for search's parameter
    searchQuery: {
      // teamId: '0',
      nameOrEmail: '',
      userType: 'ALL',
      // teamName: 'ALL',
      subscriptionPlanName: 'ALL',
      status: 'ALL',
      joinedDateStart: new Date('2023-10-01'), // start of service
      joinedDateEnd: currentDate,
      sortBy: 'EMAIL',
      sortOrder: 'ASC',
      pageNo: 0,
      elementPerPage: 10,
    },
    /////////////////////////////////////////////

    /* set search's parameter when user interact with select box
    or input box */
    setSearchQuery: (query: Partial<RequestSearchAndList>) => {
      SearchUserStore.searchQuery = {
        ...SearchUserStore.searchQuery,
        ...query,
      };
    },
    ////////////////////////////////////////////////////////////

    // set initial option for select boxes
    userRoles: [],
    status: [
      { label: 'All', value: 'ALL' },
      { label: 'Active', value: 'ACTIVE' },
      { label: 'Inactive', value: 'INACTIVE' },
    ],
    teamName: [] as TOption[],
    subscription: [] as TOption[],
    // pay attention to format options to have same structure as TOption!
    setOptionData: async (field, options) => {
      SearchUserStore[field] = await options;
    },
    //////////////////////////////////////

    // set initial user list
    users: [],
    totalPage: 0,
    total: 0,
    // pay attention to the argument users in this function. Format is an array of user
    setUsers: (users) => {
      SearchUserStore.users = users;
    },
    setTotal: (value) => {
      SearchUserStore.total = value;
    },
    setTotalPage: (value) => {
      SearchUserStore.totalPage = value;
    },
    //////////////////////////////////////

    // set initial user information
    userInformation: {
      userId: 0,
      avatar: '',
      id: 0,
      userName: '',
      fullName: '',
      email: '',
      mobileNumber: '',
      hasSubscribedEmailUpdate: false,
      timeZone: '',
      timeZoneName: '',
      status: '',
      currentSessionStartedAt: '',
      countryId: 0,
      countryCode: 0,
      countryShortName: '',
      countryName: '',
      companyId: 0,
      companyName: '',
      companyUrl: '',
      teamName: '',
      teamDescription: '',
      teamOwnerName: '',
      languageCode: '',
      teamId: 0,
      teamOwnerEmail: '',
      userRole: '',
      subscriptionId: 0,
      subscriptionPlanName: '',
    },
    userId: 0,
    setUserId(value) {
      SearchUserStore.userId = value
    },
    setUserInformation(data) {
      SearchUserStore.userInformation = data;
    },
    setUserServicePlanName(value) {
      if (SearchUserStore.userInformation) {
        SearchUserStore.userInformation.subscriptionPlanName = value;
      }
    },
    //////////////////////////////////////

    // set initial user information request
    userInformationRequest: {
      fullName: '',
      mobileNumber: '',
      hasSubscribedEmailUpdate: false,
      timeZone: '',
      timeZoneName: '',
      languageCode: '',
      countryCode: 0,
      countryShortName: '',
      countryName: '',
      companyId: 0,
      companyName: '',
      companyUrl: '',
    },
    setUserInformationRequest(data) {
      SearchUserStore.userInformationRequest = data;
    },
    //////////////////////////////////////

    // set initial option for language and timezone and countries
    languageOptions: Languages,
    timezoneOptions: TimeZone,
    setLanguageOptions(options) {
      SearchUserStore.languageOptions = options;
    },
    setTimezoneOptions(options) {
      SearchUserStore.timezoneOptions = options;
    },
    countries: formatedCountries,
    //////////////////////////////////////

    resetSearchUserStore: () => {
      SearchUserStore.searchQuery = {
        // teamId: "0",
        nameOrEmail: '',
        userType: 'ALL',
        // teamName: 'ALL',
        subscriptionPlanName: 'ALL',
        status: 'ALL',
        sortBy: 'EMAIL',
        sortOrder: 'ASC',
        joinedDateStart: new Date('2023-10-01'),
        joinedDateEnd: currentDate,
        pageNo: 0,
        elementPerPage: 10,
      };
    },
  };
  return store;
}

const SearchUserStore = proxy<SearchUserStoreType>(searchUserStore());
devtools(SearchUserStore, {
  name: 'SEARCH_USER_STORE',
});

export default SearchUserStore;
