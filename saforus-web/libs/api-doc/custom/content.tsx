import React, { useEffect, useState } from 'react';

// Assuming the App component will receive the raw Markdown content as a prop named `onContentLoad`
const Content: React.FC<{ onContentLoad: (markdown: string) => void }> = ({ onContentLoad }) => {
  useEffect(() => {
    const loadContent = async () => {
      try {
        const introductionContent = await fetch('/content/introduction.md').then(res => res.text());
        const exampleContent = await fetch('/content/example.md').then(res => res.text());

        const combinedContent = '# Integration Guide\n' + introductionContent + '\n# Example\n' + exampleContent;
        // Pass the raw Markdown content to the App component
        onContentLoad(combinedContent);
      } catch (error) {
        console.error('Error loading content:', error);
        // Consider handling the error state appropriately
        onContentLoad('Error loading content.');
      }
    };

    loadContent();
  }, [onContentLoad]);

  // Since the rendering is handled elsewhere, this component might not render anything itself
  return null;
};

export default Content;