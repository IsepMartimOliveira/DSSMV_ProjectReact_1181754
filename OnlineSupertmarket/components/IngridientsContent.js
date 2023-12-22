import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import TextOutput from './TextOutput';
import ImageIngridient from './ImageIngridient';
import useRecipeService from '../service/RecipeService';
import LoadingSpinner from './LoadingSpinner';
import {useSelector} from 'react-redux';
import {setLoading} from '../reducer/actionRecipe';

const IngredientContent = () => {
  const {addIngredientToCart} = useRecipeService();
  const {ingredients, loading} = useSelector(state => state.recipes);

  const handleAdd = async name => {
    await addIngredientToCart(setLoading, name);
  };
  const handleContainerPress = name => {
    Alert.alert(
      'Add Ingredient',
      `Do you want to add ${name} to your cart?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Add', onPress: () => handleAdd(name)},
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => handleContainerPress(item.name)}
            style={styles.container}>
            {loading && <LoadingSpinner />}
            <TextOutput textOutput={item.name} />
            <ImageIngridient
              imageUrl={
                'https://spoonacular.com/cdn/ingredients_100x100/' + item.image
              }
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 250,
  },
});

export default IngredientContent;
