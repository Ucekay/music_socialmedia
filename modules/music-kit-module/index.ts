import MusicKitModule from './src/MusicKitModule';
import LibraryItemArtworkView from './src/MusicKitView';

import type {
  Playlist,
  Recommendations,
  SearchSuggestions,
  TopSearchResult,
} from './src/MusicKit.types';

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

export const getUserLibraryPlaylist = async (playlistId: string) => {
  return await MusicKitModule.getUserLibraryPlaylist(playlistId);
};

export const getPlaylistTracks = async (playlistId: string) => {
  return await MusicKitModule.getPlaylistTracks(playlistId);
};

export const getSearchSuggestions = async (
  term: string,
): Promise<SearchSuggestions> => {
  return await MusicKitModule.getSearchSuggestions(term);
};

export const getTopSearchResults = async (
  term: string,
  offset?: number,
): Promise<TopSearchResult> => {
  return await MusicKitModule.getTopSearchResults(term, offset);
};

export { LibraryItemArtworkView };
