// Import the native module. On web, it will be resolved to MusicKitModule.web.ts
// and on native platforms to MusicKitModule.ts
import MusicKitModule from './MusicKitModule';

import type { Recommendations } from './MusicKit.types';

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

export const getUserLibraryPlaylists = async () => {
  return await MusicKitModule.getUserLibraryPlaylists();
};

export default MusicKitModule;
