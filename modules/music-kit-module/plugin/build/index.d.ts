import type { ConfigPlugin } from 'expo/config-plugins';
declare const withMusicKitModule: ConfigPlugin<{
  appleMusicPermission?: string | false;
} | void>;
export default withMusicKitModule;
