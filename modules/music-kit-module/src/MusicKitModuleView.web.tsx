import * as React from 'react';

import { MusicKitModuleViewProps } from './MusicKitModule.types';

export default function MusicKitModuleView(props: MusicKitModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
