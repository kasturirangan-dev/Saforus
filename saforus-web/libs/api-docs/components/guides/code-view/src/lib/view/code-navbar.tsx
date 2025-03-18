import { Box, Button, Typography } from '@mui/material';
import { GuideStore } from '@web-workspace/api-docs/components/guides/data';
import Select from '@web-workspace/shared/components/widgets/select';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { useState } from 'react';

const languageOptions = [
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
  { label: 'cURL', value: 'bash' },
  { label: 'JavaScript', value: 'javascript' },
];

export const CodeNavbar = ({
  title,
  codeString,
  displayOptions = true,
}: {
  title: string;
  codeString: string;
  displayOptions?: boolean;
}) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const { codeLanguage, setCodeLanguage } = useSnapshot(GuideStore);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);

    // Set copied state
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Box
      sx={{
        height: '50px',
        borderBottom: '1px solid var(--gray-100)',
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="body2" fontWeight={500} color="var(--neutral-25)">
        {title}
      </Typography>

      <Box display="flex">
        {displayOptions && (
          <Select
            options={languageOptions}
            inputStyle={{
              backgroundColor: 'inherit',
              fontFamily: 'Noto Sans',
              width: '140px',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              color: 'var(--neutral-25)',
              textAlign: 'right',

              '& .MuiOutlinedInput-notchedOutline ': {
                border: 'none',
              },
            }}
            value={codeLanguage}
            onChange={(event) => {
              setCodeLanguage(event.target.value as string);
            }}
            showErrorMsg={false}
          />
        )}
        <Box
          sx={{
            width: '74px',
            display: 'flex',
            justifyContent: 'end',
            marginLeft: '-8px',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              fontFamily: 'Noto Sans',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              textTransform: 'none',
              color: 'var(--neutral-25)',
              border: '1px solid var(--gray-100)',
              '&:hover': {
                border: '1px solid var(--neutral-950)',
              },
              padding: '8px 12px',
              height: '36px',
            }}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
