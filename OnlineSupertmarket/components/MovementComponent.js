import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getTrivia} from '../service/Request';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

const MovementComponent = () => {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400);

    const subscription = accelerometer.subscribe(({x, y, z}) => {
      console.log('Accelerometer Data:', {x, y, z});

      const movementThreshold = 15;
      if (
        Math.abs(x) > movementThreshold ||
        Math.abs(y) > movementThreshold ||
        Math.abs(z) > movementThreshold
      ) {
        fetchData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await getTrivia();
      console.log(response);
      setApiResponse(response);
      const delay = 3000;
      setTimeout(() => {
        setApiResponse(null);
      }, delay);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <View style={styles.container}>
      {apiResponse && <Text> Trivia:{apiResponse.text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovementComponent;
