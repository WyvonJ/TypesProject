/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Component } from 'react';

import {AppRegistry} from 'react-native';
import Navigator from './src/routes';
import {name as appName} from './app.json';

export default class TypesBox extends Component {
  render() {
    return (<Navigator />);
  }
}

AppRegistry.registerComponent(appName, () => Navigator);
