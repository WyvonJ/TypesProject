import React from "react";
import { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { homepage } from "../../requests";
import theme from "../../utils/theme";
// import console = require('console');
type Props = {
  navigation: any;
};
type State = {
  refreshing: boolean;
  loadedData: boolean;
  dataBlob: [];
  articleList: Array<ArticleProps>;
};

type ArticleProps = {
  image: string; // 标题图
  title: string; // 标题
  source: string; // 标题
  intro?: string; // 内容简介
  hashtag?: string; // #
  likes: number; // 点赞数
  views: number; // 查看数
  gotoArticle?: Function; // 跳转函数
  content: string; // 文章内容
};

const ArticleItem = article => {
  const {
    image,
    title,
    hashtag = "这是话题",
    likes = 8888,
    views = 8888,
    gotoArticle = () => {}
  } = article;
  let sliceTitle = title.length < 20 ? title : title.slice(0, 20);
  
  return (
    <TouchableOpacity
      style={articleStyles.wrapper}
      onPress={() => {
        gotoArticle();
      }}
    >
      <View style={{flex: 1, flexDirection: "row"}}>
        <Image source={{ uri: image }} style={articleStyles.image} />
      </View>
      <View style={{flex: 2}}>
        <View style={{flex: 1}}>
          <Text style={articleStyles.title}>{sliceTitle}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={articleStyles.hashtagWrapper}>
            <Text style={articleStyles.hashtag}>#{hashtag}</Text>
          </View>
          <View style={{flex: 2}}></View>
          <View style={articleStyles.actionsWrapper}>
            <Icon name="eye" size={12}/>
            <Text style={{color: 'black'}}>{views}</Text>
            <Icon name="thumb-up" size={12}/>
            <Text style={{color: 'black'}}>{likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const articleStyles = StyleSheet.create({
  wrapper: {
    height: 80,
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingTop: 4,
    paddingBottom: 4
  },
  image: {
    width: 80,
    height: 80
  },
  titleWrapper: {},
  title: {
    color: 'black',
    fontSize: 15
  },
  hashtagWrapper: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  actionsWrapper: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  hashtag: {
    color: theme.darkGray
  },
  likes: {},
  
});
const ListHeaderComponent = (image)=>{
  return (
    <View style={{flex: 1, height: 140}}>
      <Image style={{flex: 1}} source={{uri: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1603726335,3963845248&fm=26&gp=0.jpg"}} resizeMode="contain"/>
    </View>
  )
}
export default class Heat extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: false,
      loadedData: false,
      dataBlob: [],
      articleList: []
    };
  }

  componentDidMount() {
    this.setState({
      articleList: [
        {
          title: "标题文本维尔好",
          source: "未知来源",
          hashtag: "#metoo",
          likes: 5124,
          views: 1254,
          content: "我越过了时间 越过了终点",
          image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552387343763&di=f132fec76e5ee89ec728896108952a51&imgtype=0&src=http%3A%2F%2Fwww.urcities.com%2Fu%2Fcms%2Fwww%2F201509%2F02162709ugc1.jpg"
        }
      ]
    });

    this.getHeatArticleList();
  }

  render() {
    const { articleList, refreshing } = this.state;
    return (
      <View style={styles.container}>
        {/* <Button
          title="跳转"
          onPress={() => {
            this.props.navigation.navigate("ArticleDetail");
            this.getHeatArticleList();
          }}
        />
        <Button
          title="获取"
          onPress={() => {
            this.getBaidu();
          }}
        /> */}
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          style={styles.listStyle}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleEndReached}
          onEndReachedThreshold={0}
          data={articleList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, separators }) => (
            <ArticleItem
              key={item.title}
              gotoArticle={() => {
                this.gotoArticleDetail(item);
              }}
              title={item.title}
              source={item.source}
              image={item.image}
              views={item.views}
              likes={item.likes}
            />
          )}
        />
      </View>
    );
  }

  private gotoArticleDetail(article) {
    this.props.navigation.navigate("ArticleDetail", article);
  }

  // 处理下拉刷新
  private handleRefresh() {
    // this.setState({refreshing: true});
  }

  // 处理下滑到底部 根据onEndReachedThreshold计算还有多远到达底部
  private handleEndReached() {
    // this.setState({refreshing: true});
  }

  private fetchData() {}

  private getBaidu() {
    homepage.getBaidu({}).then(res => {
      console.error(res);
    });
  }

  // 获取首页文章列表
  private getHeatArticleList() {
    let opt = {
      limit: 10,
      offset: 0
    };
    homepage
      .getHeatArticleList(opt)
      .then(({ data }) => {
        // console.error(data);
        this.setState({
          articleList: data.data.infoList
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  articleTouchable: {
    flex: 1,
    height: 80
  },
  articleList: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
    height: 400
  }
});
