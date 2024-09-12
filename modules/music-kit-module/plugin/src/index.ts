import { type ConfigPlugin, IOSConfig } from 'expo/config-plugins';

const withMusicKitModule: ConfigPlugin<
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  { appleMusicPermission?: string | false } | void
> = (config, { appleMusicPermission } = {}) => {
  IOSConfig.Permissions.createPermissionsPlugin({
    NSAppleMusicUsageDescription:
      'Allow $(PRODUCT_NAME) to access your Apple Music library',
  })(config, {
    NSAppleMusicUsageDescription: appleMusicPermission,
  });
  return config;
};

export default withMusicKitModule;
