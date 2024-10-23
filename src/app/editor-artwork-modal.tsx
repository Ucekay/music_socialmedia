import { useRef, useState } from 'react';
import { View } from 'react-native';

import * as MusicKit from 'music-kit-module';

import SearchBar from '../components/SearchBar';
import SearchSuggestionsList from '../components/SearchSuggestionsList';
import { useTheme } from '../contexts/ColorThemeContext';
import { musicItem$ } from '../observables';

import type {
  SearchSuggestions,
  TopSearchResultItem,
} from '@/modules/music-kit-module/src/MusicKit.types';
import type { SearchBarCommands as NativeSearchBarCommands } from 'react-native-screens';

type SearchBarCommands = NativeSearchBarCommands & {
  value: string;
};

const SearchArtwork = () => {
  const [suggestions, setSuggestions] = useState<SearchSuggestions>();
  const searchRef = useRef<SearchBarCommands>(null);
  const { colors } = useTheme();
  const handleChangeText = async (text: string) => {
    const suggestions = await MusicKit.getSearchSuggestions(text);
    setSuggestions?.(suggestions);
  };
  return (
    <View style={{ flex: 1, alignContent: 'center' }}>
      <SearchBar canBack={false} onChangeText={handleChangeText} />
      <SearchSuggestionsList
        data={suggestions}
        onItemPress={(item) => {
          musicItem$.item.set(item as TopSearchResultItem | undefined);
          const musicItem = musicItem$.item.get();
          console.log('item:', musicItem);
        }}
        searchRef={searchRef}
        contentContainerStyle={{
          marginHorizontal: 16,
          borderTopWidth: 0.2,
          borderColor: colors.border,
        }}
      />
    </View>
  );
};

export default SearchArtwork;
