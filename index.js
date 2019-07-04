/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/compenent/App';

// import {createAppContainer} from 'react-navigation';
// import AppNavigator from './src/compenent/AppNavigator';

import {name as appName} from './app.json';

// 主页的生成
// const AppStackNavigatorContainer = createAppContainer(AppNavigator);
// AppRegistry.registerComponent(appName, () => AppStackNavigatorContainer);
AppRegistry.registerComponent(appName, () => App);

