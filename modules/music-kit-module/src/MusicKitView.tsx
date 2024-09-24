import type { ViewProps } from 'react-native';

import { requireNativeViewManager } from 'expo-modules-core';

export type LibraryPlaylistArtworkViewProps = {
  musicItemId: string;
  width: number;
} & ViewProps;
const NativeView: React.ComponentType<LibraryPlaylistArtworkViewProps> =
  requireNativeViewManager('MusicKitModule');

export default function LibraryPlaylistArtworkView(
  props: LibraryPlaylistArtworkViewProps,
) {
  return <NativeView {...props} />;
}
