import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import TextOutput from './TextOutput';
import ImageIngridient from './ImageIngridient';
import useRecipeService from '../service/RecipeService';
import LoadingSpinner from './LoadingSpinner';

const IngredientContent = ({name, image}) => {
  const {addIngredientToCart} = useRecipeService();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    await addIngredientToCart(setLoading, name);
  };
  const handleContainerPress = () => {
    Alert.alert(
      'Add Ingredient',
      `Do you want to add ${name} to your cart?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Add', onPress: handleAdd},
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleContainerPress} style={styles.container}>
        {loading && <LoadingSpinner />}

        <TextOutput textOutput={name} />
        <ImageIngridient
          imageUrl={'https://spoonacular.com/cdn/ingredients_100x100/' + image}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 500,
    marginBottom: -250,
  },
});

export default IngredientContent;
