import { StyleSheet, View } from 'react-native';

import { LibraryItemArtworkView } from 'music-kit-module';

import { useTheme } from '../contexts/ColorThemeContext';

import BgView from './ThemedBgView';
import Text from './ThemedText';

import type { Track } from '@/modules/music-kit-module/src/MusicKit.types';

const TracksListItem = (props: Track) => {
  const { colors } = useTheme();
  return (
    <BgView style={styles.container}>
      <View style={{ paddingVertical: 8 }}>
        <LibraryItemArtworkView
          artworkUrl={props.artwork.url}
          style={styles.image}
        />
      </View>
      <View
        style={{
          gap: 2,
          flex: 1,
          height: '100%',
          paddingVertical: 8,
          borderBottomColor: colors.border,
          borderBottomWidth: 0.5,
        }}
      >
        <Text style={styles.song}>{props.title}</Text>
        <Text secondary style={styles.artist}>
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
    gap: 12,
  },
  image: {
    overflow: 'hidden',
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
