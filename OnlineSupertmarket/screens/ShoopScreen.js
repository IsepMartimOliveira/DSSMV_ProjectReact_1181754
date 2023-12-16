import React, {useState} from 'react';
import {View, FlatList, Text, Alert, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from '../context/UserProvider';
import {deleteItem, getShoppingCart} from '../service/Request';
import ShoppingCartItem from '../components/ShoopingCartItem';
import ShoppingCartActions from '../components/ShoppingCartActions';
import MapComponent from '../components/MapComponent';

const ShoppingCartScreen = () => {
  const {userData} = useUser();
  const [names, setNames] = useState([]);
  const [ids, setIds] = useState([]);
  const [costs, setCosts] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const handleCloseMap = () => {
    setShowMap(false);
  };
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
      if (response) {
        const {aisles, cost, id} = response;
        const nameList = aisles.flatMap(aisle =>
          aisle.items.map(item => item.name),
        );
        const idList = aisles.flatMap(aisle =>
          aisle.items.map(item => item.id),
        );
        const costList = aisles.flatMap(aisle =>
          aisle.items.map(item => item.cost),
        );

        setNames(nameList);
        setIds(idList);
        setCosts(costList);
        const newTotalCost = costList.reduce((sum, cost) => sum + cost, 0);
        setTotalCost(newTotalCost);
      }
    } catch (error) {
      console.error('ErrorReq:', error);
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
      if (response.status === 'success') {
        Alert.alert(
          'Ingredients Deleted',
          'The ingredient have been deleted from your cart.',
        );
        const newTotalCost = totalCost - costs[index];
        setTotalCost(newTotalCost);
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
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
      'Do you want to delete all itemns?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => handleDeleteAll(index)},
      ],
      {cancelable: true},
    );
  };

  const handleCheckOut = () => {
    console.log('Checkout pressed');
    setShowMap(true);
  };

  const handleDeleteAll = async () => {
    const {username, hash} = userData;

    try {
      for (const id of ids) {
        const response = await deleteItem(username, hash, id);
        console.log(response);
        if (response.status !== 'success') {
          console.error('Error deleting item:', response.error);
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
    <View>
      <Text style={styles.title}>Shopping Cart Screen </Text>
      <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <ShoppingCartItem
            name={item}
            expectedCost={costs[index]}
            onPress={() => pressDelete(index)}
          />
        )}
      />
      <Text style={styles.totalCost}>Total Cost: ${totalCost.toFixed(2)}</Text>

      <ShoppingCartActions
        onDeletePress={() => pressDeleteAll()}
        onCheckoutPress={() => handleCheckOut()}
      />

      {showMap && <MapComponent onCloseMap={handleCloseMap} />}
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
  totalCost:{
    textAlign: 'right',
    fontSize:20
  }
});
export default ShoppingCartScreen;
