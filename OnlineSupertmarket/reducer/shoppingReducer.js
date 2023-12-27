const initialState = {
  item: null,
  successMessage: null,
  items: [],
  totalCost: 0,
  ids: null,
};

export const shoppingReducer = (state = initialState, action) => {
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
    case 'ALL_ITEMS_ADDED_SUCCESSFULLY':
      return {
        ...state,
        successMessage: 'All ingredients added successfully!',
      };
    case 'SET_ITEMS':
      const items = action.payload.aisles.reduce((allItems, aisle) => allItems.concat(aisle.items), []);
      const totalCost = action.payload.cost;

      const ids = items.map(item => item.id);

      return {
        ...state,
        items,
        totalCost,
        ids,
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        totalCost: action.payload.newTotalCost,
      };
    default:
      return state;
  }
};
