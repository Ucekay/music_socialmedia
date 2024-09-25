import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as IconoirIcons from 'iconoir-react-native';

import { Button } from '@/src/components/Button';
import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import TracksListItem from '@/src/components/TracksListItem';
import { LibraryItemArtworkView } from 'music-kit-module';
import * as MusicKit from 'music-kit-module';

import type {
  Playlist,
  Track,
} from '@/modules/music-kit-module/src/MusicKit.types';

const PlaylistDetailScreen = (): JSX.Element => {
  const { playlistID } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();
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

  const {
    data: playlistTracks,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['playlistTracks', playlistID],
    queryFn: async () => {
      return MusicKit.getPlaylistTracks(playlistID as string);
    },
  });

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

  console.log(playlist.lastModifiedDate);

  const renderListHeaderComponent = () => {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: playlist.artwork.backgroundColor,
              shadowColor: playlist.artwork.backgroundColor,
            },
          ]}
        >
          <LibraryItemArtworkView
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
        <Text secondary style={{ width: '100%', fontSize: 15 }}>
          {playlist.description}
        </Text>
      </View>
    );
  };

  return (
    <BgView style={{ flex: 1 }}>
      <FlashList
        data={playlistTracks}
        estimatedItemSize={60}
        renderItem={({ item, index }: { item: Track; index: number }) => (
          <TracksListItem
            {...item}
            first={index === 0}
            last={index === playlistTracks.length - 1}
          />
        )}
        ListHeaderComponent={renderListHeaderComponent}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: headerHeight,
          paddingBottom: bottomTabBarHeight + 16,
        }}
      />
    </BgView>
  );
};

export default PlaylistDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  imageContainer: {
    width: 240,
    borderCurve: 'continuous',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    aspectRatio: 1,
    elevation: 12,
  },
  image: {
    overflow: 'hidden',
    flex: 1,
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
    gap: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
});
