// Import the native module. On web, it will be resolved to MusicKitModule.web.ts
// and on native platforms to MusicKitModule.ts
import type { ViewProps } from 'react-native';

import { requireNativeViewManager } from 'expo-modules-core';

import MusicKitModule from './src/MusicKitModule';

import type { Playlist, Recommendations } from './src/MusicKit.types';

export type LibraryPlaylistArtworkViewProps = {
  playlistId: string;
  height: number;
} & ViewProps;

const NativeView: React.ComponentType<LibraryPlaylistArtworkViewProps> =
  requireNativeViewManager('LibraryPlaylistArtworkView');

export const LibraryPlaylistArtworkView = NativeView;

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

export default MusicKitModule;
