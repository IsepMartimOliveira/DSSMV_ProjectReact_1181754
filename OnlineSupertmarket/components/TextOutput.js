import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextOutput = ({textOutput}) => {
  return (
    <View style={styles.textOutputContainer}>
      <Text style={styles.textOutput}>{textOutput}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textOutputContainer: {
    alignItems: 'center',
    marginTop: 1,
  },
  textOutput: {
    fontSize: 14,
    fontWeight: 'normal',
  },
});

export default TextOutput;
