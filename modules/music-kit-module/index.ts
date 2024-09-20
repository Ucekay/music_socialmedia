import MusicKitModule from './src/MusicKitModule';
import LibraryPlaylistArtworkView from './src/MusicKitView';

import type { Playlist, Recommendations } from './src/MusicKit.types';

export const requestMusicAuthorization = async () => {
  return MusicKitModule.requestMusicAuthorization();
};

export const checkSubscription = async () => {
  return await MusicKitModule.checkSubscription();
};

export const getPersonalizedRecommendations =
  async (): Promise<Recommendations> => {
    return await MusicKitModule.getPersonalizedRecommendations();
  };

export const getUserLibraryPlaylists = async ({
  forceRefresh,
}: { forceRefresh: boolean }): Promise<Playlist[]> => {
  return await MusicKitModule.getUserLibraryPlaylists(forceRefresh);
};

export { LibraryPlaylistArtworkView };
