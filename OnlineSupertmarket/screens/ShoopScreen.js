import React, {useState} from 'react';
import { View, FlatList, Text } from "react-native";
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from '../context/UserProvider';
import {getShoppingCart} from '../service/Request';
import ShoppingCartItem from '../components/ShoopingCartItem';
import ShoppingCartActions from '../components/ShoppingCartActions';
import useShoopService from '../service/ShoopService';

const ShoppingCartScreen = () => {
  const {names, costs, ids, processShoppingCart} = useShoopService();

  useFocusEffect(
    React.useCallback(() => {
      processShoppingCart();
    }, [processShoppingCart]),
  );
  const handleDelete = (index) => {
    console.log('Deleting item at index:', index);
  };

  const handleCheckOut = () => {
    console.log('Checkout pressed');
  };

  const handleDeleteAll = () => {
    console.log('Delete All pressed');
  };


  return (
    <View>
      <Text>Shopping Cart Screen</Text>
      <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <ShoppingCartItem
            name={item}
            expectedCost={costs[index]}
            onPress={() => handleDelete(index)}
          />
        )}
      />
      <ShoppingCartActions onDeletePress={() => handleDeleteAll()} onCheckoutPress={() => handleCheckOut()} />
    </View>
  );
};

export default ShoppingCartScreen;
