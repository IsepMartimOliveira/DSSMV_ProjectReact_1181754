import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
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
        <TextOutput textOutput={name} />
        <ImageIngridient
          imageUrl={
            'https://spoonacular.com/cdn/ingredients_100x100/' + image
          }
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
