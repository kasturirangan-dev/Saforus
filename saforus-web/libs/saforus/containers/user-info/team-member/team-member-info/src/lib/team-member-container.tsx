import TeamMemberInfo from '@web-workspace/saforus/components/user-info/team-member/team-member-info';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { Container, Backdrop, CircularProgress } from '@mui/material';
import CommonStore from '@web-workspace/saforus/common/data';

export function TeamMemberContainer() {
  const { isLoading } = useSnapshot(CommonStore);
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Backdrop
        open={isLoading}
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

      {<TeamMemberInfo />}
    </Container>
  );
}

export default TeamMemberContainer;
