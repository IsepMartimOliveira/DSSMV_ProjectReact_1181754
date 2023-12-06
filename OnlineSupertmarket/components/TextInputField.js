// TextInputField.js
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  error,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.errorBorder]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 8,
  },
});

export default TextInputField;
