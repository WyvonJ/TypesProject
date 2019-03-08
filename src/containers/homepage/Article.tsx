/* 每篇文章显示的页面 */

// declare module 'react-native-simple-markdown'

import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
// import Markdown from "react-native-simple-markdown";
// import JoArticle from "../../components/JoArticle";
type ArticleProps = {
  title: string; // 文章标题
  subTitle?: string;
  createDate: string; // 文章创建日期
  content: string; // 文章内容
  source?: string; // 文章来源 选填
}

type ArticleState = {}

const article = `王者荣耀现在峡谷的英雄其实已经很多了，但是还是有几个英雄却因为不同的原因下架了，而以下这三个英雄则是玩家最惋惜没有上架的。内测英雄艾琳、曝光后没有下文的八神以及最初版本的杨玉环。<br/>1、艾琳<br/>艾琳是一个老玩家才拥有的英雄、新玩家对此可能并没有什么意见、但是拥有这个英雄的老玩家可能会说并没有下线呀！虽然是是没有下线但是已经无法获得了、其实这个英雄是因为与联盟里面的寒冰射手太过于相似侵犯了版权、所以官方决定下架并且推出后羿！<br/>![](http://img.18183.com/uploads/allimg/151204/36-151204104Z4.jpg) <br/>2、八神庵<br/>这个英雄估计新老玩家应该知道的都不多因为这个英雄并没有上线、当时官方在活动中发起投票猫王与不知火舞上线一个英雄、很明显玩家们当然是要八神但是官方直接出了个不知火舞、原因并没有说、不过有人流出出八神的代理费太贵了、所以官方先出了个不知火舞！<br/>![](http://img.18183.com/uploads/allimg/160106/36-160106134K4.jpg) <br/>`

export default class Article extends React.Component<
  ArticleProps,
  ArticleState
> {
  constructor(props: ArticleProps) {
    super(props);
  }

  private parseAriticle(content): any {
    let br = /\<br\/>/g;
    let regex = /!\[.*\]\((.*)\)/g;
    let contentArray: any = [];
    let result = content.split(br);
    let uriRegex = /\((.*)\)/g;
    result.forEach(item => {
      let mat = item.match(regex);
      if (mat) {
        let val = item
          .match(uriRegex)[0]
          .replace("(", "")
          .replace(")", "");
        contentArray.push({
          type: "image",
          value: val
        });
      } else {
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
    let title = '王者荣耀3个被下架英雄 八神版权费太贵，另外两个却是因侵权';
    let subTitle = '18183 小胖 2019-03-06'
    let content = article;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* <Markdown styles={markdownStyles}>
      王者荣耀3个被下架英雄 八神版权费太贵，另外两个却是因侵权 <br/>
      18183 小胖 2019-03-06<br/>
      王者荣耀现在峡谷的英雄其实已经很多了，但是还是有几个英雄却因为不同的原因下架了，而以下这三个英雄则是玩家最惋惜没有上架的。内测英雄艾琳、曝光后没有下文的八神以及最初版本的杨玉环。<br/>
      1、艾琳<br/>
      艾琳是一个老玩家才拥有的英雄、新玩家对此可能并没有什么意见、但是拥有这个英雄的老玩家可能会说并没有下线呀！虽然是是没有下线但是已经无法获得了、其实这个英雄是因为与联盟里面的寒冰射手太过于相似侵犯了版权、所以官方决定下架并且推出后羿！<br/>
      ![](http://img.18183.com/uploads/allimg/151204/36-151204104Z4.jpg) <br/>
      2、八神庵<br/>
      {'  '}这个英雄估计新老玩家应该知道的都不多因为这个英雄并没有上线、当时官方在活动中发起投票猫王与不知火舞上线一个英雄、很明显玩家们当然是要八神但是官方直接出了个不知火舞、原因并没有说、不过有人流出出八神的代理费太贵了、所以官方先出了个不知火舞！<br/>
      ![](http://img.18183.com/uploads/allimg/160106/36-160106134K4.jpg) <br/>

      </Markdown> */}
          {/* <Text style={styles.header1}>
        王者荣耀3个被下架英雄 八神版权费太贵，另外两个却是因侵权
      </Text>
      <Text style={styles.header1}>
        18183 小胖 2019-03-06
      </Text>
      <Text style={styles.content}>
      {'      '}王者荣耀现在峡谷的英雄其实已经很多了，而我剧敶但是还是有几个英雄却因为不同的原因下架了，而以下这三个英雄则是玩家最惋惜没有上架的。内测英雄艾琳、曝光后没有下文的八神以及最初版本的杨玉环。
      </Text> 
      <Image source={{uri: 'http://img.18183.com/uploads/allimg/151204/36-151204104Z4.jpg'}} style={styles.image} resizeMode="contain">
      </Image> */}

          <View style={styles.articleWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
            {this.parseAriticle(content)}
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
    fontSize: 20
  },
  blankSpace: {
    width: 5
  },
  image: {
    width: 340,
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
    paddingRight: 8
  },
  title: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 16
  },
  plainText: {
    fontSize: 17
  }
});
