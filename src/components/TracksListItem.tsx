import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { useTheme } from '../contexts/ColorThemeContext';

import BgView from './ThemedBgView';
import Text from './ThemedText';

import type { Track } from '../types';

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
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  image: {
    width: 44,
    height: 44,
    borderCurve: 'continuous',
    borderRadius: 8,
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
