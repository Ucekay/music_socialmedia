import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type { TodaySongsListItemProps } from '../types';

const TodaySongsListItem = ({
  artworkUrl,
  songName,
  artistName,
  userID,
}: TodaySongsListItemProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Image source={artworkUrl} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.songInfo}>
          <Text style={styles.song}>{songName}</Text>
          <Text style={[styles.artist, { color: colors.secondaryText }]}>
            {artistName}
          </Text>
        </View>
        <View>
          <Text>{userID}</Text>
        </View>
      </View>
    </View>
  );
};

export default TodaySongsListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  image: {
    width: 88,
    height: 88,
    borderCurve: 'continuous',
    borderRadius: 12,
  },
  info: {
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 8,
  },
  songInfo: {
    gap: 2,
  },
  song: {
    fontSize: 16,
    fontWeight: '500',
  },
  artist: { fontSize: 16 },
});
