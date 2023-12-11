import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { addIngredient, getRecipeDetails, getRecipes } from '../service/Request';
import cuisines from '../others/Cuisines';
import intolerances from '../others/Intolerances';
import type from '../others/Type';
import TextOutput from '../components/TextOutput';
import ImageComponent from '../components/ImageComponent';
import Title from '../components/Title';
import ExpandableBox from '../components/ExpandableBox';
import DetailsContent from '../components/DetailsContent';
import SummaryContent from '../components/SummaryContent';
import IngredientContent from '../components/IngridientsContent';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUser } from '../context/UserProvider';

const RecipeScreen = () => {
  const {userData} = useUser();
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('Select Cuisine');
  const [selectedIntolerances, setselectedIntolerances] = useState('Select Intolerance');
  const [selectedType, setselectedType] = useState('Select Type');
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      console.log('Loading 1:',loading);
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
      console.log('Loading 2:', loading);
    }
  };


  const handleAddAllIngredients = async () => {
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
        'The ingredients has been added to your cart.',
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding all ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecipes = async () => {
    try {
      const url = buildRecipeUrl();
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
        <FlatList
          data={recipes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.recipeContainer}>
              <TouchableOpacity onPress={() => fetchRecipeDetails(item.id)}>

                <TextOutput textOutput={item.title} />
                <ImageComponent imageUrl={item.image} />
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {recipeDetails && (
              <View>
                <Title title={recipeDetails.title} />
                <ExpandableBox
                  title="Details"
                  content={<DetailsContent {...recipeDetails} />}
                />
                <ExpandableBox
                  title="Summary"
                  content={<SummaryContent {...recipeDetails} />}
                />
                <ExpandableBox
                  title="Ingredients"
                  content={
                    recipeDetails && recipeDetails.extendedIngredients ? (
                      <FlatList
                        data={recipeDetails.extendedIngredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                          <IngredientContent key={index} {...item} />
                        )}
                      />
                    ) : null
                  }
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
  buttonAddAll:{
    marginTop: 10,
  },
  CLOSE: {
    marginBottom: 20,
  },
});

export default RecipeScreen;
