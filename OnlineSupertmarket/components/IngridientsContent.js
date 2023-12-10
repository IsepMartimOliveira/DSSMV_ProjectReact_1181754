import React, {useState } from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import TextOutput from './TextOutput';
import ImageIngridient from './ImageIngridient';
import {useUser} from '../context/UserProvider';
import {addIngredient} from '../service/Request';

const IngredientContent = ({name, image}) => {
  const {userData} = useUser();
  console.log('userData:', userData);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);

      if (!userData) {
        console.error('User data is not available');
        return;
      }

      const {username, hash} = userData;
      if (!username || !hash) {
        console.error('Username or hash is not available');
        return;
      }

      const response = await addIngredient(username, hash, name);
      console.log('Add', response);
      console.log('Before Alert');
      Alert.alert(
        'Ingredient Added',
        'The ingredient has been added to your cart.',
      );
    } catch (error) {
      console.error('ErrorReq:', error);
    } finally {
      setLoading(false);
    }
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
        title="Add Ingredient"
        onPress={handleAdd}
        disabled={loading}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 500,
    marginBottom: -225,
  },
  space: {
    width: 10,
    height: 10,
  },
});

export default IngredientContent;
