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

export const getUserLibraryPlaylists = async (): Promise<Playlist[]> => {
  return await MusicKitModule.getUserLibraryPlaylists();
};

export const getPlaylistTracks = async (playlistId: string) => {
  return await MusicKitModule.getPlaylistTracks(playlistId);
};

export { LibraryPlaylistArtworkView };
