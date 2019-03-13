import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Animated,
  StyleSheet,
  Text,
  Platform,
  DeviceEventEmitter
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { width } from '../utils/screenUtil';
type TabType = {
  text: string;
  // icon: Icon;
  // activeIcon: Icon;
};

interface Props {
  // textStyle: any;
  activeColor: string;
  inactiveColor: string;
  // containerWidth: number;
  tabUnderlineDefaultWidth: number;
  tabUnderlineScaleX: number;
  // underlineStyle: string;
  backgroundColor: string;
  goToPage: Function;
  // style: any;
  activeTab?: number;
  scrollValue?: any;
  tabs?: Array<any>;
};

const ButtonAndroid = props => (
  <TouchableNativeFeedback
    delayPressIn={0}
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>
);

const ButtoniOS = props => (
  <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
);

// 每个Tab

export default class JoTabBar extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    // const { textStyle } = this.props;
    const textColor = isTabActive
      ? this.props.activeColor
      : this.props.inactiveColor;

    const fontWeight = isTabActive ? "bold" : "normal";

    const Button = Platform.OS == "ios" ? ButtoniOS : ButtonAndroid;

    return (
      <Button
        style={{ flex: 1, justifyContent:"center" }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={styles.tab}>
          <View>
            <Text style={[{ color: textColor, fontWeight }]}>{name}</Text>
          </View>
          <View style={styles.tabIndicator}></View>
        </View>
      </Button>
    );
  }

  private searchArticle() {
    // DeviceEventEmitter.emit('EVENT_SEARCH');
    
  }

  render() {
    let { tabs } = this.props;
    let $tabs = tabs ? tabs : [];
    return (
      <View
        style={[
          styles.tabs,
          { backgroundColor: this.props.backgroundColor }
          // this.props.style
        ]}
      >
        <TouchableOpacity
          onPress={this.searchArticle}
          style={styles.searchButton}
        >
          <View style={{flex: 1, alignContent:"center", justifyContent: "center"}}>
            <Icon name="magnify" size={26} />
          </View>
        </TouchableOpacity>
          {
            $tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page;
              return this.renderTab(name, page, isTabActive, this.props.goToPage);
            })
          }
          {/* {this.renderUnderline()} */}
          
          <TouchableOpacity
          onPress={()=>{}}
          style={styles.searchButton}
        >
          <View style={{flex: 1, alignContent:"center", justifyContent: "center"}}>
            <Icon name="bell" size={26} />
          </View>
        </TouchableOpacity>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    width: width,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#F4F4F4"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIndicator: {
    // flex: 1,
    // height: 2,
    // borderRadius: 2,
    // backgroundColor: "#f45"
  },
  searchButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  notificationButton: {

  }
});
