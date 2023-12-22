import {configureStore} from '@reduxjs/toolkit';
import {shoppingCartReducer} from './shoppingReducer';
import recipeReducer from './recipeReducer';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    recipes: recipeReducer,
  },
});

export default store;

