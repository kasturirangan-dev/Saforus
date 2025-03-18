import { Box, Typography } from '@mui/material'; 
import fileImg from './assets/file.svg';
interface FileItemProps {
  fileName: string;
  url: string;
  size: string;
}

export function FileItem(
  { fileName, url, size}: FileItemProps
) {
  return (
    <Box sx={{
      borderRadius: '5px', backgroundColor: 'var(--base-white)', border: '1px solid var(--neutral-600)', boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.04)'
      }}>
        <Box sx={{display: 'flex', padding: '1rem', gap: '1rem'}}>
            <img src={fileImg} />
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{color: '#1C1C28', fontSize: '1rem', fontWeight: 500, lineHeight: '1.5rem'}}>{fileName}</Typography>
                <Typography sx={{color: 'var(--gray-50)', fontSize: '0.875rem', fontWeight: '400', lineHeight: '1.25rem'}}>{size}</Typography>
            </Box>
        </Box>
    </Box>
  );
}

export default FileItem;
