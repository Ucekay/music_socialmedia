import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';
import { useQueryClient } from '@tanstack/react-query';
import * as IconoirIcons from 'iconoir-react-native';

import { Button } from '@/src/components/Button';
import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import { LibraryPlaylistArtworkView } from 'music-kit-module';

import type { Playlist } from '@/modules/music-kit-module/src/MusicKit.types';

const PlaylistDetailScreen = (): JSX.Element => {
  const { playlistID } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const queryClient = useQueryClient();
  const cachedPlaylists = queryClient.getQueryData<Playlist[]>(['playlists']);

  const playlist = cachedPlaylists?.find(
    (playlist) => playlist.id === playlistID,
  );
  if (!playlist) {
    return (
      <BgView style={[styles.container, { marginTop: headerHeight }]}>
        <Text>エラーが発生しました</Text>
      </BgView>
    );
  }

  const renderIcon = ({
    name,
    size,
    color,
  }: { name: string; size: number; color: string }) => {
    const IconComponent = IconoirIcons[
      name as keyof typeof IconoirIcons
    ] as React.ElementType;
    return (
      <IconComponent width={size} height={size} color={color} fill={color} />
    );
  };

  return (
    <BgView style={[{ flex: 1, marginTop: headerHeight }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            width: 250,
            height: 250,
            borderCurve: 'continuous',
            borderRadius: 8,
            backgroundColor: playlist.artwork.backgroundColor,
            shadowColor: playlist.artwork.backgroundColor,
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
          }}
        >
          <LibraryPlaylistArtworkView
            artworkUrl={playlist.artwork.url}
            style={styles.image}
          />
        </View>
        <View style={{ gap: 4, alignItems: 'center' }}>
          <Text style={styles.name}>{playlist.name}</Text>
          <Text style={styles.curatorName}>{playlist.curatorName}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => console.log('Button pressed')}
              text='再生'
              icon='Play'
              renderIcon={renderIcon}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => console.log('Button pressed')}
              text='曲を追加'
              icon='Edit'
              renderIcon={renderIcon}
              variant='outline'
            />
          </View>
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          {/*<FlatList
            data={selectedPlaylist.songs}
            scrollEnabled={false}
            renderItem={({ item }) => <TracksListItem {...item} />}
          />*/}
        </View>
      </ScrollView>
    </BgView>
  );
};

export default PlaylistDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 16,
    gap: 16,
  },
  image: {
    overflow: 'hidden',
    width: 250,
    height: 250,
    borderCurve: 'continuous',
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  curatorName: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
});
