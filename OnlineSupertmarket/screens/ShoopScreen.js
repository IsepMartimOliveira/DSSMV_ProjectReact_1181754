import React, {useState} from 'react';
import {View, FlatList, Text, Alert, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useUser} from '../context/UserProvider';
import {deleteItem, getShoppingCart} from '../service/Request';
import ShoppingCartItem from '../components/ShoopingCartItem';
import ShoppingCartActions from '../components/ShoppingCartActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDeleteItem,
  setError,
  setItems,
} from '../reducer/actionsShoppingCart';

const ShoppingCartScreen = () => {
  const {userData} = useUser();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {items, totalCost, ids} = useSelector(state => state.shoppingCart);
  const {selectedStreet}=useSelector(state => state.map);
  console.log('Street', selectedStreet);
  React.useEffect(() => {
    if (selectedStreet) {
      Alert.alert(
        'Checkout',
        `Adress: ${selectedStreet.street}\nTotal Cost: $${totalCost.toFixed(2)}`,
        [
          {
            text: 'OK',
            onPress: () => {
              handleDeleteAll();
            },
          },
        ],
        {cancelable: false},
      );
    }
  }, [selectedStreet]);
  const fetchData = async () => {
    try {
      if (!userData) {
        console.error('User data is not available');
        return;
      }

      const {username, hash} = userData;
      if (!username || !hash) {
        console.error('Username or hash is not available');
        return;
      }

      const response = await getShoppingCart(username, hash);
      dispatch(setItems(response));
      console.log(dispatch(setItems(response)));
      console.log(ids);
    } catch (error) {
      setError(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userData]),
  );
  const handleDelete = async index => {
    console.log('Deleting item at index:', index);
    const {username, hash} = userData;

    try {
      const response = await deleteItem(username, hash, ids[index]);
      console.log(response);
      console.log(ids);
      if (response.status === 'success') {
        Alert.alert(
          'Ingredients Deleted',
          'The ingredient have been deleted from your cart.',
        );
        const deletedItemCost = items[index].cost;
        const newTotalCost = totalCost - deletedItemCost;
        dispatch(setDeleteItem(newTotalCost));
        fetchData();
      }
    } catch (error) {
      setError(error);
    }
  };

  const pressDelete = index => {
    Alert.alert(
      'Delete Ingredient',
      'Do you want to delete the item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => handleDelete(index)},
      ],
      {cancelable: true},
    );
  };
  const pressDeleteAll = index => {
    Alert.alert(
      'Delete all Ingredients',
      'Do you want to delete all items?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => handleDeleteAll(index)},
      ],
      {cancelable: true},
    );
  };

  const handleCheckOut = () => {
    navigation.navigate('Map');
  };

  const handleDeleteAll = async () => {
    const {username, hash} = userData;

    try {
      for (const id of ids) {
        const response = await deleteItem(username, hash, id);
        console.log(response);
        if (response.status !== 'success') {
          setError(response);
        }
      }

      Alert.alert(
        'Ingredients Deleted',
        'All ingredients have been deleted from your cart.',
      );
      fetchData();
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart Screen </Text>
      {items && items.length > 0 ? (
        <>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <ShoppingCartItem
                name={item.name}
                expectedCost={item.cost}
                onPress={() => pressDelete(index)}
              />
            )}
          />
          <Text style={styles.totalCost}>
            Total Cost: ${totalCost.toFixed(2)}
          </Text>
          <ShoppingCartActions
            onDeletePress={() => pressDeleteAll()}
            onCheckoutPress={() => handleCheckOut()}
          />
        </>
      ) : (
        <Text style={styles.noItemsText}>
          No items in the shopping cart {'\n'} Go search your next meal!
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalCost: {
    textAlign: 'right',
    fontSize: 20,
  },
  noItemsText: {
    textAlign: 'center',
  },
});
export default ShoppingCartScreen;
