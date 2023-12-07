// RecipeScreen.js

import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Title from '../components/Title';
import { getRecipes } from '../service/Request';
import cuisines from '../others/Cuisines';

const RecipeScreen = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('Select Cuisine');

  const handleGetRecipes = async () => {
    try {
      if (selectedCuisine === 'Select Cuisine') {
        console.error('Please select a cuisine');
        return;
      }

      const response = await getRecipes(selectedCuisine);
      console.log('Response:', response);

      if (response.status === 'success') {
        console.log('Success:', response.data); // Adjust the property accordingly
      } else {
        console.error('API Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="RecipeScreen" />
      </View>
      <View style={styles.cuisineSelectorContainer}>
        <ModalSelector
          data={cuisines.map((cuisine, index) => ({
            key: index,
            label: cuisine,
            value: cuisine,
          }))}
          initValue={selectedCuisine}
          onChange={(option) => setSelectedCuisine(option.value)}
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
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 0.2,
    justifyContent: 'flex-start',
  },
  cuisineSelectorContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default RecipeScreen;
