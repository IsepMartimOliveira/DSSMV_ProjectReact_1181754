import React from 'react';
import {View, StyleSheet,Button } from 'react-native';
import TextOutput from './TextOutput';
import ImageComponent from "./ImageComponent";

const IngredientContent = ({name, image}) => {
  const handleAddAll = () => {
    // Implement your logic for adding all items here
    console.log('Add');
  };
  return (
    <View style={styles.container}>
      <TextOutput textOutput={name} />

      <ImageComponent
        imageUrl={'https://spoonacular.com/cdn/ingredients_100x100/' + image}
        style={styles.image}
      />
      <View style={styles.space} />
      <Button title="Add Ingridient" onPress={handleAddAll} style={styles.button}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 35,
    height: 300,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});

export default IngredientContent;
