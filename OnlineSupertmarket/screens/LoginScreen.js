import {View, StyleSheet} from 'react-native';
import TextInputField from '../components/TextInputField';
import LoginButton from '../components/LoginButton';
import Title from '../components/Title';
import {useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  let handleLogin;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="OnlineSupermarket" />
      </View>
      <TextInputField
        placeholder="Username"
        //value={name}
        //onChangeText={text => setName(text)}
      />
      <TextInputField
        placeholder="Password"
        // value={lastName}
        //  onChangeText={text => setLastName(text)}
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
