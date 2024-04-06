import {
    Image,
    StyleSheet,
    Text,
    View,
  } from "react-native";

  const InfoTag = (): JSX.Element => {
    return (
      <View>
        <View style={styles.author}>
          <Image
            style={styles.image} 
            source={require("../assets/images/author1.jpg")}
          />
          <Text style={styles.authorName}>コードの巡航者</Text>
          <Text style={styles.authorId}>@ChordJunkousha</Text>
        </View>
        <View style={styles.songInfo}>
          <Text style={styles.songName}>Song Name  幾億光年</Text>
        </View>
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>Artist Name  Omoinotake</Text>
        </View>
      </View>
    )
  }

  export default InfoTag

  const styles = StyleSheet.create({
    author: {
      width: 343,
      height: 28,
      flexDirection: 'row',
      marginBottom: 12
    },
    image: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 20
    },
    authorName: {
      fontSize: 15,
      lineHeight: 28,
      marginRight: 4
    },
    authorId: {
      fontSize: 15,
      lineHeight: 28
    },
    songInfo: {
      width: 343,
      height: 20,
      flexDirection: 'row'
    },
    artistInfo: {
      width: 343,
      height: 20,
      flexDirection: 'row'
    },
    songName: {
      fontSize: 16,
      lineHeight: 20
    },
    artistName: {
      fontSize: 15,
      lineHeight: 20
    }
  })