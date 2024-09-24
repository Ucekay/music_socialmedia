import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';

import PlaylistCard from '@/src/components/PlaylistCard';
import BgView from '@/src/components/ThemedBgView';
import * as MusicKit from 'music-kit-module';

import type { Playlist } from '@/modules/music-kit-module/src/MusicKit.types';

const PlaylistScreen = (): JSX.Element => {
  const getLocalPlaylists = async (): Promise<Playlist[]> => {
    return MusicKit.getUserLibraryPlaylists();
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: getLocalPlaylists,
  });
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <BgView
      style={{
        flex: 1,
      }}
    >
      <FlashList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <PlaylistCard {...item} />}
        estimatedItemSize={225.7}
        contentContainerStyle={{
          paddingTop: headerHeight + 16,
          paddingBottom: bottomTabBarHeight + 16,
          paddingHorizontal: 8,
        }}
      />
    </BgView>
  );
};

export default PlaylistScreen;
