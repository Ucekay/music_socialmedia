import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { LibraryPlaylistArtworkView } from 'music-kit-module';

import { useTheme } from '../contexts/ColorThemeContext';

import BgView from './ThemedBgView';

import type { Playlist } from '@/modules/music-kit-module/src/MusicKit.types';

interface PlaylistProps {
  ImageURL?: string;
  playlistName: string;
  playlistID: string;
}

const width = Dimensions.get('window').width;

const PlaylistCard = (playlist: Playlist) => {
  const defaultImageURL = 'https://picsum.photos/200?grayscale';
  const { colors } = useTheme();
  const themeTextColor = { color: colors.text };

  const { id, name, curatorName: _curatorName, artwork } = playlist;

  return (
    <Link href={`/playlist/${id}`}>
      <BgView style={styles.container}>
        <View style={styles.image}>
          <LibraryPlaylistArtworkView />
        </View>
        <Text style={themeTextColor}>{name}</Text>
      </BgView>
    </Link>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: width / 2 - 24,
    paddingVertical: 8,
    gap: 4,
  },
  image: {
    width: width / 2 - 24,
    height: width / 2 - 24,
    borderRadius: 8,
  },
});
