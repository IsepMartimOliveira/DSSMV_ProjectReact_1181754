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
export const allItemsAdded = () => ({
  type: 'ALL_ITEMS_ADDED_SUCCESSFULLY',
});
export const setItems = payload => ({
  type: 'SET_ITEMS',
  payload,
});

export const setDeleteItem = newTotalCost => ({
  type: 'DELETE_ITEM',
  payload: {newTotalCost},
});
