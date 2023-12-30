import Title from '../components/Title';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import MovementComponent from '../components/MovementComponent';
import TextOutput from "../components/TextOutput";

const HomePageScreen = () => {
  return (
    <View style={styles.container}>
      <Title title="Welcome!" />
      <TextOutput textOutput={'Shake the screen :)'} />
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
