import { Box, Collapse, IconButton } from '@mui/material';
import {
  GuideCard,
  SectionContainer,
  SectionTitle,
  TextContent,
} from './styled-elements';
import { Link } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { CollapseSectionProps } from './interface';
import { ExpandIcon } from '@web-workspace/shared/components/widgets/icon';

export function CollapseSection({
  id,
  label,
  description,
  children,
  style,
  level = 3,
  titleHeading = true,
  defaultExpand = false,
  collapseStyle,
  maxContent,
  cardAction,
}: CollapseSectionProps) {
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

  const [expand, setExpand] = useState(defaultExpand);

  return (
    <GuideCard
      key={`section-${id}`}
      sx={{
        ...style,
      }}
    >
      <Box>
        <SectionTitle
          id={id}
          component={titleComponent}
          className={`section-title--h${level + 1}`}
          tabIndex={0}
          sx={{
            padding: '12px 16px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'var(--neutral-400)',
            },
          }}
          onClick={() => setExpand(!expand)}
        >
          {titleHeading ? <Link to={`#${id}`}>{label}</Link> : label}
          <ExpandIcon expand={expand} iconProps={{ color: 'var(--gray-50)' }} />
        </SectionTitle>
        {description && <TextContent>{description}</TextContent>}
      </Box>

      <Collapse in={expand}>
        {typeof children === 'string' ? (
          <TextContent>{children}</TextContent>
        ) : (
          <Box
            sx={{
              maxHeight: maxContent,
              overflow: 'auto',
              '::-webkit-scrollbar': {
                width: '6px' /* for vertical scrollbars */,
                height: '6px' /* for horizontal scrollbars */,
              },
              scrollbarGutter: 'stable',
            }}
          >
            <Box
              sx={{
                padding: '0px 10px 0px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                overflow: 'hidden',
                ...collapseStyle,
              }}
            >
              {children}
            </Box>
          </Box>
        )}
        {cardAction ? (
          <Box sx={{ padding: '12px 16px' }}>{cardAction}</Box>
        ) : (
          <Box height="16px" />
        )}
      </Collapse>
    </GuideCard>
  );
}

export default CollapseSection;
