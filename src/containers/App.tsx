
// import React, {Component} from 'react';
// 同时使用默认导出和命名导出会导致报错
import React from 'react';
import { Component } from 'react';
// Text Button为原生组件
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

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
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if((props.enthusiasmLevel || 0) <= 0) {
      throw new Error('You shall die');
    }

    this.state = {
      enthusiasmLevel: props.enthusiasmLevel || 1
    };

  }

  onIncrement = () => {this.setState({enthusiasmLevel: this.state.enthusiasmLevel + 1})};

  onDecrement = () => {this.setState({enthusiasmLevel: this.state.enthusiasmLevel - 1})};

  getExclamationMarks = (numChars: number) => {
    Array(numChars + 1).join('!');
  }
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          {instructions}
          Hello{' '}
          { this.props.name + this.getExclamationMarks(this.state.enthusiasmLevel) }
        </Text>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="-" onPress={this.onDecrement} accessibilityLabel="decrement" color="red" />
          </View>
          <View style={styles.button}>
            <Button title="+" onPress={this.onIncrement} accessibilityLabel="increment" color="blue" />
          </View>
        </View>
      </View>
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
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#009688'
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  }
});
