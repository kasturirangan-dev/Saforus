import { yupResolver } from '@hookform/resolvers/yup';
import SearchUserStore, {
  ResetPassword,
  UpdateUserInformationRequest,
  UserPlanDetail,
  getSubscriptionDetail,
  ResetPasswordValidationSchema,
  updateUserInfo,
  USER_MANAGEMENT_QUERY_KEY,
  getUserDetail,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { useSnapshot } from 'valtio';

export const InitialData = () => {
  // hooks declaration area
  const { setUserInformation, setUserServicePlanName, userId, setUserId } =
    useSnapshot(SearchUserStore);

  // this field below use to get id of user when start from user detail page
  // and userId in store empty
  const location = useLocation();
  const parts = location.pathname.split('/');
  const id = parts[parts.length - 1];

  // get data for input and select
  const {
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery(
    [USER_MANAGEMENT_QUERY_KEY.USER_DETAIL, userId], // The query key
    () => getUserDetail(userId), // The mock function
    {
      onSuccess(data: any) {
        if (data.data) {
          const responseUserInformation = data.data;
          const userData = {
            ...responseUserInformation,
            userId: responseUserInformation.id,
          };
          setUserInformation(userData);
          // the purpose of this is set value for form after fetch user data success
          const {
            fullName,
            mobileNumber,
            hasSubscribedEmailUpdate,
            timeZone,
            timeZoneName,
            languageCode,
            countryCode,
            countryShortName,
            countryName,
            companyId,
            companyName,
            companyUrl,
          } = responseUserInformation;
          reset({
            fullName,
            mobileNumber,
            hasSubscribedEmailUpdate,
            timeZone,
            timeZoneName,
            languageCode,
            countryCode,
            countryShortName,
            countryName,
            companyId,
            companyName,
            companyUrl,
          });
          //////////////////////////////////////////////////////////

          // The service plan name is null and it is received from another api so this
          // function below is only responsible for setting the value for subscriptionPlanName
          // in userInformation
          // use the teamId property to call the getSubscriptionDetail function
          if (responseUserInformation.teamId) {
            getSubscriptionDetail(responseUserInformation.teamId).then(
              (response: UserPlanDetail) => {
                // get the title of the subscription plan from the response
                const title = response.data[0].title;
                // update the variable with the title
                setUserServicePlanName(title);
              }
            );
          }
        } else {
          setUserInformation({
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
            joinedDate: '',
          });
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  // Use the useMutation hook to create a mutation function and handle the mutation state
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    ({
      userId,
      data,
    }: {
      userId: string | number;
      data: Partial<UpdateUserInformationRequest>;
    }) => updateUserInfo({ userId, data }), // Pass the updateUserInfo function as the mutation function
    {
      // Optionally, pass some options for the mutation hook, such as onSuccess, onError, etc.
      onSuccess: (data, variables) => {
        // Do something when the mutation succeeds, such as showing a success message or updating the UI
        // For example:
        showToast.success("User's information update successfully!");
        refetch();
      },
      onError: (error) => {
        // Do something when the mutation fails, such as showing an error message or logging the error
        // For example:
        console.error(error);
      },
    }
  );

  // useQuery(
  //   'language', // The query key
  //   fetchLanguages, // The mock function
  //   {
  //     onSuccess(data: any) {
  //       setLanguageOptions(data)
  //     },
  //   }
  // );

  // useQuery(
  //   'timezone', // The query key
  //   fetchTimeZone, // The mock function
  //   {
  //     onSuccess(data: any) {
  //       setTimezoneOptions(data)
  //     },
  //   }
  // );

  // Use useQuery to fetch the subscription options

  // this is used for form in user detail
  const { register, control, getValues, watch, reset, setValue } = useForm<
    Partial<UpdateUserInformationRequest>
  >({});

  // this is used for form in reset password for user
  const {
    register: ResetPasswordRegister,
    handleSubmit: ResetPasswordHandleSubmit,
    formState: { errors: ResetPassWordErrors },
    watch: ResetPasswordWatch,
    setError: ResetPasswordSetError,
  } = useForm<Partial<ResetPassword>>({
    resolver: yupResolver(ResetPasswordValidationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  ////////////////////////////////////////////////////////////////////

  // variable declaration area
  ////////////////////////////////////////////////////////////////////

  // useEffect declaration area
  useEffect(() => {
    if (userId === 0) {
      setUserId(Number(id));
    }
  }, [userId]);
  ////////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  const onSubmit = () => {
    mutate({ userId, data: getValues() });
  };
  ////////////////////////////////////////////////////////////////////

  return {
    register,
    control,
    watch,
    onSubmit,
    getValues,
    setValue,
    isLoadingUser: isFetchingUser || isLoadingUser,
    ResetPasswordRegister,
    ResetPasswordHandleSubmit,
    ResetPassWordErrors,
    ResetPasswordWatch,
    ResetPasswordSetError,
    setUserInformation,
  };
};
