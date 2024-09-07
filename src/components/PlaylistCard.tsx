import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text, useColorScheme } from 'react-native';
import BgView from './ThemedBgView';

interface PlaylistProps {
  ImageURL?: string;
  playlistName: string;
  playlistID: string;
}

const width = Dimensions.get('window').width;

const PlaylistCard = (playlist: PlaylistProps): JSX.Element => {
  const defaultImageURL = 'https://picsum.photos/200?grayscale';
  const colorScheme = useColorScheme();
  const themeTextColor =
    colorScheme === 'light' ? { color: '#000000' } : { color: '#ffffff' };

  return (
    <Link
      href={{
        pathname: '/playlist/[playlistID]',
        params: { playlistID: playlist.playlistID },
      }}
    >
      <BgView style={styles.container}>
        <Image
          source={{ uri: playlist.ImageURL || defaultImageURL }}
          style={styles.image}
        />
        <Text style={themeTextColor}>{playlist.playlistName}</Text>
      </BgView>
    </Link>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width / 2 - 24,
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  image: {
    width: width / 2 - 24,
    height: width / 2 - 24,
    borderRadius: 8,
  },
});
