import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Modal, Alert,
} from "react-native";
import ModalSelector from 'react-native-modal-selector';
import cuisines from '../others/Cuisines';
import intolerances from '../others/Intolerances';
import type from '../others/Type';
import TextOutput from '../components/TextOutput';
import Title from '../components/Title';
import ExpandableBox from '../components/ExpandableBox';
import DetailsContent from '../components/DetailsContent';
import SummaryContent from '../components/SummaryContent';
import IngredientContent from '../components/IngridientsContent';
import LoadingSpinner from '../components/LoadingSpinner';
import {useDispatch, useSelector} from 'react-redux';
import {addIngredient, getRecipeDetails, getRecipes} from '../service/Request';
import {
  setError,
  setLoading,
  setRecipes,
  setRecipeDetails,
} from '../reducer/actionRecipe';
import RecipeList from '../components/RecipeList';
import {useUser} from '../context/UserProvider';
import {addShoppingCart, allItemsAdded} from '../reducer/actionsShoppingCart';

const RecipeScreen = () => {
  const {userData} = useUser();
  const [selectedCuisine, setSelectedCuisine] = useState('Select Cuisine');
  const [selectedIntolerances, setselectedIntolerances] = useState('Select Intolerance');
  const [selectedType, setselectedType] = useState('Select Type');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {loading, error, title, ingredients, successMessage} = useSelector(
    state => state.recipes,
  );

  const buildRecipeUrl = () => {
    let url = '';

    if (selectedCuisine !== 'Select Cuisine' && selectedCuisine !== 'None') {
      url += '&cuisine=' + selectedCuisine;
    }

    if (
      selectedIntolerances !== 'Select Intolerance' &&
      selectedIntolerances !== 'None'
    ) {
      url += '&intolerances=' + selectedIntolerances;
    }

    if (selectedType !== 'Select Type' && selectedType !== 'None') {
      url += '&type=' + selectedType;
    }

    return url;
  };

  const fetchRecipeDetails = async recipeId => {
    try {
      dispatch(setLoading(true));

      const details = await getRecipeDetails(recipeId);
      console.log('Recipe Details:', details);

      dispatch(setRecipeDetails(details));
      setModalVisible(true);
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddAllIngredients = async () => {
    const {username, hash} = userData;

    try {
      dispatch(setLoading(true));
      if (ingredients && ingredients.length > 0) {
        for (const ingredient of ingredients) {
          const {name} = ingredient;

          const addAll = await addIngredient(username, hash, name)
          dispatch(addShoppingCart(addAll));
          console.log(successMessage);
        }
      }
      dispatch(allItemsAdded());
      Alert.alert('Success', 'All ingredients added successfully!');

    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
    console.log(successMessage);
  };

  const handleGetRecipes = async () => {
    const url = buildRecipeUrl();
    try {
      dispatch(setLoading(true));
      const data = await getRecipes(url);
      dispatch(setRecipes(data.results));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cuisineSelectorContainer}>
        <ModalSelector
          data={cuisines.map((cuisine, index) => ({
            key: index,
            label: cuisine,
            value: cuisine,
          }))}
          initValue={selectedCuisine}
          onChange={option => setSelectedCuisine(option.value)}
        />
      </View>
      <View style={styles.intoleranceSelectorContainer}>
        <ModalSelector
          data={intolerances.map((intolerance, index) => ({
            key: index,
            label: intolerance,
            value: intolerance,
          }))}
          initValue={selectedIntolerances}
          onChange={option => setselectedIntolerances(option.value)}
        />
      </View>
      <View style={styles.typeSelectorContainer}>
        <ModalSelector
          data={type.map((type, index) => ({
            key: index,
            label: type,
            value: type,
          }))}
          initValue={selectedType}
          onChange={option => setselectedType(option.value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        {loading && <LoadingSpinner />}
        <Button title="Get Recipes" onPress={handleGetRecipes} />
      </View>
      <View style={styles.flatListContainer}>
        <RecipeList fetchRecipeDetails={fetchRecipeDetails} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {loading && <LoadingSpinner />}
            {error && <TextOutput textOutput={`Error: ${error.message}`} />}
            {!loading && !error && (
              <View>
                <Title title={title} />
                <ExpandableBox title="Details" content={<DetailsContent />} />
                <ExpandableBox title="Summary" content={<SummaryContent />} />
                <ExpandableBox title="Ingridient" content={<IngredientContent />}
                />
                <Button
                  style={styles.buttonAddAll}
                  title="Add all"
                  onPress={handleAddAllIngredients}
                />
              </View>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  cuisineSelectorContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  intoleranceSelectorContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  typeSelectorContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 20,
  },
  recipeContainer: {
    marginBottom: 25,
  },
  modalContainer: {
    padding: 16,
  },
  buttonAddAll: {
    marginTop: 10,
  },
  CLOSE: {
    marginBottom: 20,
  },
});

export default RecipeScreen;
