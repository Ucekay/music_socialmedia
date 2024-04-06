import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
import InfoTag from "./InfoTag";
  
  const { width } = Dimensions.get("window");
  
  const ArticleScroll = (): JSX.Element => {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.headingContainer, { paddingTop: 50 }]}>
          <Text style={styles.title}>
            時空を超える旋律：
            Omoinotake「幾億光年」の心の叫び
          </Text>
          <InfoTag />
        </View>
        <View style={styles.article}>
          <Text style={styles.paragraph}>
            Omoinotakeの「幾億光年」は、切なさと希望が交錯する楽曲です。TBS系火曜ドラマ『Eye Love You』の主題歌としても知られています。この曲は、福島智朗による繊細な歌詞と藤井怜央のメロディックな作曲が特徴で、Omoinotakeと小西遼による編曲が加わり、感情を揺さぶるサウンドスケープを作り上げています。
            歌詞は、時間と距離を超えた愛の強さを表現しており、過去の思い出と現在の願いが重なり合う構造になっています。特に、「もう一度さ声を聴かせてよ」というフレーズは、失われた恋人への切望を力強く表現しており、聴く者の心に深く響きます。
            音楽的には、穏やかなイントロから徐々に盛り上がりを見せる構成が印象的で、エモーショナルなボーカルパフォーマンスが曲の雰囲気を一層高めています。全体として、Omoinotakeは「幾億光年」を通じて、失った愛を求める心の叫びを、美しくも力強いメロディに乗せて伝えています。
            この曲は、ただのポップソングとしてではなく、ドラマの主題歌としてもその役割を果たし、物語の感情を豊かにする一助となっていることは間違いありません。
          </Text>
        </View>
      </ScrollView>
    );
  }

  export default ArticleScroll
  
  const styles = StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 20,
    },
    contentContainer: {
      flexGrow: 1,
      overflow: "hidden",
    },
    headingContainer: {
      width: width,
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
      marginBottom: 16,
    },
    article: {
      paddingTop: 24,
      paddingHorizontal: 16,
    },
  });