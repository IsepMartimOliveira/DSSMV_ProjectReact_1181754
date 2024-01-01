export const setRecipes = payload => ({
  type: 'SET_RECIPES',
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

export const setRecipeDetails = details => ({
  type: 'SET_RECIPE_DETAILS',
  payload: details,
});
export const setSuccessMessage = message => ({
  type: 'SET_RECIPE_DETAILS',
  payload: message,
});
