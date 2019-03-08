import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

type Props = {
  title: string;
  subTitle?: string;
  content: string;
};

export default class JoArticle extends React.Component<Props> {
  constructor(props: Props) {
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

    let comp = <View style={styles.content}>
      {
        contentArray.map((item)=>{
          if(item.type === 'text') {
            return <Text key={item.value} style={styles.plainText}>{item.value}</Text>
          } else {
            return <Image key={item.value} source={{uri: item.value}}></Image>
          }
        })
      }
    </View>

    return comp;
  }

  render() {
    const { title, subTitle, content } = this.props;
    return (
      <View style={styles.articleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        {this.parseAriticle(content)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  articleWrapper: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  title: {
    fontSize: 20
  },
  subTitle: {
    fontSize: 16
  },
  content: {},
  plainText: {
    fontSize: 17
  }
});
