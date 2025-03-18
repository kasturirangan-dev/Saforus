import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pxToVw } from '@web-workspace/saforus/common/utils';

function BreadcrumbComponent({ BreadcrumbData = [] }: any) {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      fontSize={pxToVw("14px")}
      lineHeight={pxToVw("20px")}
      letterSpacing={pxToVw("-0.1px")}
      color="var(--gray-50)"
    >
      {BreadcrumbData.map((el: any, index: number) => (
        <Box key={index} display="flex" sx={{ textDecoration: 'none' }}>
          {el.path.length > 0 ? (
            <>
              <Link
                to={el.path}
                style={{ textDecoration: 'none', color: 'var(--gray-50)' }}
              >
                <Box>{t(el.title)}</Box>
              </Link>
              {index < BreadcrumbData.length - 1 && (
                <Box
                  color="var(--neutral-750)"
                  width={pxToVw(20)}
                  height={pxToVw(20)}
                  mx={pxToVw(1)}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight={700}
                >
                  /
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ color: 'var(--purple-600)' }}>{t(el.title)}</Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default BreadcrumbComponent;
