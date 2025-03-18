import { List, ListItem } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { CodeContent, TextContent, StyledLink } from './styled-elements';
import { getEnvVar } from '@web-workspace/shared/helpers/environment-variables';

// Utilizing defined components for styling the content with the Trans component
export const TransContent = ({
  i18nKey,
  link,
}: {
  i18nKey: string;
  link?: string; // User for anchorText in content
}) => {
  const { i18n } = useTranslation();
  const linkConsole = getEnvVar('VITE_API_CONSOLE_URL');
  const linkSupport = getEnvVar(
    i18n.language === 'en' ? 'VITE_SUPPORT_URL' : 'VITE_SUPPORT_KO_URL'
  );

  return (
    <Trans
      i18nKey={i18nKey}
      components={{
        ul: (
          <List
            disablePadding
            sx={{
              listStyleType: 'disc',
              marginLeft: '20px',
              whiteSpace: 'normal',
              '& .MuiListItem-root': {
                display: 'list-item',
              },
              '& li::marker': {
                fontSize: '0.9em',
              },
            }}
          />
        ),
        li: <ListItem disablePadding />,
        code: <CodeContent />,
        red: <span style={{ color: 'var(--red-450)' }} />,
        gray: <span style={{ color: 'var(--neutral-800)' }} />,
        anchorText: link ? <StyledLink href={link} /> : <StyledLink />,
        linkConsole: <StyledLink href={linkConsole} />,
        linkSupport: <StyledLink href={linkSupport} />,
      }}
    ></Trans>
  );
};

// Utilizing defined components for styling the content with the Trans component
export const SectionContent = ({
  contentKey,
  link,
}: {
  contentKey: string;
  link?: string; // User for anchorText in content
}) => {
  return (
    <TextContent component="div">
      <TransContent i18nKey={contentKey} link={link} />
    </TextContent>
  );
};
