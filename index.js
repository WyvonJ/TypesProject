/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Component } from 'react';

import {AppRegistry} from 'react-native';
import App from './src/containers/App';
import {name as appName} from './app.json';

export default class TypesBox extends Component {
  render() {
    return (<App />);
  }
}

AppRegistry.registerComponent(appName, () => App);
