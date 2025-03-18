import { Box, Grid, Typography } from '@mui/material';
import Icon from '@web-workspace/shared/components/widgets/icon';
import Tooltip from '@web-workspace/shared/components/widgets/tooltip';

export interface FileFormatViewProps {
  title: string;
  fileFormats: string[];
  tooltipTitle: string;
  tooltipContent: string;
}

const FileFormatView = ({
  title,
  fileFormats,
  tooltipTitle,
  tooltipContent,
}: FileFormatViewProps) => {
  return (
    <Grid container columns={3}>
      <Grid
        item
        xs={1}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          backgroundColor: 'var(--neutral-600)',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          flexDirection: 'column',
          border: '1px solid var(--neutral-750)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1.125rem',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography
            color={'var(--gray-700)'}
            variant="body2"
            fontWeight={500}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={2}
        alignItems="center"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--base-white)',
          border: '1px solid var(--neutral-750)',
          borderLeft: 'none',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 1rem',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem',
            }}
          >
            {fileFormats.map((format, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Typography
                  color={'var(--gray-700)'}
                  variant="subtitle2"
                  fontWeight={500}
                >
                  {format}
                </Typography>
              </Box>
            ))}
          </Box>
          <Tooltip
            title={tooltipTitle}
            titleHeader={tooltipTitle}
            description={tooltipContent}
            children={
              <Icon size={20} name="information" color={'var(--gray-25)'} />
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileFormatView;
