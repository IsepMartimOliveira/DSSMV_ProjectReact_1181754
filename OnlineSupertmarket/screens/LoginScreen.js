import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import TextInputField from '../components/TextInputField';
import Title from '../components/Title';
import {useNavigation } from "@react-navigation/native";
import LoginButton from '../components/LoginButton';
import {useUser} from '../context/UserProvider';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {userData} = useUser();
  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setPassword(userData.spoonacularPassword);
    }
  }, [userData]);
  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
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
        password={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <LoginButton onPress={handleLogin} />

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
});

export default LoginScreen;
