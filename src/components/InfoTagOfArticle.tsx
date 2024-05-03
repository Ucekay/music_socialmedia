import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import { articleDataType } from '../types';
import { Link } from 'expo-router';

const InfoTag = (props: articleDataType): JSX.Element => {
  return (
    <View style={styles.infoTag}>
      <Link href={`/(tabs)/home/(profile)/${props.userID}`} asChild>
        <Pressable>
          <View style={styles.author}>
            <Image style={styles.image} source={{ uri: props.userAvatarUrl }} />
            <Text style={styles.authorName}>{props.user}</Text>
            <Text style={styles.authorId}>{props.userID}</Text>
          </View>
        </Pressable>
      </Link>
      <View style={styles.songInfo}>
        <Text style={styles.songName}>Song {props.songName}</Text>
      </View>
      <View style={styles.artistInfo}>
        <Text style={styles.artistName}>Artist {props.artistName}</Text>
      </View>
    </View>
  );
};

export default InfoTag;

const styles = StyleSheet.create({
  author: {
    width: 343,
    height: 28,
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 20,
  },
  authorName: {
    fontSize: 15,
    lineHeight: 28,
    marginRight: 4,
  },
  authorId: {
    fontSize: 15,
    lineHeight: 28,
  },
  songInfo: {
    width: 343,
    height: 20,
    flexDirection: 'row',
  },
  artistInfo: {
    width: 343,
    height: 20,
    flexDirection: 'row',
  },
  songName: {
    fontSize: 16,
    lineHeight: 20,
  },
  artistName: {
    fontSize: 16,
    lineHeight: 20,
  },
  infoTag: {
    marginLeft: 32,
  },
});