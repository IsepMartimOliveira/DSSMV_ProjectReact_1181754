import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

const MapComponent = () => {
  const navigation = useNavigation();
  const [selectedStreet, setSelectedStreet] = useState(null);

  const handleMapPress = async event => {
    const {coordinate} = event.nativeEvent;

    try {
      const results = await Geocoder.from(
        coordinate.latitude,
        coordinate.longitude,
      );
      const address = results.results[0].formatted_address;

      setSelectedStreet({coordinate, street: address});

      Alert.alert('Marker Added', `Street: ${address}`);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };
  const handleReturn = () => {
    navigation.navigate('Shoop', {selectedStreet});
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        onPress={handleMapPress}
        provider={MapView.PROVIDER_GOOGLE}
      >
        {selectedStreet && (
          <Marker
            coordinate={selectedStreet.coordinate}
            title="Selected Marker"
            description={`Street: ${selectedStreet.street}`}
          />
        )}
      </MapView>
      <Button title="Return to Cart" onPress={handleReturn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
