
// import React, {Component} from 'react';
// 同时使用默认导出和命名导出会导致报错
import React from 'react';
import { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
// yarn add @types/react-navigation 添加ts的.d.ts类型支持
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
// Text Button为原生组件
// import CardStackStyleInterpolator from 'react-navigation'
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import { Platform, StyleSheet, Text, AsyncStorage } from 'react-native';
// 自定义主题文件
import theme from '../utils/theme';
// 底部Tab页面
import HomePage from './homepage/HomePage';
import SearchPage from './homepage/Search';
import AssistPage from './assistpage/AssistPage';
// homepage的顶部Tab页面


// import { Provider } from 'react-redux';
// import { homepage } from '../requests/homepage';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// export interface Props {
//   name: string;
//   enthusiasmLevel?: number;
// }
// interface声明后在任意地方可用，可进行组合和继承
interface State {
  enthusiasmLevel: number;
  content: string
}
// type声明后只能在当前作用域使用，且无法拓展
type iconType = {
  focused: boolean,
  tintColor: string
}

// 首页的标题切换栏
// const CategoryTab = createMaterialTopTabNavigator({
//   HeatPage: {

//   },
// })

// 创建底部tab导航栏
const BottomTab = createBottomTabNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '精选',
      tabBarIcon:  ({focused, tintColor} : iconType) => {
        <Icon name={`ios-home${focused ? '' : '-outline'}`} size={25}  color={tintColor}></Icon>
      }
    }
  },
  AssistPage: {
    screen: AssistPage,
    navigationOptions: {
      tabBarLabel: '英雄',
      tabBarIcon:  ({focused, tintColor} : iconType) => {
        <Icon name={`ios-app${focused ? '' : '-outline'}`} size={25}  color={tintColor}></Icon>
      }
    }
  }
} , {
  tabBarOptions: {
    activeTintColor: theme.primary,
    inactiveBackgroundColor: theme.lightGray,
    inactiveTintColor: theme.darkGray
  }
});


const App = createStackNavigator({
  HomeContent: HomePage
  // BottomTab:{
  //   screen: BottomTab,
  //   navigationOptions: {
  //     gestureEnabled: true,
  //     header: null
  //   }
  // },
  // HomeSearch: {
  //   screen: SearchPage,
  //   navigationOptions: {
  //     gestureEnabled: true,
  //     header: null
  //   }
  // }
}, {
  // 定义渲染和转换的样式 card为标准切换 modal为iOS上的页面从屏幕底部滑入
  mode: 'card',
  // 指定页眉的呈现方式 iOS-float Android-screen
  headerMode: 'none',
  navigationOptions: ({ navigation } : any)=>({
    title: `${navigation.state.params.name}'s Profile`
  })
})

const AppContainer = createAppContainer(App)

export default AppContainer ;


// 只有Text里的Text的样式才继承，其他全部需要单独写样式
// View内部的元素不要超出父级的范围
// lineHeight不能使用小数
