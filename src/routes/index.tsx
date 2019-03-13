import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import theme from "../utils/theme";
// 导入页眉
import HomePage from "../containers/homepage/HomePage";
import VideoPage from "../containers/videopage/VideoPage";
import DiscoverPage from "../containers/discoverpage/DiscoverPage";
import AssistPage from "../containers/assistpage/AssistPage";
import UserPage from "../containers/userpage/UserPage";

// HomePage 里的顶部tab
import HeatPage from "../containers/homepage/Heat"; // 热门
import WeekFree from "../containers/homepage/WeekFree"; // 周免
import Competition from "../containers/homepage/Competition"; // 赛事
// HomePage 里的二级页面
import ArticleDetail from "../containers/homepage/ArticleDetail";
import WeekFreeDetail from "../containers/homepage/WeekFreeDetail";
import CompetitionDetail from "../containers/homepage/CompetitionDetail";

import SearchPage from "../containers/homepage/Search";

type IconType = {
  focused: boolean;
  horizontal: boolean;
  tintColor: string;
};

// 1. 使用createStackNavigator建立Stack，然后使用createBottomTabNavigator包裹刚创建的stack
// 缺点为子页面也含有tab， 需要在每个stack中判断
// 2. 或者使用stack包裹一个tab和n多screen

// 首页的标题切换栏
// const HomeCategoryTab = createMaterialTopTabNavigator({

// })

// 创建主页的导航
const HomeTab = createMaterialTopTabNavigator(
  {
    Heat: {
      screen: HeatPage,
      navigationOptions: {
        tabBarLabel: "热门"
      }
    },
    WeekFree: {
      screen: WeekFree,
      navigationOptions: {
        tabBarLabel: "周免"
      }
    },
    Competition: {
      screen: Competition,
      navigationOptions: {
        tabBarLabel: "赛事"
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      // tabStyle: {
      //   width: 100,
      // },
      style: {
        backgroundColor: "blue"
      }
    }
  }
);

HomeTab.navigationOptions = ({ navigation }: any) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  // You can do whatever you like here to pick the title based on the route name
  let headerTitle = routeName;
  console.error(routeName);
  
  if(routeName === 'User'){

  }
  return {
    headerTitle,
    tabBarVisible: false
  };
};

const HomeStack = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null
      }
    },
    // 文章具体内容页
    ArticleDetail: {
      screen: ArticleDetail,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    // 周免详情页
    WeekFreeDetail: {
      screen: WeekFreeDetail
    },
    // 赛事详情页
    CompetitionDetail: {
      screen: CompetitionDetail
    }
  },
  {
    mode: "card",
    headerMode: 'screen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.primary
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

// 创建辅助页面的导航
const AssistStack = createStackNavigator({
  AssistPage: {
    screen: AssistPage,
    
  }
});

// 创建辅助页面的导航
const VideoStack = createStackNavigator({
  VideoPage: {
    screen: VideoPage
  }
});

// 创建辅助页面的导航
const DiscoverStack = createStackNavigator({
  DiscoverPage: {
    screen: DiscoverPage
  }
});

const UserStack = createStackNavigator({
  UserPage: {
    screen: UserPage
  }
});

// 定义渲染和转换的样式 card为标准切换 modal为iOS上的页面从屏幕底部滑入
// mode: 'card',
// 指定页眉的呈现方式 iOS-float Android-screen
// headerMode: 'none',
// navigationOptions: ({ navigation } : any)=>({
// title: `${navigat1ion.state.params.name}'s Profile`

// 主页路由导览
// 创建底部tab导航栏
const BottomTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "精选",
        tabBarIcon: ({ focused, horizontal, tintColor }: IconType) => (
          <Icon name={`star`} size={25} color={tintColor} />
        )
      }
    },
    VideoPage: {
      screen: VideoStack,
      navigationOptions: {
        tabBarLabel: "视频",
        tabBarIcon: ({ focused, horizontal, tintColor }: IconType) => (
          <Icon name={`youtube-tv`} size={25} color={tintColor} />
        )
      }
    },
    DiscoverPage: {
      screen: DiscoverStack,
      navigationOptions: {
        tabBarLabel: "发现",
        tabBarIcon: ({ focused, horizontal, tintColor }: IconType) => (
          <Icon name={`eye-circle-outline`} size={25} color={tintColor} />
        )
      }
    },
    AssistPage: {
      screen: AssistStack,
      navigationOptions: {
        tabBarLabel: "辅助",
        tabBarIcon: ({ focused, horizontal, tintColor }: IconType) => (
          <Icon name={`gamepad`} size={25} color={tintColor} />
        )
      }
    },
    UserPage: {
      screen: UserStack,
      navigationOptions: {
        tabBarLabel: "个人",
        tabBarIcon: ({ focused, horizontal, tintColor }: IconType) => (
          <Icon name={`account-circle-outline`} size={25} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: theme.primary,
      inactiveBackgroundColor: theme.white,
      inactiveTintColor: theme.darkGray
    }
  }
);



export default createAppContainer(BottomTabNavigator);
