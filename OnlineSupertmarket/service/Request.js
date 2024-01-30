var API_URL = 'https://api.spoonacular.com';
const API_KEY = '?apiKey=';
/*Add your api key*/

export const connectUser = async userData => {
  const url = API_URL + '/users/connect' + API_KEY;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getRecipes = async cuisine => {
  const url = API_URL + '/recipes/complexSearch' + API_KEY + cuisine;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRecipeDetails = async recipeID => {
  const url = API_URL + '/recipes/' + recipeID + '/information' + API_KEY;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const addIngredient = async (username, hash, name) => {
  const url =
    API_URL +
    '/mealplanner/' +
    username +
    '/shopping-list/items' +
    API_KEY +
    '&hash=' +
    hash;
  console.log('URLADDING', url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item: name}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getShoppingCart = async (username, hash) => {
  const url =
    API_URL +
    '/mealplanner/' +
    username +
    '/shopping-list' +
    API_KEY +
    '&hash=' +
    hash;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteItem = async (username, hash, id) => {
  const url =
    API_URL +
    '/mealplanner/' +
    username +
    '/shopping-list/items/' +
    id +
    API_KEY +
    '&hash=' +
    hash;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getTrivia = async () => {
  const url = API_URL + '/food/trivia/random' + API_KEY;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
