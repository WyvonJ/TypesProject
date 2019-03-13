/* 每篇文章显示的页面 */

// declare module 'react-native-simple-markdown'

import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, Button, TouchableOpacity } from "react-native";
// import Markdown from "react-native-simple-markdown";
// import JoArticle from "../../components/JoArticle";
import {homepage} from '../../requests';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
type ArticleProps = {
  // title: string; // 文章标题
  // subTitle?: string;
  // createDate: string; // 文章创建日期
  // content: string; // 文章内容
  // source?: string; // 文章来源 选填,
  navigation: any
}

type ArticleState = {
  article: any,
  uriPrefix: string
}

const article = `[汽车之家 新闻]  SUV市场的巨大潜力促使各厂家在这一领域不断发力，今年的日内瓦车展上我们也看到了即将在今年推向全球市场的多款新SUV车型。除了传统燃油SUV外，插电混动车型也是此次车展上的重头戏，接下来我将带大家认识其中十余款未来可能会引入中国市场的新SUV。<br/><br/><img src=&quot;1.jpg&quot;/><br/>● 奥迪Q5 55 TFSIe插电混动版<br/>新车特点：动力系统为插电混动系统，WLTP标准纯电续航超40公里。<br/><br/>　　在刚刚开幕的2019年日内瓦车展上，奥迪发布了全新Q5插电式混动版车型，其型号为“55 TFSIe”。造型方面，新车整体外观造型与海外现款Q5燃油版无太大差异，同样采用了奥迪最新的外观设计语言，<strong>线条凌厉</strong>、力量感足，前大灯为配备了14颗LED单元的矩阵式LED灯组。<br/><br/><br/><br/><img src=&quot;2.jpg&quot;/><br/>`

const br = /<br\/>/g;
const strong = /<strong>([^\n]+)<\/strong>/g;
const image = /<img.*src=\&quot;([^\n]+)\&quot;\/>/;


class LogoTitle extends React.Component {
  render() {
    return (
      // <Icon name="star" color="#000"/>
      <Text>文章标题</Text>
    );
  }
}

export default class Article extends React.Component<
  ArticleProps,
  ArticleState
> {

  // navigationOptions中this绑定的不是Article实例 所以不能调用setState方法
  static navigationOptions =(navigation)=> ({
    headerTitle: <LogoTitle/>,
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerRight: (
      <TouchableOpacity style={{width: 40}} onPress={() =>{}}>
        <Icon name="share-variant" color="#000" size={20}></Icon>
      </TouchableOpacity>
    ),
    tabBarVisible: false
  })
  
  constructor(props: ArticleProps) {
    super(props);
    
    this.state = {
      article: {
        title: '',
        content: ''
      },
      uriPrefix: ''
    }
  }

  componentDidMount() {
    // console.warn(this.props.navigation.state)
    let article = this.props.navigation.state.params;
    this.setState({
      article,
      uriPrefix: article.pictureurl
    });
    this.props.navigation.setParams({ headerMode : 'screen' })
  }

  private parseArticle(content) {
    
    let result:any = [];
    let brArr = content.split(br);
    brArr.forEach((item, i)=>{
      // 空字符串
      if(item === '') {
        // '<Text style={plainText}></Text>'
        result.push({
          type: 'plainText',
          value: item
        });
      } else if(item.match(strong)) {
        // 加粗匹配
        let strongArr = strong.exec(item);
        let strongSplit='', strongText ='';
        if(strongArr) {
          [strongSplit, strongText] = strongArr
        }
        let plainText = item.split(strongSplit);
        // let strongResult =  `<Text style={plainText}>${plainText[0]}</Text><Text style={boldText}></Text><Text style={plainText}>${plainText[1]}</Text>`
        result.push([{
          type: 'plainText',
          value: plainText[0]
        }, {
          type: 'strongText',
          value: strongText
        }, {
          type: 'plainText',
          value: plainText[1]
        }]);
        // console.log(result)
      } else if(item.match(image)) {
        let uri = image.exec(item);
        let source;
        if(uri) {
          source =  this.state.uriPrefix + '/' + uri[1]
        }
        
        // result += '<Image style={image} source={uri} />'
        result.push({
          type: 'image',
          value: source
        });
      } else  {
        // result += `<Text style={plainText}>${item}</Text>`
        result.push({
          type: 'plainText',
          value: item
        })
      }
    })
    // console.warn(result)
    let articleComp = result.map((item, i)=>{
      let {type, value} = item;
      if(type === 'plainText') {
        return <Text key={i} style={styles.plainText}>{value}</Text>
      } else if(type === 'strongText') {
        return <Text key={i} style={styles.strongText}>{value}</Text>
      } else if(type === 'image') {
        return <Image key={i} source={{ uri: value }} style={styles.image} resizeMode="contain"/>;
      }
    });

    return articleComp;
  }

  private parseAriticle(content): any {
    let br = /\<br\/>/g;
    let regex = /!\[.*\]\((.*)\)/g;
    let contentArray: any = [];
    let result = content.split(br);
    let uriRegex = /\((.*)\)/g;
    let strongEx = /\*\*([^(\n|\*)]*)\*\*/g
    result.forEach(item => {
      let mat = item.match(regex);
      if (mat) {
        // 判断为image
        let val = item
          .match(uriRegex)[0]
          .replace("(", "")
          .replace(")", "");
        contentArray.push({
          type: "image",
          value: val
        });
      } else {
        // 判断为text
        let strongArr = item.match(strongEx)
        contentArray.push({
          type: "text",
          value: item
        });
      }
    });

    let comp = (
      <View style={styles.content}>
        {contentArray.map(item => {
          if (item.type === "text") {
            return <Text key={item.value} style={styles.plainText}>{item.value}</Text>;
          } else {
            return <Image key={item.value} source={{ uri: item.value }} style={styles.image} resizeMode="contain"/>;
          }
        })}
      </View>
    );

    return comp;
  }

  render() {
    // const { title, subTitle ,content } = this.props;
    // let title = '王者荣耀3个被下架英雄 八神版权费太贵，另外两个却是因侵权';
    // let subTitle = '18183 小胖 2019-03-06'
    // let content = article;
    let {title, source, content}  = this.state.article;
    if(content === null) {
      content = '';
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>

          <View style={styles.articleWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{source}</Text>
            {this.parseArticle(content)}
          
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header1: {
    fontSize: 20,
    color: 'black'
  },
  blankSpace: {
    width: 5
  },
  image: {
    position: "relative",
    left: 0,
    width: 440,
    height: 240
  },
  scrollView: {
    paddingLeft: 9,
    paddingRight: 9
  },
  content: {
    
  },
  articleWrapper: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  subTitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    marginBottom: 4,
  },
  plainText: {
    fontSize: 16,
    color: '#222'
  },
  strongText: {
    fontSize: 16,
    fontWeight: "500"
  }
});
