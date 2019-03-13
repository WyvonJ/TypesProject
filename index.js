/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';
import Navigator from './src/routes';
import {name as appName} from './app.json';

// export default class HandBook extends React.Component {
//   render() {
//     return (<Navigator />)
//   }
// }

AppRegistry.registerComponent(appName, () => Navigator);
