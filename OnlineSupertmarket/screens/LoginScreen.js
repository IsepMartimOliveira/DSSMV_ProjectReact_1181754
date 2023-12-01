import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TextInputField from '../components/TextInputField';
import LoginButton from '../components/LoginButton';

const LoginScreen = () => {
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

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default LoginScreen;
