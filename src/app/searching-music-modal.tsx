import { Stack, useRouter } from 'expo-router';
import { useRef, useState } from 'react';

import { useHeaderHeight } from '@react-navigation/elements';

import * as MusicKit from 'music-kit-module';

import SearchSuggestionsList from '../components/SearchSuggestionsList';
import BgView from '../components/ThemedBgView';
import { useTheme } from '../contexts/ColorThemeContext';
import { musicItem$ } from '../observables';

import type {
  SearchSuggestions,
  Suggestion,
  TopSearchResultItem,
} from '@/modules/music-kit-module/src/MusicKit.types';
import type { SearchBarCommands } from 'react-native-screens';

const SearchArtwork = () => {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const [suggestions, setSuggestions] = useState<SearchSuggestions>();
  const searchRef = useRef<SearchBarCommands>(null);
  const { colors } = useTheme();
  const handleChangeText = async (text: string) => {
    const suggestions = await MusicKit.getSearchSuggestions(text);
    setSuggestions?.(suggestions);
  };
  const handleItemPress = (item: TopSearchResultItem | Suggestion | string) => {
    if (typeof item === 'string') {
      return;
    }
    if ('displayTerm' in item) {
      searchRef.current?.setText(item.displayTerm);
    } else {
      musicItem$.set({ item, status: 'selected' });
      router.back();
    }
  };
  return (
    <BgView style={{ flex: 1, paddingTop: headerHeight }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            autoFocus: true,
            ref: searchRef,
            placeholder: 'アーティストや楽曲を検索',
            placement: 'stacked',
            onChangeText: (e) => handleChangeText(e.nativeEvent.text),
          },
        }}
      />
      <SearchSuggestionsList
        data={suggestions}
        onItemPress={handleItemPress}
        searchRef={searchRef}
        contentContainerStyle={{
          marginHorizontal: 16,
          borderTopWidth: 0.2,
          borderColor: colors.border,
        }}
      />
    </BgView>
  );
};

export default SearchArtwork;
