import { Box, Divider, Stack, styled, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import {
  LocalHelpText,
  PiracyDetectionRequestsStore,
} from '@web-workspace/saforus-bo/components/order-management/piracy-detection-requests/data';
import { MEDIA_TYPE } from '@web-workspace/saforus-bo/common/model';

const StyledTContentTable = styled(Typography)(({ theme }) => ({
  color: 'var(--gray-700)',
  padding: '1rem',
}));
const LocalHelpTextView = () => {
  const { localHelpTexts, mediaType } = useSnapshot(
    PiracyDetectionRequestsStore
  );
  const { t } = useTranslation();

  const textContents = useMemo(() => {
    let result: LocalHelpText[] = [];
    if (mediaType === MEDIA_TYPE.IMG) {
      result = [...localHelpTexts.img];
    } else if (mediaType === MEDIA_TYPE.VIDEO) {
      result = localHelpTexts.video;
    } else {
      result = localHelpTexts.audio;
    }
    return result;
  }, [mediaType]);

  return (
    <Box
      sx={{
        border: '1px solid #EAEBF0',
        marginTop: '1rem',
        borderRadius: '5px',
      }}
    >
      <Stack>
        {textContents.map((content, index) => (
          <Box key={index}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box>
                <StyledTContentTable
                  sx={{
                    fontWeight: 600,
                    minHeight: '52px',
                    width: '220px',
                    padding: '1rem',
                  }}
                >
                  {t(content.keyLabel)}
                </StyledTContentTable>
              </Box>
              <Box sx={{ whiteSpace: 'pre-line' }}>
                <StyledTContentTable>
                  <ul>
                    {content.child.map((item, index) => (
                      <li key={index}>
                        <Typography
                          variant="body2"
                          color="var(--gray-200, #384255)"
                        >
                          {t(item)}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </StyledTContentTable>
              </Box>
            </Stack>
            <Divider />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default LocalHelpTextView;
