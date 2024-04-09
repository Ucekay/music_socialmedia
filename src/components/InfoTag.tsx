import {
    Image,
    StyleSheet,
    Text,
    View,
  } from "react-native";

interface Props {
  title: string,
  authorName: string,
  authorId: string,
  authorAvator: string,
  song: string,
  artist: string,
  paragragh: string
}

const InfoTag = (props: Props): JSX.Element => {
    return (
      <View style={styles.infoTag}>
        <View style={styles.author}>
          <Image
            style={styles.image} 
            source={require(props.authorAvator)}
          />
          <Text style={styles.authorName}>{props.authorName}</Text>
          <Text style={styles.authorId}>{props.authorId}</Text>
        </View>
        <View style={styles.songInfo}>
          <Text style={styles.songName}>Song Name {props.song}</Text>
        </View>
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>Artist Name  {props.artist}</Text>
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
    },
    infoTag: {
      marginLeft: 32
    }
  })