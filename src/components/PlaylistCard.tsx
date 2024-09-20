import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text } from 'react-native';

import { LibraryPlaylistArtworkView } from 'music-kit-module';

import { useTheme } from '../contexts/ColorThemeContext';

import BgView from './ThemedBgView';

import type { Playlist } from '@/modules/music-kit-module/src/MusicKit.types';

const width = Dimensions.get('window').width;

const PlaylistCard = (playlist: Playlist) => {
  const { colors } = useTheme();
  const themeTextColor = { color: colors.text };

  const { id, name } = playlist;

  return (
    <Link href={`/playlist/${id}`}>
      <BgView style={styles.container}>
        <LibraryPlaylistArtworkView
          musicItemId={id}
          width={styles.image.width}
          refreshCache={false}
          style={styles.image}
        />
        <Text style={themeTextColor}>{name}</Text>
      </BgView>
    </Link>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: width / 2 - 24,
    paddingVertical: 8,
    gap: 4,
  },
  image: {
    overflow: 'hidden',
    width: width / 2 - 24,
    height: width / 2 - 24,
    borderCurve: 'continuous',
    borderRadius: 8,
  },
});
