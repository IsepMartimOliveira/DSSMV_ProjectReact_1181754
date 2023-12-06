import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TextInputField from '../components/TextInputField';
import LoginButton from '../components/LoginButton';
import Title from '../components/Title';
import {useNavigation} from '@react-navigation/native';
import {connectUser} from '../service/Request';
import {useUser} from '../context/UserProvider';


const RegisterScreen = () => {
  const {setUser} = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleLogin = () => {
    if (validateFields()) {
      console.log('Name:', name);
      console.log('Last Name:', lastName);
      console.log('Username:', username);
      console.log('Email:', email);
      createUser();
    }
  };
  const validateFields = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Field is missing');
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!lastName.trim()) {
      setLastNameError('Field is missing');
      isValid = false;
    } else {
      setLastNameError(null);
    }

    if (!username.trim()) {
      setUsernameError('Field is missing');
      isValid = false;
    } else {
      setUsernameError(null);
    }

    if (!email.trim()) {
      setEmailError('Field is missing');
      isValid = false;
    } else {
      setEmailError(null);
    }

    return isValid;
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
        setUser(response);
        navigation.navigate('Login');
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
        error={nameError}
      />
      <TextInputField
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        error={lastNameError}
      />
      <TextInputField
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        error={usernameError}
      />
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        error={emailError}
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
