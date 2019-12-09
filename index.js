/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import Route from './src/Configs/Route';
import Loading from './src/Screens/LoadingScreen';

AppRegistry.registerComponent(appName, () => Loading);
