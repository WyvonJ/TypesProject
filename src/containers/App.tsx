
// import React, {Component} from 'react';
// 同时使用默认导出和命名导出会导致报错
import React from 'react';
import { Component } from 'react';
// yarn add @types/react-navigation 添加ts的.d.ts类型支持
import { StackNavigator } from 'react-navigation';
// Text Button为原生组件
import { Platform, StyleSheet, Text, AsyncStorage } from 'react-native';
// import { Provider } from 'react-redux';
import { homepage } from '../requests/homepage';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  enthusiasmLevel: number;
  content: string
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if((props.enthusiasmLevel || 0) <= 0) {
      // throw new Error('You shall die');
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1,
      content: ''
    };

    homepage.getHomePageList({}).then( res =>{
      // console.error(res);
      this.setState({content: JSON.stringify(res) })
    })

  }

  render() {
    return (
      <Text style={styles.root}>
      { this.state.content }
      </Text>
    );
  }
}
// 只有Text里的Text的样式才继承，其他全部需要单独写样式
// View内部的元素不要超出父级的范围
// lineHeight不能使用小数
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F5FCFF',
  }
});
