import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TextInputField from '../components/TextInputField';
import Title from '../components/Title';
import {useNavigation} from '@react-navigation/native';
import LoginButton from '../components/LoginButton';
import {useUser} from '../context/UserProvider';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {userData} = useUser();
  const navigation = useNavigation();
  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setPassword(userData.spoonacularPassword);
    }
  }, [userData]);
  const handleLogin = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === '' || trimmedPassword === '') {
      setErrorMessage('Please enter both username and password');
      return;
    }
    const isLoginSuccessful = true;

    if (isLoginSuccessful) {
      navigation.navigate('MainTabs');
    } else {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="OnlineSupermarket" />
      </View>
      <TextInputField
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInputField
        placeholder="Password"
        secureTextEntry={true}
        autoCorrect={false}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <LoginButton onPress={handleLogin} />
      {errorMessage !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.titleContainer} />
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
  errorContainer: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  errorMessage: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoginScreen;
