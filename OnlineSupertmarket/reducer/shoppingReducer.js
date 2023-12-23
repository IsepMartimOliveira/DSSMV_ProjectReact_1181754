const initialState = {
  item: null,
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SHOPPING_CART':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loadingIng: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loadingIng: action.payload,
      };
    default:
      return state;
  }
};
