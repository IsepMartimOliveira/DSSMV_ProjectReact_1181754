import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const MapComponent = ({onCloseMap}) => {
  const navigation = useNavigation();
  const handleReturn = () => {
    onCloseMap();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={MapView.PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Marker Title"
          description="Marker Description"
        />
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
