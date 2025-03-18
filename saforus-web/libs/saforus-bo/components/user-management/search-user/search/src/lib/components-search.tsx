import { Box, FormControl, InputBase, Typography, styled } from '@mui/material';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SearchUserStore, {
  RequestSearchAndList,
} from '@web-workspace/saforus-bo/components/user-management/search-user/data';
import SearchIcon from '@mui/icons-material/Search';
import { useSnapshot } from 'valtio';
import Autocomplete from '@web-workspace/shared/components/widgets/autocomplete';
import DatePicker from '@web-workspace/shared/components/widgets/date-picker';
import CommonStore from '@web-workspace/saforus-bo/common/data';

// styled-components declaration area
const Label = styled('label')({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'left',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '20px',
  display: 'block',
});

const GridSearchBox = styled(Box)`
  display: grid;
  grid-template-areas:
    'userTypeSelect . .'
    'subscriptionAndStatus joinedDateSelect searchButton';
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const SubGrid = styled(Box)`
  display: grid;
  grid-template-areas: 'subscriptionSelect statusSelect';
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.5rem;
  grid-area: subscriptionAndStatus;
`;
/////////////////////////////////////////////////////////////////////

/* eslint-disable-next-line */
export interface SearchProps {
  register: UseFormRegister<Partial<RequestSearchAndList>>;
  values: Partial<RequestSearchAndList>;
  errors: FieldErrors<Partial<RequestSearchAndList>>;
  onSubmit: () => void;
  control: Control<Partial<RequestSearchAndList>>;
}

export function Search(props: SearchProps) {
  // hooks declaration area
  const { t } = useTranslation();

  const { subscription, searchQuery } = useSnapshot(SearchUserStore);
  const { userRoleList: userRoles, userTeamStatusList: status } =
    useSnapshot(CommonStore);
  ////////////////////////////////////////////////////////////////////

  // react function or function component declaration area
  const UserTypeSelect: React.FC = () => {
    return (
      <Box gridArea={'userTypeSelect'}>
        <Controller
          name="userType"
          control={props.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              title={`${t('userManagement.search-user.button.user-type')}`}
              options={userRoles}
              defaultValue={
                userRoles.find(
                  (el) => `${el.value}` === `${searchQuery?.userType}`
                ) || userRoles[0]
              }
              inputStyle={{
                width: '100%',
              }}
              onChange={(event, newValue) =>
                field.onChange(newValue?.value || 'ALL')
              }
            />
          )}
        />
      </Box>
    );
  };

  const SubscriptionSelect: React.FC = () => {
    return (
      <Box gridArea={'subscriptionSelect'}>
        <Controller
          name="subscriptionPlanName"
          control={props.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              title={`${t('userManagement.search-user.button.subscription')}`}
              options={subscription}
              defaultValue={
                subscription.find(
                  (el) =>
                    `${el.value}` === `${searchQuery?.subscriptionPlanName}`
                ) || subscription[0]
              }
              inputStyle={{
                width: '100%',
              }}
              onChange={(event, newValue) =>
                field.onChange(newValue?.value || 'ALL')
              }
            />
          )}
        />
      </Box>
    );
  };

  const StatusSelect: React.FC = () => {
    return (
      <Box gridArea={'statusSelect'}>
        <Controller
          name="status"
          control={props.control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              title={`${t('userManagement.search-user.button.status')}`}
              options={status}
              defaultValue={
                status.find(
                  (el) => `${el.value}` === `${searchQuery?.status}`
                ) || status[0]
              }
              inputStyle={{
                width: '100%',
              }}
              onChange={(event, newValue) =>
                field.onChange(newValue?.value || 'ALL')
              }
            />
          )}
        />
      </Box>
    );
  };

  const JoinedDateSelect: React.FC = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        gridArea={'joinedDateSelect'}
      >
        <Label sx={{ fontWeight: 500 }}>
          {t('userManagement.search-user.button.joined-date')}
        </Label>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <Controller
            name="joinedDateStart"
            control={props.control}
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => {
                  if (date instanceof Date && !isNaN(date as any)) {
                    field.onChange(date);
                  } else {
                    field.onChange(null);
                  }
                }}
                value={field.value || null}
              />
            )}
          />
          <Typography
            sx={{
              textAlign: 'center',
              pt: '0.5rem',
            }}
          >
            ~
          </Typography>
          <Controller
            name="joinedDateEnd"
            control={props.control}
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => {
                  if (date instanceof Date && !isNaN(date as any)) {
                    field.onChange(date);
                  } else {
                    field.onChange(null);
                  }
                }}
                value={field.value || null}
              />
            )}
          />
        </Box>
      </Box>
    );
  };
  ////////////////////////////////////////////////////////////////////
  // useEffect declaration area
  ////////////////////////////////////////////////////////////////////
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Title and input search */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" color={'var(--gray-900)'}>
          {t('userManagement.search-user.title')}
        </Typography>
        <FormControl>
          <Controller
            name={'nameOrEmail'}
            control={props.control}
            render={({ field }) => (
              <Box
                sx={{
                  display: 'flex',
                  width: '25vw',
                  height: '56px',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '100px',
                  border: '1px solid var(--neutral-700, #DAE0E6)',
                  boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)',
                  padding: '0.5rem 0.5rem 0.5rem 1rem',
                }}
              >
                <SearchIcon sx={{ width: '35px', color: 'var(--gray-25)' }} />
                <InputBase
                  sx={{
                    ml: 1, flex: 1, fontSize: '14px', '& input:-webkit-autofill': {
                      '-webkit-box-shadow': '0 0 0 1000px white inset', // Fix for Chrome autofill background blue color
                    }, }}
                  placeholder={
                    t(
                      'userManagement.search-user.button.place-holder'
                    ) as string
                  }
                  inputProps={{ 'aria-label': 'Order No' }}
                  {...field}
                />
                <LoadingButton
                  type="button"
                  onClick={() => props.onSubmit()}
                  sx={{
                    my: '2.3rem',
                    py: '0.5rem',
                    ml: '-1rem',
                    borderRadius: '100px',
                  }}
                >
                  {t('userManagement.search-user.button.search')}
                </LoadingButton>
              </Box>
            )}
          />
        </FormControl>
      </Box>
      {/*  */}
      {/* select box area */}
      <Box
        sx={{
          display: 'flex',
          padding: '1.5rem',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.5rem',
          borderRadius: '0.5rem',
          background: 'var(--base-white)',
        }}
      >
        <Typography variant="h6" color={'var(--gray-700)'}>
          {t('userManagement.search-user.search-users')}
        </Typography>
        <form>
          <GridSearchBox>
            <UserTypeSelect />
            {/* <TeamNameSelect /> */}
            <SubGrid>
              <SubscriptionSelect />
              <StatusSelect />
            </SubGrid>
            <JoinedDateSelect />
            <Box
              gridArea={'searchButton'}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                pt: '0.5rem',
              }}
            >
              <Box>
                <LoadingButton
                  type="button"
                  sx={{
                    padding: '8px 16px',
                  }}
                  onClick={() => props.onSubmit()}
                >
                  {t('userManagement.search-user.button.search')}
                </LoadingButton>
              </Box>
            </Box>
          </GridSearchBox>
        </form>
      </Box>
      {/*  */}
    </Box>
  );
}

export default Search;
