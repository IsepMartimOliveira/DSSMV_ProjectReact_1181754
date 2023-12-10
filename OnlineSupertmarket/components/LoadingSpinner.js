import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner = () => (
  <View>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default LoadingSpinner;
