import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { MusicKitModuleViewProps } from './MusicKitModule.types';

const NativeView: React.ComponentType<MusicKitModuleViewProps> =
  requireNativeViewManager('MusicKitModule');

export default function MusicKitModuleView(props: MusicKitModuleViewProps) {
  return <NativeView {...props} />;
}
