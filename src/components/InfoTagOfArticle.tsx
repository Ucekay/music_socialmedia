import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import { articleDataType } from '../types';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { TagsColors } from '../constants/Colors';

const InfoTag = (props: articleDataType): JSX.Element => {
  const tintColorPlaylist = TagsColors.playlist.tint;
  const tintColorReview = TagsColors.review.tint;
  const tintColorLiveReport = TagsColors.liveReport.tint
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
      { props.type == 'review' && (
      <View style={{gap:4}}>
        <View style={styles.songInfo}>
        <SymbolView
          name='waveform'
          size={16}
          tintColor={tintColorReview}
          style={styles.symbol}
        />
          <Text style={styles.songName}>{props.songName}</Text>
        </View>
        <View style={styles.artistInfo}>
        <SymbolView
          name='music.mic'
          size={16}
          tintColor={tintColorReview}
          style={styles.symbol}
        />
          <Text style={styles.artistName}>{props.artistName}</Text>
        </View>
      </View>
      )}
      { props.type == 'liveReport' && (
      <View style={{gap:4}}>
        <View style={styles.songInfo}>
        <SymbolView
          name='music.mic'
          size={16}
          tintColor={tintColorLiveReport}
          style={styles.symbol}
        />
          <Text style={styles.artistName}>{props.artistName}</Text>
        </View>
        <View style={styles.artistInfo}>
        <SymbolView
          name='mappin.and.ellipse'
          size={16}
          tintColor={tintColorLiveReport}
          style={styles.symbol}
        />
          <Text style={styles.artistName}>{props.eventName}</Text>
        </View>
      </View>
      )}
      { props.type == 'playlist' && (
      <View>
        <View style={styles.songInfo}>
        <SymbolView
          name='music.mic'
          size={16}
          tintColor={tintColorPlaylist}
          style={styles.symbol}
        />
          <Text style={styles.artistName}>{props.artistName}</Text>
        </View>
      </View>
      )}
    </View>
  );
};

export default InfoTag;

const styles = StyleSheet.create({
  author: {
    height: 28,
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
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
  songInfo:{
    height: 20,
    flexDirection: 'row',
  },
  artistInfo: {
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
  symbol: {
    marginLeft: 6,
    marginRight:16
  },
});
