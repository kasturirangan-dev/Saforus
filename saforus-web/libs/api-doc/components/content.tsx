import React from 'react';
// import PropTypes from 'prop-types';
import Section from './section';
import GithubSlugger from 'github-slugger';
import { transformURL } from '../custom';

import { ASTNode, Chunk, ContentProps } from '../interfaces';

const slugger = new GithubSlugger();
const slug = (title: string): string => {
  slugger.reset();
  return slugger.slug(title);
};

function chunkifyAST(ast: { children: ASTNode[] }, languageProp: string): Chunk[] {
  let preview = false;
  let language = languageProp; // Copy to mutable variable
  return ast.children.reduce<ASTNode[][]>((chunks, node) => {
    // Check if node.depth is defined before comparing its value
    if (node.type === 'heading' && node.depth !== undefined && node.depth === 1) {
      return chunks;
    } else if (node.type === 'heading' && node.depth !== undefined && node.depth < 4) {
      chunks.push([node]);
    } else {
      if (chunks.length > 0) {
        chunks[chunks.length - 1].push(node);
      }
    }
    return chunks;
  }, [[]])
    .filter(chunk => chunk.length)
    .map((chunk): Chunk => {
      const left: ASTNode[] = [];
      const right: ASTNode[] = [];
      let title: string | undefined;
      if (language === 'cli') {
        language = 'bash';
      }
      if (chunk[0].depth !== undefined && chunk[0].depth < 3) {
        preview = false;
      }
      chunk.forEach(node => {
        // console.log(node.type);
        // Ensure node.depth is checked for undefined in all relevant conditions
        if (node.type === 'code') {
          if (node.lang === 'json' || node.lang === 'http' || node.lang === 'html') {
            right.push(node);
          } else if (node.lang === language) {
            if (language === 'curl') {
              right.push({ ...node, lang: 'bash' });
            } else {
              right.push(node);
            }
          } else if (node.lang === 'endpoint') {
            const transformedNode = transformURL(node.value!);
            const astNodeCompatibleObject = {
              ...transformedNode,
              depth: node.depth, // Assuming transformURL does not modify depth, no undefined check needed here
              type: 'code',
            };
            right.push(astNodeCompatibleObject);
          } else if (node.lang === null) {
            left.push(node);
          }
        } else if (node.type === 'heading' && node.depth !== undefined && node.depth >= 4) {
          right.push(node);
        } else if (node.type === 'blockquote') {
          left.push(node);
        } else if (node.type === 'heading' && node.depth !== undefined && node.depth < 4 && !title) {
          title = node.children![0].value!;
          left.push(node);
        } else if (node.type === 'html' && node.value!.match(/^<!--\s*preview\s*-->$/)) {
          preview = true;
        }
        else {
          left.push(node);
        }
      });
      return { left, right, title, preview, slug: slug(title!) };
    });
}

export default class Content extends React.PureComponent<ContentProps> {
  render() {
    const { ast, language, leftClassname, rightClassname } = this.props;
    return (
      <div className='clearfix' style={{ paddingBottom: '50px' }}>
        {chunkifyAST(ast, language.value).map((chunk, i) => (
          <Section
            leftClassname={leftClassname}
            rightClassname={rightClassname}
            chunk={chunk}
            key={i}
          />
        ))}
      </div>
    );
  }
}