import { Box, IconButton } from '@mui/material';
import { SectionContainer, SectionTitle, TextContent } from './styled-elements';
import { Link, useLocation } from 'react-router-dom';
import LinkIcon from '../assets/link.svg';
import { GuideSectionProps } from './interface';

export function GuideSection({
  id,
  label,
  description,
  children,
  style,
  level = 1,
  titleHeading = true,
  linkCopy = true,
}: GuideSectionProps) {
  titleHeading = titleHeading && Boolean(id);
  let titleComponent = 'p';
  if (titleHeading) {
    switch (level) {
      case 1:
        titleComponent = 'h2';
        break;
      case 2:
        titleComponent = 'h3';
        break;
      default:
        titleComponent = 'h4';
    }
  }

  const location = useLocation();
  const handleCopyLink = () => {
    const sestionPath = `${location.pathname}#${id}`;
    navigator.clipboard.writeText(`${window.location.origin}${sestionPath}`);
  };

  return (
    <SectionContainer key={`section-${id}`} sx={{ ...style }}>
      <Box>
        <SectionTitle
          id={id}
          component={titleComponent}
          className={`section-title--h${level + 1}`}
          tabIndex={0}
        >
          {titleHeading ? <Link to={`#${id}`}>{label}</Link> : label}
          {titleHeading && linkCopy && (
            <IconButton onClick={handleCopyLink} sx={{ padding: '6px' }}>
              <img
                src={LinkIcon}
                alt="link-icon"
                loading="lazy"
                width={20}
                height={20}
              />
            </IconButton>
          )}
        </SectionTitle>
        {description && <TextContent>{description}</TextContent>}
      </Box>

      {typeof children === 'string' ? (
        <TextContent>{children}</TextContent>
      ) : (
        children
      )}
    </SectionContainer>
  );
}

export default GuideSection;
