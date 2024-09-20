import { FlatList } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';

import PlaylistCard from '@/src/components/PlaylistCard';
import BgView from '@/src/components/ThemedBgView';
import * as MusicKit from 'music-kit-module';

import type { Playlist } from '@/modules/music-kit-module/src/MusicKit.types';

const PlaylistScreen = (): JSX.Element => {
  const getLocalPlaylists = async (): Promise<Playlist[]> => {
    return MusicKit.getUserLibraryPlaylists({ refreshCache: true });
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: getLocalPlaylists,
  });
  const headerHeight = useHeaderHeight();
  return (
    <BgView
      style={{ flex: 1, paddingTop: headerHeight, paddingHorizontal: 16 }}
    >
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <PlaylistCard {...item} />}
        columnWrapperStyle={{ gap: 16 }}
      />
    </BgView>
  );
};

export default PlaylistScreen;
