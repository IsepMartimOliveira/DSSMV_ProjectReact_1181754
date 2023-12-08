var API_URL = 'https://api.spoonacular.com';
const API_KEY = '?apiKey=8731e20fa447459cba57412c132ca440';

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
