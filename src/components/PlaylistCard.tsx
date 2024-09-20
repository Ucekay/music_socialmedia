import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

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
        <View style={styles.image}>
          <LibraryPlaylistArtworkView
            musicItemId={id}
            width={styles.image.width}
            refreshCache={true}
          />
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
