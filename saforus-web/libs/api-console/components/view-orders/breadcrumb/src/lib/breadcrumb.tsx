import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BreadcrumbComponent({ breadcrumbData = [] }: any) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        color: 'var(--gray-50)',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
      }}
    >
      {breadcrumbData.map((el: any, index: number) => (
        <Box key={index} sx={{ display: 'flex', textDecoration: 'none' }}>
          {el.path.length > 0 ? (
            <>
              <Link
                to={el.path}
                style={{ textDecoration: 'none', color: 'var(--gray-50)' }}
              >
                <Box>{t(el.title)}</Box>
              </Link>
              {index < breadcrumbData.length - 1 && (
                <Box sx={{ color: 'var(--neutral-800)', mx: '0.3rem' }}>/</Box>
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
