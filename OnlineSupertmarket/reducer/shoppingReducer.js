const initialState = {
  shoppingCart: {
    names: [],
    costs: [],
  },
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SHOPPING_CART':
      console.log('Action payload:', action.payload);

      const {aisles, cost} = action.payload;
      console.log('Aisles:', aisles);

      const names = aisles.flatMap(aisle => aisle.items.map(item => item.name));
      console.log('Names:', names);

      const costs = aisles.flatMap(aisle => aisle.items.map(item => item.cost));
      console.log('Costs:', costs);

      return {
        ...state,
        shoppingCart: {
          names,
          costs,
          totalCost: cost,
        },
      };
    default:
      return state;
  }
};
