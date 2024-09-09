import type { ConfigPlugin } from 'expo/config-plugins';

const withMusicKitModule: ConfigPlugin = (config) => {
  console.log('MusikKitModule plugin');
  return config;
};

export default withMusicKitModule;
