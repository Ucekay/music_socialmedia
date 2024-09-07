import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../contexts/ColorThemeContext';
import { Image } from 'expo-image';

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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: 16,
    gap: 16,
    paddingVertical: 8,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  info: {
    height: '100%',
    paddingVertical: 8,
    justifyContent: 'space-between',
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
