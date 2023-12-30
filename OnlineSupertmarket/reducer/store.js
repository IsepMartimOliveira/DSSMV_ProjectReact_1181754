import {configureStore} from '@reduxjs/toolkit';
import {shoppingReducer} from './shoppingReducer';
import recipeReducer from './recipeReducer';
import mapReducer from './mapReducer';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingReducer,
    recipes: recipeReducer,
    map: mapReducer,
  },
});

export default store;
