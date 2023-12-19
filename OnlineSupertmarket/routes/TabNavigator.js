import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePageScreen from '../screens/HomePageScreen';
import ShoopScreen from '../screens/ShoopScreen';
import RecipeScreen from '../screens/RecipeScreen';
import Base64Image from '../components/Base64Image';
import {
  base_64_home,
  base_64_recipe,
  base_64_shoop,
} from '../others/StringsImage';

const Tab = createBottomTabNavigator();

const ShoopIcon = () => (<Base64Image base64String={base_64_shoop} width={30} height={30}/>);

const HomeIcon = () => (<Base64Image base64String={base_64_home} width={30} height={30} />);

const RecipeIcon = () => (<Base64Image base64String={base_64_recipe} width={30} height={30}/>);

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
