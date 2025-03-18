import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import {
  Box,
  Container,
  styled,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import MuiButton from '@mui/material/Button';
import Icon from '@web-workspace/shared/components/widgets/icon';
import ComponentsUserDetail from '@web-workspace/saforus-bo/components/user-management/search-user/user-detail';
import { InitialData } from './data';
import BO_ROUTES from '@web-workspace/saforus-bo/constants/routes';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(MuiButton)(({ theme }) => ({
  padding: 0,
  fontSize: 30,
  fontWeight: '600',
  lineHeight: '30px',
  textTransform: 'none',
  color: '#EFEFF1',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export function ContainersUserManagementUserDetail() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    register,
    control,
    watch,
    onSubmit,
    isLoadingUser,
    getValues,
    setValue,
    setUserInformation,
  } = InitialData();

  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  useEffect(() => {
    setMainLayoutCss({ height: '100vh', width: '100vw' });

    return () => {
      setUserInformation();
      resetMainLayoutCss();
    };
  }, []);
  return (
    <Container maxWidth={false}>
      <Backdrop
        open={isLoadingUser}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          color: 'var(--main-brand)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledButton
              onClick={() => {
                navigate(BO_ROUTES.USER_MANAGEMENT.SEARCH_USERS.path);
              }}
              variant={'text'}
            >
              <Icon
                iconStyle={{ marginRight: '6px' }}
                name="arrow_left"
                size={45}
                color="#5F6D7E"
              />
            </StyledButton>
            <Typography variant="h4">
              {t('userManagement.search-user.user-detail.user-detail')}
            </Typography>
          </Box>
        </Box>
        {!isLoadingUser && (
          <ComponentsUserDetail
            register={register}
            control={control}
            getValues={getValues}
            watch={watch}
            onSubmit={onSubmit}
            setValue={setValue}
          />
        )}
      </Box>
    </Container>
  );
}

export default ContainersUserManagementUserDetail;
