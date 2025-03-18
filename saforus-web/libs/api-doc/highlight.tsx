import { visit } from 'unist-util-visit';
import hljs from 'highlight.js';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import objectivec from 'highlight.js/lib/languages/objectivec';
import swift from 'highlight.js/lib/languages/swift';
import bash from 'highlight.js/lib/languages/bash';
import { Node } from 'unist'; // This import may need to be adjusted based on actual type definitions available

import { CodeNode } from './interfaces';

hljs.registerLanguage('python', python);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('objc', objectivec);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('java', java);
hljs.registerLanguage('bash', bash);


export default function attacher(): (ast: Node) => void {
  function visitor(node: CodeNode): void {
    if (node.lang) {
      node.type = 'html';
      node.value = `<pre class='hljs'>${
        hljs.highlightAuto(node.value, [node.lang]).value
      }</pre>`;
    }
  }

  return (ast: Node) => visit(ast, 'code', visitor);
}
