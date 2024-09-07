import { FlatList } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { useQuery } from '@tanstack/react-query';

import playlistsData from '@/src/assets/playlistsData';
import PlaylistCard from '@/src/components/PlaylistCard';
import BgView from '@/src/components/ThemedBgView';

import type { PlaylistDetailType } from '@/src/types';

const PlaylistScreen = (): JSX.Element => {
  const getLocalPlaylists = async (): Promise<PlaylistDetailType[]> => {
    return playlistsData;
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
        renderItem={({ item }) => (
          <PlaylistCard
            playlistName={item.playlistName}
            ImageURL={item.ImageURL}
            playlistID={item.playlistID}
          />
        )}
        columnWrapperStyle={{ gap: 16 }}
      />
    </BgView>
  );
};

export default PlaylistScreen;
