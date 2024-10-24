import { observable } from '@legendapp/state';

import type { TopSearchResultItem } from '@/modules/music-kit-module/src/MusicKit.types';

interface MusicItem {
  item: TopSearchResultItem | undefined;
}

export const musicItem$ = observable<MusicItem>({
  item: undefined,
});
