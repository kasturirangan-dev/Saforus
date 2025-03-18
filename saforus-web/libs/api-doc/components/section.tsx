import React from 'react';
import { remark } from 'remark';
import remarkHTML from 'remark-html';
import attacher from '../highlight';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { postHighlight, remarkPlugins } from '../custom';

import { ASTNode, SectionProps, Chunk } from '../interfaces';


function nodeToHTML(node: ASTNode): string {
  try {
    let html = "";
    if (node) {
      // console.log(node);
    }
    switch (node.type) {
      case "table":
        html += `<table>`;
        node.children?.forEach((row, rowIndex) => {
          if (rowIndex === 0) { // Assuming first row is the header
            html += `<thead><tr>`;
            row.children?.forEach(cell => {
              html += `<th>${cell.children?.map(child => nodeToHTML(child)).join("") ?? ""}</th>`;
            });
            html += `</tr></thead>`;
          } else { // Other rows are body rows
            if (rowIndex === 1) html += `<tbody>`; // Start tbody on the first body row
            html += `<tr>`;
            row.children?.forEach(cell => {
              html += `<td>${cell.children?.map(child => nodeToHTML(child)).join("") ?? ""}</td>`;
            });
            html += `</tr>`;
            if (node.children)
              if (rowIndex === node.children.length - 1) html += `</tbody>`; // Close tbody on the last row
          }
        });
        html += `</table>`;
        break;
      case "heading":
        // if (node.depth === 3) {
        // Concatenate the values of all children to form the heading's text content.
        const headingText = node.children?.map(child => child.value).join("") ?? "";
        // Convert the heading text to a suitable id format.
        const idValue = `${headingText.toLowerCase().replace(/\s+/g, '-')}`;
        // Generate the heading HTML with the id attribute.
        html += `<h${node.depth} id="${idValue}">${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</h${node.depth}>`;
        // }
        // else {
        //   // For other heading depths, generate the heading HTML without an id attribute.
        //   html += `<h${node.depth}>${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</h${node.depth}>`;
        // }
        break;
      case "paragraph":
        html += `<p>${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</p>`;
        break;
      case "text":
        html += node.value;
        break;
      case "code":
        if (node.lang === null) {
          node.lang = undefined; // Adjust null to undefined for compatibility
        }
        const highlighter = attacher();
        highlighter(node); // This modifies the node in-place
        html += node.value; // node.value is now the highlighted HTML
        break;
      case "blockquote":
        html += `<blockquote>${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</blockquote>`;
        break;
      case "html":
        html += node.value; // Directly use the raw HTML content
        break;
      case "inlineCode":
        html += `<code>${node.value}</code>`;
        break;
      case "link":
        html += `<a href="${node.url}">${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</a>`;
        break;
      case "strong":
        html += `<strong>${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</strong>`;
        break;
      case "emphasis":
        html += `<em>${node.children?.map(child => nodeToHTML(child)).join("") ?? ""}</em>`;
        break;
      case "delete":
        // Start the <del> tag
        let delContent = `<del>`;
        // Assuming the deleted content is stored in node.children
        // and can be recursively processed by nodeToHTML
        node.children?.forEach(child => {
          delContent += nodeToHTML(child); // Recursively process each child node
        });
        // Close the <del> tag
        delContent += `</del>`;
        // Append the processed <del> content to the HTML string
        html += delContent;
        break;
      case "strikethrough":
        // Start the <s> tag for strikethrough
        let strikeContent = `<s>`;
        // Assuming the strikethrough content is stored in node.children
        // and can be recursively processed by nodeToHTML
        node.children?.forEach(child => {
          strikeContent += nodeToHTML(child); // Recursively process each child node
        });
        // Close the <s> tag
        strikeContent += `</s>`;
        // Append the processed <s> content to the HTML string
        html += strikeContent;
        break;
      case "list":
        const listTag = node.ordered ? 'ol' : 'ul';
        let listContent = `<${listTag}>`;
        node.children?.forEach(child => {
          listContent += `<li>${nodeToHTML(child)}</li>`;
        });
        listContent += `</${listTag}>`;
        html += listContent;
        break;
      case "listItem":
        node.children?.forEach(child => {
          html += nodeToHTML(child); // Process listItem children without wrapping in <li>, as this is handled in "list"
        });
        break;
      case "image":
        // Assuming node.url and node.alt are available
        const imageUrl = node.url; // URL of the image
        const imageAlt = node.alt || ''; // Alternative text for the image, with a fallback to an empty string if not provided
        // Construct the <img> tag with the URL and alt text
        const imageContent = `<img src="${imageUrl}" alt="${imageAlt}" class="imageApiDoc">`;
        // Append the <img> tag to the HTML string
        html += imageContent;
        break;
      default:
        // console.log(node.type)
        console.warn(`Unhandled node type: ${node.type}`);
    }

    return html;
  } catch (error) {
    console.error("An error occurred in nodeToHTML:", error);
    // Handle the error appropriately
    return "<p>Error rendering content</p>"; 
  }
}


function nodesAreAlreadyHTML(nodes: ASTNode[]): boolean {
  // Assuming there's a way to check if nodes are already in HTML format
  // This function needs to be implemented based on actual requirements
  return false; // Placeholder implementation
}

function renderHighlighted(nodes: any[]): string {
  // Convert nodes to AST using remark and plugins, except remarkHTML
  let ast = remark()
    .use(remarkPlugins)
    .runSync({
      type: 'root',
      children: nodes
    });

  // Filter out 'html' type nodes before further processing
  let filteredAst = {
    ...ast,
    children: ast.children.filter(node => node.type !== 'html')
  };

  // Convert each node to HTML using nodeToHTML
  let htmlParts = filteredAst.children.map(node => nodeToHTML(node as ASTNode));

  // Concatenate all HTML parts into a single string
  let htmlContent = htmlParts.join("");

  // Apply post-highlighting processing
  htmlContent = postHighlight(htmlContent);

  return htmlContent;
}

export default class Section extends React.PureComponent<SectionProps> {
  render() {
    const { chunk, leftClassname, rightClassname } = this.props;
    const { left, right, preview } = chunk;
    return (
      <div
        data-title={chunk.title}
        className={`keyline-top section contain clearfix ${preview ? 'preview' : ''}`}>
        <div
          className={leftClassname}
          dangerouslySetInnerHTML={{ __html: renderHighlighted(left) }} />
        {right.length > 0 && (
          <div
            className={rightClassname}
            dangerouslySetInnerHTML={{ __html: renderHighlighted(right) }} />
        )}
      </div>
    );
  }
}