import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageScreen from '../screens/HomePageScreen';
import ShoopScreen from '../screens/ShoopScreen';
import RecipeScreen from '../screens/RecipeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const ShoopIcon = ({color, size}) => (
  <MaterialCommunityIcons name="account" color={color} size={size} />
);

const HomeIcon = ({color, size}) => (
  <MaterialCommunityIcons name="home" color={color} size={size} />
);

const RecipeIcon = ({color, size}) => (
  <MaterialCommunityIcons name="book" color={color} size={size} />
);

const TabNavigator = () => (
  <Tab.Navigator initialRouteName='Home'>
    <Tab.Screen
      name="Shoop"
      component={ShoopScreen}
      options={{
        tabBarLabel: 'Shoop',
        tabBarIcon: ShoopIcon,
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomePageScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: HomeIcon,
      }}
    />
    <Tab.Screen
      name="Recipe"
      component={RecipeScreen}
      options={{
        tabBarLabel: 'Recipe',
        tabBarIcon: RecipeIcon,
        showIcon: true,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
