import React from 'react';
import { View, StyleSheet, Button, Alert } from "react-native";
import TextOutput from './TextOutput';
import ImageIngridient from "./ImageIngridient";

const IngredientContent = ({name, image}) => {
  const handleAddAll = () => {

    console.log('Add');
    Alert.alert('Ingredient Added', 'The ingredient has been added to your cart.');

  };
  return (
    <View style={styles.container}>
      <TextOutput textOutput={name} />

      <ImageIngridient
        imageUrl={'https://spoonacular.com/cdn/ingredients_100x100/' + image}
        style={styles.image}
      />
      <View style={styles.space} />
      <Button
        title="Add Ingridient"
        onPress={handleAddAll}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 200,

  },
  space: {
    width: 10,
    height: 10,
  },
});

export default IngredientContent;
