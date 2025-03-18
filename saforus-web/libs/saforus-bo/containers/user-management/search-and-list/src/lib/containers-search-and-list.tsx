import { Backdrop, Box, CircularProgress, Container } from '@mui/material';
import SearchComponent from '@web-workspace/saforus-bo/components/user-management/search-user/search';
import ListComponent from '@web-workspace/saforus-bo/components/user-management/search-user/list';
import useSearchAndListData from './data';
import { useSnapshot } from 'valtio';
import LayoutStore from '@web-workspace/shared/helpers/layout/store';
import { useEffect } from 'react';

export function ContainersUserManagementSearchAndList() {
  // call InitialData to fetch data to store. this data will be used for component
  const {
    register,
    errors,
    onSubmit,
    values,
    control,
    isSuccess,
    isLoadingOptions,
  } = useSearchAndListData();

  // hooks declaration area
  const { setMainLayoutCss, resetMainLayoutCss } = useSnapshot(LayoutStore);
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    setMainLayoutCss({ height: 'fit-content', width: 'fit-content' });

    return () => {
      resetMainLayoutCss();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Backdrop
        open={!isSuccess}
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
      {isLoadingOptions && (
        <SearchComponent
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          values={values}
          control={control}
        />
      )}
      <ListComponent orderLoading={!isSuccess} />
    </Container>
  );
}

export default ContainersUserManagementSearchAndList;
