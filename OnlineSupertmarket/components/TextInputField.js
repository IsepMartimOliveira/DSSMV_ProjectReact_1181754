import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default TextInputField;
