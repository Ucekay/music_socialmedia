import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to MusicKitModule.web.ts
// and on native platforms to MusicKitModule.ts
import MusicKitModule from './src/MusicKitModule';
import MusicKitModuleView from './src/MusicKitModuleView';
import { ChangeEventPayload, MusicKitModuleViewProps } from './src/MusicKitModule.types';

// Get the native constant value.
export const PI = MusicKitModule.PI;

export function hello(): string {
  return MusicKitModule.hello();
}

export async function setValueAsync(value: string) {
  return await MusicKitModule.setValueAsync(value);
}

const emitter = new EventEmitter(MusicKitModule ?? NativeModulesProxy.MusicKitModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MusicKitModuleView, MusicKitModuleViewProps, ChangeEventPayload };
