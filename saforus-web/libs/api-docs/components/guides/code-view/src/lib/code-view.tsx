import { Box, styled } from '@mui/material';
import {
  GuideStore,
  Language,
} from '@web-workspace/api-docs/components/guides/data';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { CodeNavbar } from './view/code-navbar';
import { CodeBlock } from './view/code-block';

const GridBoxContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: 'var(--gray-300)',
  '&  .hljs': {
    backgroundColor: 'inherit',
  },
});

interface CodeViewProps {
  title?: string;
  codes: Partial<Record<Language, string>> | string; // Partial because some languages may not have code
  displayLanguage?: Language; // When provided, this language will be used, dropdown will be disabled
}

const CodeView = ({ title = '', codes, displayLanguage }: CodeViewProps) => {
  const { codeLanguage } = useSnapshot(GuideStore);

  const currentLanguage = useMemo(() => {
    return displayLanguage || (codeLanguage as Language);
  }, [displayLanguage, codeLanguage]);

  const codeString =
    typeof codes === 'string' ? codes : codes[currentLanguage] || '';

  return (
    <GridBoxContainer>
      <CodeNavbar
        title={title}
        codeString={codeString}
        displayOptions={!displayLanguage}
      />
      <CodeBlock codeString={codeString} language={currentLanguage} />
    </GridBoxContainer>
  );
};
export default CodeView;
