// Import the native module. On web, it will be resolved to MusicKitModule.web.ts
// and on native platforms to MusicKitModule.ts
import MusicKitModule from './src/MusicKitModule';

export const requestMusicAuthorization = async () => {
  return MusicKitModule.requestMusicAuthorization();
};

export const checkSubscription = async () => {
  return MusicKitModule.checkSubscription();
};

export default MusicKitModule;
