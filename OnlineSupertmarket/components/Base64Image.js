import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Base64Image = ({ base64String, width = 200, height = 200 }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `data:image/png;base64,${base64String}` }}
        style={{ width, height, resizeMode: 'cover' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Base64Image;
