import React from 'react';
import Ionicon  from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import theme from '../utils/theme';
// 导入页眉
import HomePage from '../containers/homepage/HomePage';
import VideoPage from '../containers/videopage/VideoPage';
import DiscoverPage from '../containers/discoverpage/DiscoverPage';
import AssistPage from '../containers/assistpage/AssistPage';
import UserPage from '../containers/userpage/UserPage';

// HomePage 里的顶部tab
import HeatPage from '../containers/homepage/Heat'; // 热门
import WeekFree from '../containers/homepage/WeekFree'; // 周免
import Competition from '../containers/homepage/Competition'; // 赛事
// HomePage 里的二级页面
import Article from '../containers/homepage/Article';

import SearchPage from '../containers/homepage/Search';

type IconType = {
  focused: boolean;
  horizontal: boolean;
  tintColor: string;
}

// 1. 使用createStackNavigator建立Stack，然后使用createBottomTabNavigator包裹刚创建的stack
// 缺点为子页面也含有tab， 需要在每个stack中判断
// 2. 或者使用stack包裹一个tab和n多screen




// 首页的标题切换栏
// const HomeCategoryTab = createMaterialTopTabNavigator({

// })

// 创建主页的导航
const HomeTab = createMaterialTopTabNavigator({
  Heat: {
    screen: HeatPage,
    navigationOptions: {
      tabBarLabel: '热门'
    }
  },
  WeekFree: {
    screen: WeekFree,
    navigationOptions: {
      tabBarLabel: '周免'
    }
  },
  Competition: {
    screen: Competition,
    navigationOptions: {
      tabBarLabel: '赛事'
    }
  }
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
    },
    tabStyle: {
      width: 100,
    },
    style: {
      backgroundColor: 'red',
    },
  }});

HomeTab.navigationOptions = ({navigation}: any)=>{
  // console.error(navigation)
}

const HomeStack = createStackNavigator({
  HomeTab: {
    screen: HomeTab
  },
  Article: {
    screen: Article
  }
})

// 创建辅助页面的导航
// const AssistStack = createMaterialTopTabNavigator({

// });


  // 定义渲染和转换的样式 card为标准切换 modal为iOS上的页面从屏幕底部滑入
  // mode: 'card',
  // 指定页眉的呈现方式 iOS-float Android-screen
  // headerMode: 'none',
  // navigationOptions: ({ navigation } : any)=>({
    // title: `${navigat1ion.state.params.name}'s Profile`



// 主页路由导览
// 创建底部tab导航栏
const AppContainer = createBottomTabNavigator({
  HomePage: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '精选',
      tabBarIcon:  ({focused, horizontal ,tintColor} : IconType) => (
        <Ionicon name={`adobe`} size={25}   color={tintColor} />
      )
    }
  },
  VideoPage: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '视频',
      tabBarIcon:  ({focused, horizontal ,tintColor} : IconType) => (
        <Ionicon name={`bars`} size={25}  color="#FF4433" />
      )
    }
  },
  DiscoverPage: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '发现',
      tabBarIcon:  ({focused, horizontal ,tintColor} : IconType) => (
        <Ionicon name={`barcode`} size={25}  color={tintColor} />
      )
    }
  },
  AssistPage: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '辅助',
      tabBarIcon:  ({focused, horizontal ,tintColor} : IconType) => (
        <Ionicon name={`bit-coin`} size={25}  color={tintColor} />
      )
    }
  },
  UserPage: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: '个人',
      tabBarIcon:  ({focused, horizontal ,tintColor} : IconType) => (
        <Ionicon name={`bluetooth`} size={25}  color={tintColor} />
      )
    }
  }
} , {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: theme.primary,
    inactiveBackgroundColor: theme.lightGray,
    inactiveTintColor: theme.darkGray
  }
});

export default createAppContainer(AppContainer);