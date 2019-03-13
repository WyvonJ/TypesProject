import React from 'react';
import { Component } from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl, StatusBar, Button, Keyboard} from 'react-native';

interface Props {
  navigation: any;
}
interface State {
  refreshing: boolean;
  loadedData: boolean;
  dataBlob: [];
}

export default class WeekFree extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
        refreshing: true,
        loadedData: false,
        dataBlob: []
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}
        <Text>周免内容咔咔咔咔咔咔扩扩</Text>
      </View>
    )
  }

  private onRefresh()  {
    this.setState({refreshing: true});
  }

  private fetchData() {

  }

  private onButtonClicked() {
    
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  boxStyle:{
    width: 200,
    height: 200,
    padding: 30, //内边距
    margin: 50, //外边距
    borderWidth: 20, //边框宽度
    borderColor: 'green', //边框颜色
  }
})