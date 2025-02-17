import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapComponent from '../components/MapComponent';
import {useNavigation} from '@react-navigation/native';


const MapScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
