import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';
import type { Track } from '../types';
import BgView from './ThemedBgView';
import Text from './ThemedText';

const TracksListItem = (props: Track) => {
  const { colors } = useTheme();
  return (
    <BgView style={[styles.container, { borderBottomColor: colors.border }]}>
      <Image source={props.artworkUrl} style={styles.image} />
      <View style={{ gap: 2 }}>
        <Text style={styles.song}>{props.songName}</Text>
        <Text style={[styles.artist, { color: colors.secondaryText }]}>
          {props.artistName}
        </Text>
      </View>
    </BgView>
  );
};

export default TracksListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },
  image: {
    height: 44,
    width: 44,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
  song: {
    fontSize: 16,
    fontWeight: '400',
  },
  artist: {
    fontSize: 14,
    fontWeight: '300',
  },
});
