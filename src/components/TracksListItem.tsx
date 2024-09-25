import { StyleSheet, View } from 'react-native';

import { LibraryItemArtworkView } from 'music-kit-module';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type { Song } from '@/modules/music-kit-module/src/MusicKit.types';

type Props = Song & {
  first?: boolean;
  last?: boolean;
};

const TracksListItem = (props: Props) => {
  const { colors } = useTheme();
  const { first, last, artwork } = props;
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderTopWidth: first ? 0.5 : 0,
          borderBottomWidth: last ? 0.5 : 0,
        },
      ]}
    >
      <View
        style={[
          {
            backgroundColor: artwork.backgroundColor,
            borderWidth: 0.2,
            borderColor: colors.border,
          },
          styles.image,
        ]}
      >
        <LibraryItemArtworkView artworkUrl={artwork.url} style={styles.image} />
      </View>
      <View
        style={{
          gap: 2,
          flex: 1,
          height: 60,
          justifyContent: 'space-evenly',
          paddingVertical: 8,
          borderBottomColor: colors.border,
          borderBottomWidth: last ? 0 : 0.5,
        }}
      >
        <Text style={styles.song}>{props.title}</Text>
        <Text secondary style={styles.artist}>
          {props.artistName}
        </Text>
      </View>
    </View>
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
    borderRadius: 4,
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
