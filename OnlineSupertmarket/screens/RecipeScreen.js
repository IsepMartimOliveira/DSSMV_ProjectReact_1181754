import React, {useState} from 'react';
import {StyleSheet, View, Button, FlatList} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {getRecipes} from '../service/Request';
import cuisines from '../others/Cuisines';
import intolerances from '../others/Intolerances';
import type from '../others/Type';
import TextOutput from '../components/TextOutput';
import ImageComponent from '../components/ImageComponent';

const RecipeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('Select Cuisine');
  const [selectedIntolerances, setselectedIntolerances] = useState('Select Intolerance');
  const [selectedType, setselectedType] = useState('Select Type');

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

  const handleGetRecipes = async () => {
    try {
      const url = buildRecipeUrl();
      if (selectedCuisine === 'Select Cuisine') {
        console.error('Please select a cuisine');
        return;
      }

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
        <Button title="Get Recipes" onPress={handleGetRecipes} />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={recipes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.recipeContainer}>
              <TextOutput textOutput={item.title} />
              <ImageComponent imageUrl={item.image} />
            </View>
          )}
        />
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
    marginBottom: 5,
  },
});

export default RecipeScreen;
