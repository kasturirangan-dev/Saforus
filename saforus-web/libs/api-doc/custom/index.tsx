'use strict';

interface BrandNames {
  desktop: string;
  tablet: string;
  mobile: string;
}

interface TransformURLResult {
  type: string;
  value: string;
}

/**
 * Brand names, in order to decreasing length, for different
 * media queries.
 */
export const brandNames: BrandNames = {
  desktop: 'MarkAny API Documentation',
  tablet: 'MarkAny API Docs',
  mobile: 'API Docs',
};

/**
 * Classes that define the top-left brand box.
 */
export const brandClasses: string = 'fill-red';

/**
 * Text for the link back to the linking website.
 */
export const backLink: string = 'Back to wobbles.com';

/**
 * Runs after highlighting code samples. You can use this
 * hook to, for instance, highlight a token and link it
 * to some canonical part of documentation.
 */
export function postHighlight(html: string): string {
  return html;
}

/**
 * Highlight tokens in endpoint URLs, optionally linking to documentation
 * or adding detail. This is the equivalent of postHighlight but it
 * operates on endpoint URLs only.
 */
function highlightTokens(str: string): string {
  return str.replace(
    /{[\w_]+}/g,
    (match: string) => `<span class="strong">${match}</span>`
  );
}

/**
 * Transform endpoints given as strings in a highlighted block like
 *
 *     ```endpoint
 *     GET /foo/bar
 *     ```
 *
 * Into HTML nodes that format those endpoints in nice ways.
 */
export function transformURL(value: string): TransformURLResult {
  let parts = value.split(/\s+/);
  return {
    type: 'html',
    value: `<div class='endpoint dark fill-dark round '>
      <div class='round-left pad0y pad1x fill-lighten0 code small endpoint-method'>${
        parts[0]
      }</div>
      <div class='pad0 code small endpoint-url'>${highlightTokens(
        parts[1]
      )}</div>
    </div>`,
  };
}

export const remarkPlugins: any[] = [];
