import React, { useEffect } from 'react';
import { Box, styled } from '@mui/material';
import LoginForm from '@web-workspace/api-console/components/login/form';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import RouteStore from '@web-workspace/shared/helpers/routes';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  backgroundColor: 'var(--base-white)',
}));

const ApiConsleLoginContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { returnUrl } = useSnapshot(RouteStore);

  // non-logged user direct to login path from returnUrl
  useEffect(() => {
    if (returnUrl) {
      searchParams.set('returnUrl', returnUrl);
      setSearchParams(searchParams, { replace: true });
      RouteStore.clearRouteStore();
    }
  }, [returnUrl]);

  return (
    <StyledBox>
      <LoginForm />
    </StyledBox>
  );
};

export default React.memo(ApiConsleLoginContainer);
