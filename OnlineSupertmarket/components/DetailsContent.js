import React from 'react';
import TextOutput from '../components/TextOutput';

const DetailsContent = ({healthScore, spoonacularScore, pricePerServing}) => {
  return (
    <>
      <TextOutput textOutput={`Health Score: ${healthScore}`} />
      <TextOutput textOutput={`Spoonacular Score: ${spoonacularScore}`} />
      <TextOutput textOutput={`Price Per Serving: ${pricePerServing}`} />
    </>
  );
};

export default DetailsContent;
