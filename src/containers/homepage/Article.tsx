/* 每篇文章显示的页面 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ArticleProps {
  title: string, // 文章标题
  createDate: string, // 文章创建日期
  content: string, // 文章内容
  source?: string, // 文章来源 选填
}

interface ArticleState {

}

export default class Article extends React.Component<ArticleProps, ArticleState> {


  constructor(props: ArticleProps) {
    super(props)
  }

  render() {
    return (<View style={styles.container}>
      <Text>
        我是文章内容
      </Text>
    </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})