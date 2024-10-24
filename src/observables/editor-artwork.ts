import { observable } from '@legendapp/state';

import type {
  Album,
  Artist,
  Song,
} from '@/modules/music-kit-module/src/MusicKit.types';

interface MusicItem {
  item: Song | Artist | Album | undefined;
  status: 'idle' | 'pending' | 'selected';
}

export const musicItem$ = observable<MusicItem>({
  item: undefined,
  status: 'idle',
});
