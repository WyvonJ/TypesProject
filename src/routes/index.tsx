import React from 'react';
import Ionicon  from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import theme from '../utils/theme';
// 导入页眉
import HomePage from '../containers/homepage/HomePage';
import SearchPage from '../containers/homepage/Search';
import CategoryPage from '../containers/categorypage/CategoryPage';

type IconType = {
  focused: boolean,
  tintColor: string
}


// 主页路由导览
// 创建底部tab导航栏
const HomeBottomTab = createBottomTabNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      tabBarLabel: '精选应用',
      tabBarIcon:  ({focused, tintColor} : IconType) => {
        <Ionicon name={`ios-home${focused ? '' : '-outline'}`} size={25}  color={tintColor} />
      }
    }
  },
  CategoryPage: {
    screen: CategoryPage,
    navigationOptions: {
      tabBarLabel: '英雄',
      tabBarIcon:  ({focused, tintColor} : IconType) => {
        <Ionicon name={`ios-app${focused ? '' : '-outline'}`} size={25}  color={tintColor} />
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


// 首页的标题切换栏
// const HomeCategoryTab = createMaterialTopTabNavigator({

// })


const AppContainer = createStackNavigator({
  HomeContent: HomePage,
  HomeBottomTab:{
    screen: HomeBottomTab,
    navigationOptions: {
      gestureEnabled: true,
      header: null
    }
  }
}, {
  // 定义渲染和转换的样式 card为标准切换 modal为iOS上的页面从屏幕底部滑入
  mode: 'card',
  // 指定页眉的呈现方式 iOS-float Android-screen
  headerMode: 'none',
  navigationOptions: ({ navigation } : any)=>({
    title: `${navigation.state.params.name}'s Profile`
  })
});


export default createAppContainer(AppContainer);