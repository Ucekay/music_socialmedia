export default {
  expo: {
    name: 'otography',
    slug: 'otography',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    scheme: 'oto',
    userInterfaceStyle: 'automatic',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.musicsocial.otography',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.musicsocial.otography',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './src/assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-build-properties',
        {
          ios: {
            deploymentTarget: '16.0',
          },
        },
      ],
      'expo-font',
    ],
    experiments: {
      typeRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'f8607735-aef1-45f5-8ae7-bc4b6f6f77af',
      },
    },
  },
};
