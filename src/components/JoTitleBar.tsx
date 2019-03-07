import React from "react";
import theme from "../utils/theme";
import PropTypes from "prop-types";
import {width, unitWidth,titleHeight, statusBarHeight} from '../utils/screenUtil'
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

type Props = {
  title?: string;
  navigation: any;
  hideLeftArrow: boolean;
  pressLeft?: Function;
  backgroundColor: string;
  titleColor: string;
  statusBarBgColor: string;
  left: string;
  right: string;
  barStyle: any;
};

type State = {};

export default class JoTitleBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  back() {
    if (this.props.pressLeft) {
      return this.props.pressLeft;
    }
    this.props.navigation.goBack();
  }

  render() {
    const { backgroundColor, titleColor } = this.props;
    return (
      <View
        style={[
          styles.titleBar,
          backgroundColor ? { backgroundColor: backgroundColor } : null
        ]}
      >
        <StatusBar
          backgroundColor={this.props.statusBarBgColor || "transparent"}
          barStyle={this.props.barStyle || "light-content"}
          translucent={true}
        />
        <View style={styles.statusBar} />

        <View style={styles.titleBarContent}>
          {this.props.hideLeftArrow ? (
            <View style={styles.left} />
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.back.bind(this)}
              style={styles.left}
            >
              <Text style={styles.leftText}>{this.props.left}</Text>
            </TouchableOpacity>
          )}
          <View style={styles.middle}>
            <Text
              numberOfLines={1}
              style={[
                styles.middleTitle,
                titleColor ? { color: titleColor } : null
              ]}
            >
              {this.props.title}
            </Text>
          </View>
          {this.renderRight()}
        </View>
      </View>
    );
  }

  renderRight() {
    
  }
}

const styles = StyleSheet.create({
  titleBar: {
    width: width,
    height: titleHeight,
    backgroundColor: theme.primary
  },
  titleBarContent: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    justifyContent: "space-between",
    height: titleHeight - statusBarHeight
  },
  titleBarSearchContent: {
    flexDirection: "row",
    height: titleHeight,
    alignItems: "center",
    width: width,
  },
  searchLeftIcon: {
    width: unitWidth * 30,
    height: unitWidth * 38,
    resizeMode: "stretch",
    marginLeft: unitWidth * 24,
    marginRight: unitWidth * 15
  },
  searchLeftText: {
    width: unitWidth * 140,
    fontSize: unitWidth * 30,
    color: "#ffffff"
  },

  searchBlock: {
    flexDirection: "row",
    width: unitWidth * 500,
    height: unitWidth * 60,
    borderRadius: unitWidth * 30,
    backgroundColor: "white",
    alignItems: "center",
    paddingLeft: unitWidth * 30,
    paddingRight: unitWidth * 30
  },

  searchIcon: {
    width: unitWidth * 40,
    height: unitWidth * 40,
    resizeMode: "stretch",
    marginRight: unitWidth * 30
  },

  searchBarInput: {
    width: unitWidth * 350,
    height: unitWidth * 60,
    fontSize: unitWidth * 30,
    backgroundColor: "transparent",
    alignItems: "center",
    margin: 0,
    padding: 0
  },

  left: {
    width: unitWidth * 180,
    height: titleHeight,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: unitWidth * 10
  },
  middle: {
    width: width - unitWidth * 360,
    height: titleHeight,
    justifyContent: "center",
    alignItems: "center"
  },
  middleTitle: {
    fontSize: unitWidth * 40,
    color: "white",
    alignItems: "center",
    justifyContent: "center"
  },

  right: {
    width: unitWidth * 180,
    height: titleHeight,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: unitWidth * 30
  },

  leftText: {
    fontSize: unitWidth * 30,
    color: "white",
    alignItems: "center",
    justifyContent: "center"
  },

  rightText: {
    fontSize: unitWidth * 30,
    color: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  rightImage: {
    width: unitWidth * 60,
    height: unitWidth * 60,
    resizeMode: "contain",
    marginLeft: unitWidth * 5
  },

  titleLeftImage: {
    width: unitWidth * 50,
    height: unitWidth * 35,
    marginRight: unitWidth * 5,
    resizeMode: "contain"
  },
  homeTitleIcon: {
    width: unitWidth * 213,
    height: unitWidth * 52,
    resizeMode: "stretch"
  },
  titleRightImage: {
    width: unitWidth * 65,
    height: unitWidth * 65,
    resizeMode: "contain"
  },
  statusBar: {
    width: width,
    height: statusBarHeight,
    backgroundColor: "transparent"
  }
});
