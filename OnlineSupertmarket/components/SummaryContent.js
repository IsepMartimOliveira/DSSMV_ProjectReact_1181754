import React from 'react';
import TextOutput from '../components/TextOutput';

const SummaryContent = ({summary}) => {
  const stripHtmlTags = htmlString => {
    return htmlString.replace(/<[^>]*>/g, '');
  };
  return (
    <>
      <TextOutput textOutput={stripHtmlTags(summary)} />
    </>
  );
};

export default SummaryContent;
