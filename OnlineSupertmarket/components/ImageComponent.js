import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageComponent = ({imageUrl}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
});

export default ImageComponent;
