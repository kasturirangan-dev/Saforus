import { unified } from 'unified';
import { useState, useEffect } from 'react';
import remarkHTML from 'remark-html';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import App from '@web-workspace/api-doc';
import MainLayout from '@web-workspace/api-doc/components/layouts/main-layout';
import { introduction, koreanIntroduction, apiDocumentation, koreanApiDocumentation } from './content';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';


function generateAst(content: string) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHTML)
    .parse(content);
}

interface ASTNode {
  type: string;
  data?: unknown;
  children?: ASTNode[]; 
  value?: string;
  depth?: number;
  url?: string;
  lang?: string;
  title?: string | null | undefined; 
  Root?: React.ReactNode;
}

export function ApiDoc() {
  const { i18n } = useTranslation();
  useEffect(() => {
    let newContent: string;
    if (i18n.language === 'en') {
      newContent = introduction + '\n# MarkAny APIs \n' + apiDocumentation;
    } else if (i18n.language === 'ko') {
      newContent = koreanIntroduction + '\n# MarkAny APIs \n' + koreanApiDocumentation;
    } else {
      newContent = introduction + '\n# MarkAny APIs \n' + apiDocumentation; // Default to English if no language is set
    }
    
    setContent(newContent);
  }, [i18n.language]);

  const [content, setContent] = useState('');
  const ast = generateAst(content);
  const astWithCorrectType = ast as ASTNode;
  
  return (
    <MainLayout ast={astWithCorrectType}>
        <App ast={astWithCorrectType} content={content}></App>
      </MainLayout>
  );
}

export default ApiDoc;