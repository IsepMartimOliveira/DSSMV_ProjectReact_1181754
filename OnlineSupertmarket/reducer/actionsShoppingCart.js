export const addShoppingCart = payload => ({
  type: 'ADD_SHOPPING_CART',
  payload,
});

export const setLoading = payload => ({
  type: 'SET_LOADING',
  payload,
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});
