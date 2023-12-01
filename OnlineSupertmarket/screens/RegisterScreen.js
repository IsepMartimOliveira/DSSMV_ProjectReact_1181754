import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TextInputField from '../components/TextInputField';
import LoginButton from '../components/LoginButton';
import Title from '../components/Title';
import {useNavigation} from '@react-navigation/native';
import {connectUser} from '../service/Request';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    console.log('Name:', name);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Email:', email);
    createUser();
  };

  function handleLoginClick() {
    navigation.navigate('Login');
  }
  const createUser = async () => {
    try {
      const userData = {name, lastName, username, email};
      const response = await connectUser(userData);
      console.log('Response:', response);
      if (response.status === 'success') {
        const { username, hash, spoonacularPassword } = response;

        console.log('Username:', username);
        console.log('Hash:', hash);
        console.log('Spoonacular Password:', spoonacularPassword);

      } else {
        console.error('API Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
    marginTop: 20,
    color: 'blue',
  },
});

export default RegisterScreen;
