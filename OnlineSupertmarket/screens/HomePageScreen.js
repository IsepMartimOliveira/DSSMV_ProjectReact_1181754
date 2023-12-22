import Title from '../components/Title';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import MovementComponent from '../components/MovementComponent';

const HomePageScreen = () => {
  return (
    <View style={styles.container}>
      <MovementComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 16,
  },
});

export default HomePageScreen;
