import React, {useState} from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from "react-native";
import TextInputField from '../components/TextInputField';
import LoginButton from '../components/LoginButton';
import Title from '../components/Title';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    console.log('Name:', name);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Email:', email);
  };

  function handleLoginClick() {

  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="Register Account" />
      </View>
      <TextInputField
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInputField
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInputField
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <LoginButton onPress={handleLogin} />

      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={handleLoginClick}>
        <Text style={styles.message}>Have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
  },
  message: {
    textAlign: 'center',
    marginTop:20,
    color: 'blue',

  },
});

export default RegisterScreen;
