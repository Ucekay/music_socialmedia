import {
    StyleSheet,
    Text,
    View
  } from "react-native";
import InfoTag from "../components/InfoTag";

interface Props {
    title: string,
    authorName: string,
    authorId: string,
    authorAvator: string,
    song: string,
    artist: string,
    paragragh: string
  }

const ArticleScroll = (props: Props): JSX.Element => {
  return(
    <View>
        <View style={[styles.headingContainer, { paddingTop: 50 }]}>
        <Text style={styles.title}>{props.title}</Text>
        <InfoTag {...props}/>
        </View>
        <View style={styles.article}>
        <Text style={styles.paragraph}>{props.paragragh}</Text>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    headingContainer: {
        width: 343,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 20
      },
      title: {
        fontSize: 28,
        lineHeight: 32,
        marginHorizontal: 16,
        marginBottom: 20
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
