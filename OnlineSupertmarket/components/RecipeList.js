import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import TextOutput from './TextOutput';
import ImageComponent from './ImageComponent';
import {useSelector} from 'react-redux';

const RecipeList = ({fetchRecipeDetails}) => {
  const {recipes} = useSelector(state => state.recipes);

  return (
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
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    marginBottom: 25,
  },
});

export default RecipeList;
