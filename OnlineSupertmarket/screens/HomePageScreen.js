import Title from '../components/Title';
import {StyleSheet, View} from 'react-native';
import React from 'react';

const HomePageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="Home" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
});

export default HomePageScreen;
