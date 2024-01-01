import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import TextOutput from './TextOutput';
import ImageIngridient from './ImageIngridient';
import LoadingSpinner from './LoadingSpinner';
import {useDispatch, useSelector} from 'react-redux';
import { setError, setLoading, setSuccessMessage } from "../reducer/actionRecipe";
import {addIngredient} from '../service/Request';
import {useUser} from '../context/UserProvider';
import {addShoppingCart} from '../reducer/actionsShoppingCart';

const IngredientContent = () => {
  const dispatch = useDispatch();

  const {ingredients, loading} = useSelector(state => state.recipes);
  const {userData} = useUser();

  const handleAdd = async name => {
    const {username, hash} = userData;
    try {
      dispatch(setLoading(true));

      const add = await addIngredient(username, hash, name);
      console.log('Add', add);

      dispatch(addShoppingCart(add));
      Alert.alert('Success', 'Ingredients added with  success!');
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
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
          <TouchableOpacity onPress={() => handleContainerPress(item.name)}>
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
