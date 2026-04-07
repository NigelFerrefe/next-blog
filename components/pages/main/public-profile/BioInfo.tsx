'use client';

import DOMPurify from 'isomorphic-dompurify';
import { useState } from 'react';

const BioInfo = ({ bio }: { bio: string }) => {
  const cleanBio = DOMPurify.sanitize(bio);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const bioPreview = cleanBio.length > 300 ? cleanBio.slice(0, 300) + '...' : cleanBio;
  return (
    <div className="relative mt-12 pb-8">
      <div
        className="prose prose-sm prose-pre:rounded-xl prose-pre:p-4 prose-pre:w-fit prose-pre:max-w-full prose-pre:overflow-x-auto dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: isExpanded ? cleanBio : bioPreview }}
      />
      {cleanBio.length > 300 && (
        <div>
          <button
            onClick={toggleExpanded}
            type="button"
            className="absolute right-2 bottom-2 z-10 text-sm font-medium text-blue-800 hover:text-blue-900"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BioInfo;
