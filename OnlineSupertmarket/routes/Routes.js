import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        options={{headerShown: false}}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MainTabs"
        component={TabNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Map"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const userIsAuthenticated = false;

  return (
    <NavigationContainer>
      {userIsAuthenticated ? <TabNavigator /> : <MainStack />}
    </NavigationContainer>
  );
};
export default Routes;
