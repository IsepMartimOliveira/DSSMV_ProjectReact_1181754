/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAPgTSUj1lHwpF23Xoajr_7odhPoSJwi1s');

AppRegistry.registerComponent(appName, () => App);
