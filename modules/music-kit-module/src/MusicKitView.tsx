import type { ViewProps } from 'react-native';

import { requireNativeViewManager } from 'expo-modules-core';

export type LibraryItemArtworkViewProps = {
  artworkUrl: URL;
} & ViewProps;
const NativeView: React.ComponentType<LibraryItemArtworkViewProps> =
  requireNativeViewManager('MusicKitModule');

export default function LibraryItemArtworkView(
  props: LibraryItemArtworkViewProps,
) {
  return <NativeView {...props} />;
}
