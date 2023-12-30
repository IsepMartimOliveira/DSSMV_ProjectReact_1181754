import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ShoppingCartItem = ({name, expectedCost, onPress}) => {
  console.log('Item props:', name, expectedCost);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.cost}>Expected Cost: {expectedCost}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cost: {
    color: '#666',
  },
});

export default ShoppingCartItem;
