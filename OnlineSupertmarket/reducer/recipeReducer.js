const initialState = {
  recipes: [],
  loading: false,
  error: null,
  pricePerServing: 0,
  healthScore: 0,
  spoonacularScore: null,
  title: null,
  summary: null,
  extendedIngredients: [],
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_RECIPE_DETAILS':
      const ingredients = action.payload.extendedIngredients.map(
        ingredient => ({
          name: ingredient.name,
          image: ingredient.image,
        }),
      );
      console.log('Ingridients', ingredients);

      return {
        ...state,
        ingredients,
        ...action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducer;
