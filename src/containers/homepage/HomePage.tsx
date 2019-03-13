import React from "react";
import { PureComponent } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
  Button,
  DeviceEventEmitter
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {
  DefaultTabBar,
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import JoTabBar from "../../components/JoTabBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Heat from './Heat';
import WeekFree from './WeekFree';
import Competition from './Competition';
type TabType = {
  text: string;
  icon: Icon;
  activeIcon: Icon;
};
interface Props {
  name: string;
  navigation: any;
}
interface State {
  activeTab: number;
}

export default class HomePage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: 0
    };
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('EVENT_SEARCH', (data)=>{
      // 弹出搜索页面
      console.warn(data, 'EVENT_SEARCH');
    }, this);
  }

  render() {
    const { activeTab } = this.state;

    return (
      <ScrollableTabView
        tabBarPosition="top"
        initialPage={0}
        page={activeTab}
        renderTabBar={() => (
          <JoTabBar
            backgroundColor={"#f4f4f4"}
            tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
            tabUnderlineScaleX={3} // default 3
            activeColor={"#0af"}
            inactiveColor={"#333"}
            goToPage={()=>{}}
          />
        )}
      >
        <View tabLabel="热门" style={styles.tabView}>
          <Heat navigation={this.props.navigation}/>
        </View>
        <View tabLabel="周免" style={styles.tabView}>
          <WeekFree navigation={this.props.navigation}/>
        </View>
        <View tabLabel="赛事" style={styles.tabView}>
          <Competition navigation={this.props.navigation}></Competition>
        </View>
      </ScrollableTabView>
    );
  }

  private onRefresh() {
    // this.setState({refreshing: true});
  }

  private fetchData() {}
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1
  }
});
