import {
    StyleSheet,
    Text,
    View
  } from "react-native";
import InfoTag from "../components/InfoTagOfArticle";

interface ArticleProps {
    articleID: string,
    articleTitle: string,
    articleContent: string,
    songName: string,
    artistName: string,
    artworkUrl: string,
    userID: string,
    user: string,
    userAvatarUrl: string,
    type: string,
  }

const ArticleScroll = (props: ArticleProps): JSX.Element => {
  return(
    <View>
        <View style={[styles.headingContainer, { paddingTop: 20 }]}>
            <Text style={styles.title}>
              {props.articleTitle}  
            </Text>
            <InfoTag {...props}/>
        </View>
        <View style={styles.article}>
        <Text style={styles.paragraph}>{props.articleContent}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    headingContainer: {
        width: 343,
        justifyContent: "center",
        backgroundColor: "white",
        marginBottom: 20,
      },
      title: {
        fontSize: 28,
        lineHeight: 32,
        marginHorizontal: 32,
        marginBottom: 20,
      },
      paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 64,
      },
      article: {
        paddingTop: 24,
        paddingHorizontal: 16,
      },
    });

export default ArticleScroll;