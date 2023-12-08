import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {getRecipes} from '../service/Request';
import cuisines from '../others/Cuisines';
import intolerances from '../others/Intolerances';
import type from '../others/Type';

const RecipeScreen = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('Select Cuisine');
  const [selectedIntolerances, setselectedIntolerances] = useState('Select Intolorence');
  const [selectedType, setselectedType] = useState('Select Type');
  const buildRecipeUrl = () => {
    let url = '';

    if (selectedCuisine !== 'Select Cuisine' && selectedCuisine !== 'None') {
      url += '&cuisine=' + selectedCuisine;
    }

    if (selectedIntolerances !== 'Select Intolorence' && selectedIntolerances !== 'None') {
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

      if (response.status === 'success') {
        console.log('Success:', response.data);
      } else {
        console.error('API Error:', response.status);
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
});

export default RecipeScreen;
