import React from 'react';
import { PureComponent } from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl, StatusBar, Button} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import JoTabBar from '../../components/JoTabBar';
import Icon from "react-native-vector-icons/FontAwesome5";

type TabType = {
  text: string;
  icon: Icon;
  activeIcon: Icon;
};
type Props = {
  name: string;
  navigation: any;
}
type State = {
  tabShow: boolean
}

export default class WeekFreeDetail extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tabShow: false,
    };
  }



  componentDidMount() {
    setTimeout(() => {
      this.setState({
          tabShow: true
      });
    }, 0)
  }

  render() {
    
    const tabs = [{
      text: '第一个',
      icon: <Icon  name={`adobe`} size={25}  color="#F45698"></Icon>,
      activeIcon: <Icon  name={`bluetooth`} size={25}  color="#F45698"></Icon>,
    }]

    // const {activeTab} = this.state;

    return (
      <ScrollableTabView tabBarPosition="top" initialPage={0} renderTabBar={()=><ScrollableTabBar />}>
        <Text>project</Text>
        <Text>favorite</Text>
        <Text>project</Text>
      </ScrollableTabView>
    )
  }

  private gotoTab() {
    // this.setState({ activeTab: 1 })
  }

  private onRefresh()  {
    // this.setState({refreshing: true});
  }

  private fetchData() {

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