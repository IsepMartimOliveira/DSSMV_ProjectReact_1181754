import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import {setAdress, setSelectedStreet} from '../reducer/actionMap';

const MapComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {streetAdress} = useSelector(state => state.map);

  const handleMapPress = async event => {
    const {coordinate} = event.nativeEvent;

    try {
      const results = await Geocoder.from(
        coordinate.latitude,
        coordinate.longitude,
      );
      const address = results.results[0].formatted_address;
      dispatch(setAdress({coordinate, street: address}));
      dispatch(setSelectedStreet({street: address}));

      Alert.alert('Marker Added', `Street: ${address}`);
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };
  const handleReturn = () => {
    navigation.navigate('Shoop');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        onPress={handleMapPress}
        provider={MapView.PROVIDER_GOOGLE}>
        {streetAdress && (
          <Marker
            coordinate={streetAdress.coordinate}
            title="Selected Marker"
            description={`Street: ${streetAdress.street}`}
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
