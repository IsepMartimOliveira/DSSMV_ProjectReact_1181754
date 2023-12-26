import {configureStore} from '@reduxjs/toolkit';
import {shoppingReducer} from './shoppingReducer';
import recipeReducer from './recipeReducer';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingReducer,
    recipes: recipeReducer,
  },
});

export default store;

