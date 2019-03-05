import React from 'react';
import { Component } from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl} from 'react-native';

interface Props {
  name: string;
}
interface State {
  refreshing: boolean;
  loadedData: boolean;
  dataBlob: [];
}

export default class HomeTab extends Component<Props, State> {
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
      <ScrollView
      style={{}}
      >

      </ScrollView>
    )
  }

  private onRefresh()  {
    this.setState({refreshing: true});
  }

  private fetchData() {
    
  }
}