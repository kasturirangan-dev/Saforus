import { Box } from '@mui/material';
import soundWave from '../assets/soundWaves.svg';
import { fileType } from '../data/interface';

interface MediaReviewProps {
  type?: string;
  link?: string;
}

const MediaReview: React.FC<MediaReviewProps> = ({ type, link }) => {
  const renderMedia = () => {
    switch (type) {
      case fileType.IMG:
        return <img src={link} alt="Box image cap" />;
      case fileType.AUDIO:
        return (
          <Box
            display={'inline-block'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              borderRadius: '0.25rem',
              border: '1px solid var(--neutral-600)',
              background: 'var(--base-white)',
            }}
          >
            <img src={soundWave} alt="Sound wave cap" />
          </Box>
        );
      case fileType.VIDEO:
        return (
          <Box maxWidth={'70%'}>
            <video src={link} width="100%" height="auto" controls />
          </Box>
        );
      default:
        return (
          <div
            style={{
              width: 'auto',
              height: '100%',
              backgroundColor: '#D9D9D9',
            }}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        padding: '1.5rem',
        borderRadius: '0.5rem',
        background: 'var(--neutral-300)',
      }}
    >
      {renderMedia()}
    </Box>
  );
};

export default MediaReview;
