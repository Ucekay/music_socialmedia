import { StyleSheet, Text, View, Dimensions } from 'react-native';
import InfoTag from './InfoTagOfArticle';
import { articleDataType } from '../types';

const screen = Dimensions.get('screen')

const ArticleContent = (props: articleDataType): JSX.Element => {
  return (
    <View>
      <View style={[styles.headingContainer, { paddingTop: 20 }]}>
        <Text style={styles.title}>{props.articleTitle}</Text>
        <InfoTag {...props} />
      </View>
      <View style={styles.article}>
        <Text style={styles.paragraph}>{props.articleBody}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    marginHorizontal: 32,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 64,
  },
  article: {
    paddingHorizontal: 16,
  },
});

export default ArticleContent;
