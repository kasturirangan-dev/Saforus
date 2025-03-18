import { styled } from '@mui/material';
import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('java', java);
hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

const StyledPre = styled('pre')`
  font-size: 13px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: normal;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;

  .hljs-comment {
    word-break: normal;
  }
`;

const StyledCode = styled('code')`
  max-height: 482px;
  padding: 1rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 6px; /* for vertical scrollbars */
    height: 6px; /* for horizontal scrollbars */
  }
`;

export const CodeBlock = ({
  codeString,
  language,
}: {
  codeString: string;
  language: string;
}) => {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentElement = codeRef.current;

    if (currentElement) {
      // Remove the `data-highlighted` attribute if it's already highlighted
      if (currentElement.dataset.highlighted) {
        delete currentElement.dataset.highlighted;
      }

      // Apply highlighting again
      hljs.highlightElement(currentElement);

      // Set the `data-highlighted` attribute to prevent re-highlighting in future renders
      currentElement.dataset.highlighted = 'yes';
    }
  }, [codeString]);

  return (
    <StyledPre style={{ overflow: 'auto' }}>
      <StyledCode ref={codeRef} className={`language-${language}`}>
        {codeString}
      </StyledCode>
    </StyledPre>
  );
};
