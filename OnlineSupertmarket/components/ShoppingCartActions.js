import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ShoppingCartActions = ({onDeletePress, onCheckoutPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDeletePress}>
        <Text style={styles.buttonText}>Delete All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onCheckoutPress}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShoppingCartActions;
