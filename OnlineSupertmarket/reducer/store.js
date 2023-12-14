import {configureStore} from '@reduxjs/toolkit';
import {shoppingCartReducer} from './shoppingReducer';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});

export default store;

