import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Title from '../components/Title';
import ImageSection from '../components/ImageSection';
import WelcomeButton from '../components/WelcomeButton';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    console.log('Button pressed!');
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title title="OnlineSupermarket" />
      </View>
      <View style={styles.imageContainer}>
        <ImageSection />
      </View>
      <View style={styles.buttonContainer}>
        <WelcomeButton onPress={handleButtonPress} buttonText="Get Started" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
});
export default WelcomeScreen;
