import { Link } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { LibraryPlaylistArtworkView } from 'music-kit-module';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type { Playlist } from '@/modules/music-kit-module/src/MusicKit.types';

const PlaylistCard = (playlist: Playlist) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const secondaryTextColor = colors.secondaryText;

  const imageSideLength = (width - 16 * 3) / 2;

  const imageContainerStyle = [styles.container, { width: imageSideLength }];
  const imageStyle = [
    styles.image,
    { width: imageSideLength, height: imageSideLength },
  ];

  const { id, name, curatorName } = playlist;

  return (
    <Link href={`/playlist/${id}`}>
      <View style={imageContainerStyle}>
        <LibraryPlaylistArtworkView
          artworkUrl={playlist.artwork.url}
          style={imageStyle}
        />
        <View>
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.song}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={[styles.curator, { color: secondaryTextColor }]}
          >
            {curatorName}
          </Text>
        </View>
      </View>
    </Link>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
    gap: 4,
  },
  image: {
    overflow: 'hidden',
    borderCurve: 'continuous',
    borderRadius: 8,
  },
  song: {
    fontSize: 14,
    fontWeight: '500',
  },
  curator: {
    fontSize: 13,
  },
});
