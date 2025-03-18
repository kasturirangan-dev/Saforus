import TeamDetail from '@web-workspace/saforus/components/user-info/team-member/team-detail';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { Container } from '@mui/material';

export function TeamDetailContainer() {
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <TeamDetail />
    </Container>
  );
}

export default TeamDetailContainer;
