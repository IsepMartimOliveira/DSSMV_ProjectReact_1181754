import React from 'react';
import TextOutput from '../components/TextOutput';
import {useSelector} from 'react-redux';

const DetailsContent = () => {
  const {healthScore, spoonacularScore, pricePerServing} = useSelector(
    state => state.recipes,
  );

  return (
    <>
      <TextOutput textOutput={`Health Score: ${healthScore}`} />
      <TextOutput textOutput={`Spoonacular Score: ${spoonacularScore}`} />
      <TextOutput textOutput={`Price Per Serving: ${pricePerServing}`} />
    </>
  );
};

export default DetailsContent;
