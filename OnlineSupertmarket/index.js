/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Geocoder from 'react-native-geocoding';

Geocoder.init('sfdsffs');

AppRegistry.registerComponent(appName, () => App);
