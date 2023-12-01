// ImageSection.js
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import welcomeImage from '../Images/25224_294121_10150_image.jpg';

const ImageSection = () => {
  return (
    <View style={styles.container}>
      <Image source={welcomeImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
  },
});

export default ImageSection;
