import React from 'react';
import { Component } from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl, StatusBar, Button, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
type Props = {
  name: string;
  navigation: any;
}
type State = {
  refreshing: boolean;
  loadedData: boolean;
  dataBlob: [];
  articleList: Array<ArticleProps>;
}

type ArticleProps = {
  image: string; // 标题图
  title: string; // 标题
  intro?: string; // 内容简介
  hashtag?: string; // #
  likes: number; // 点赞数
  views: number; // 查看数
}


class ArticleItem extends Component<ArticleProps> {
  constructor(props: ArticleProps) {
    super(props)
  }
  render(){
    const {image, title, intro, hashtag, likes, views} = this.props;
    return (<View style={articleStyles.wrapper}>
      <View>
        <Image source={{uri: image}}/>
      </View>
      <View>
        <View>{title}</View>
        <View>
          <View>{hashtag}</View>
          <View>
            <Icon name="star"></Icon>
            <Text>{views}</Text>
            <Icon name="star"></Icon>
            <Text>{likes}</Text>
          </View>
        </View>
      </View>
    </View>)
  }
}

export default class HeatPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
        refreshing: true,
        loadedData: false,
        dataBlob: [],
        articleList: []
    };
  }

  componentDidMount() {
    this.setState({
      articleList: [{
        title: 'zuiqianwanghzsd',
        hashtag: 'kkkafhjw',
        likes: 5124,
        views: 1254,
        image: ''
      }]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }

  private onRefresh()  {
    this.setState({refreshing: true});
  }

  private fetchData() {

  }

  // 获取首页文章列表
  private getHeatPages() {

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

const articleStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image:{
    width: 200,
    height: 200,
  },
  title: {

  },
  hashtag: {

  },
  likes: {

  }
})