import {getRecipeDetails, getRecipes, addIngredient} from './Request';
import {Alert} from 'react-native';
import {useUser} from '../context/UserProvider';

const useRecipeService = () => {
  const {userData} = useUser();

  const processRecipeDetails = async (
    recipeId,
    setLoading,
    setRecipeDetails,
    setModalVisible,
  ) => {
    try {
      setLoading(true);
      const response = await getRecipeDetails(recipeId);
      console.log('Recipe Details Response:', response);
      console.log('Status', response.status);

      if (response) {
        const {
          healthScore,
          spoonacularScore,
          pricePerServing,
          summary,
          extendedIngredients,
        } = response;

        console.log('Health Score:', healthScore);
        console.log('Spoonacular Score:', spoonacularScore);
        console.log('Price Per Serving:', pricePerServing);
        console.log('Price Per Serving:', summary);
        if (extendedIngredients && extendedIngredients.length > 0) {
          console.log('Extended Ingredients:');
          extendedIngredients.forEach(ingredient => {
            const {name, image} = ingredient;
            console.log('Name:', name);
            console.log('Image:', image);
          });
        }

        setRecipeDetails(response);
        setModalVisible(true);
      } else {
        console.error('Recipe Details API Error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoading(false);
    }
  };

  const processRecipes = async (
    url,
    selectedCuisine,
    setLoading,
    setRecipes,
  ) => {
    try {
      if (selectedCuisine === 'Select Cuisine') {
        console.error('Please select a cuisine');
        return;
      }
      setLoading(true);

      const response = await getRecipes(url);
      console.log('Response:', response);

      if (response.results) {
        console.log('Success:', response.results);
        setRecipes(response.results);
      } else {
        console.error('API Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const addIngredientToCart = async (setLoading, name) => {
    try {
      setLoading(true);

      if (!userData) {
        console.error('User data is not available');
        return;
      }

      const {username, hash} = userData;
      if (!username || !hash) {
        console.error('Username or hash is not available');
        return;
      }

      const response = await addIngredient(username, hash, name);
      console.log('Add', response);
      console.log('Before Alert');
      Alert.alert(
        'Ingredient Added',
        'The ingredient has been added to your cart.',
      );
    } catch (error) {
      console.error('ErrorReq:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAllIngredientsToCart = async (
    recipeDetails,
    setLoading,
    setModalVisible,
  ) => {
    const {username, hash} = userData;

    try {
      setLoading(true);

      const {extendedIngredients} = recipeDetails;

      for (const ingredient of extendedIngredients) {
        const {name} = ingredient;
        await addIngredient(username, hash, name);
      }
      Alert.alert(
        'Ingredients Added',
        'The ingredients have been added to your cart.',
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding all ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    processRecipeDetails,
    processRecipes,
    addAllIngredientsToCart,
    addIngredientToCart,
  };
};

export default useRecipeService;
