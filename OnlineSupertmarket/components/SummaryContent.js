import React from 'react';
import TextOutput from '../components/TextOutput';
import { useSelector } from "react-redux";

const SummaryContent = () => {
  const {summary} = useSelector(state => state.recipes);

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
