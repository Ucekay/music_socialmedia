import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import type { TextStyle } from 'react-native';

import { Search } from 'iconoir-react-native';

import { useTheme } from '../contexts/ColorThemeContext';

import {
  AlbumItem,
  ArtistItem,
  MusicVideoItem,
  PlaylistItem,
  SongItem,
} from './MusicItemListItems';
import BgView from './ThemedBgView';
import Text from './ThemedText';

import type {
  Album,
  Artist,
  MusicVideo,
  Playlist,
  SearchSuggestions,
  Song,
  Suggestion,
  TopSearchResultItem,
} from '@/modules/music-kit-module/src/MusicKit.types';
import type { CustomFlatListProps, SearchBarCommands } from '@/src/types';

type SearchSuggestionListProps = Omit<
  CustomFlatListProps<Suggestion | TopSearchResultItem>,
  'data'
> & {
  data: SearchSuggestions | undefined;
  onItemPress: (item: TopSearchResultItem | Suggestion | string) => void;
  searchRef: React.RefObject<SearchBarCommands>;
};

const HighlightedText = ({
  text,
  highlight,
  style,
}: { text: string; highlight: string; style: TextStyle }) => {
  if (!highlight) {
    return <Text style={{ ...style }}>{text}</Text>;
  }

  const regex = new RegExp(`(${highlight})`, 'i');
  const parts = text.split(regex);
  const firstMatchIndex = parts.findIndex((part, index) => index % 2 === 1);

  return (
    <Text style={{ ...style }}>
      {parts.map((part, index) => {
        const isHighlighted = index === firstMatchIndex;
        return (
          <Text
            key={text + index.toString()}
            style={{
              opacity: isHighlighted ? 1 : 0.5,
              ...style,
            }}
          >
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

const SearchSuggestionItem = ({
  onItemPress: handleItemPress,
  item,
  query,
}: {
  onItemPress: (item: Suggestion) => void;
  item: Suggestion;
  query: string;
}) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => handleItemPress(item)}
      style={[styles.termItemContainer, { borderColor: colors.border }]}
    >
      <View style={styles.searchIconContainer}>
        <Search color={colors.text} width={18} height={18} />
      </View>
      <View>
        <HighlightedText
          text={item.displayTerm}
          highlight={query}
          style={styles.body}
        />
      </View>
    </Pressable>
  );
};

const SearchSuggestionsList = (props: SearchSuggestionListProps) => {
  const {
    data: suggestions,
    onItemPress: handleItemPress,
    searchRef,
    ...flatListProps
  } = props;
  if (!suggestions) {
    return <BgView style={{ flex: 1 }} />;
  }

  const termSuggestions = suggestions.suggestions;
  const termSuggestionsLength = termSuggestions.length;
  const combinedSuggestions = [
    ...termSuggestions,
    ...(Array.isArray(suggestions.topResults) ? suggestions.topResults : []),
  ];
  const renderItem = ({
    item,
    index,
  }: { item: Suggestion | TopSearchResultItem; index: number }) => {
    if (index < termSuggestionsLength) {
      return (
        <SearchSuggestionItem
          item={item as Suggestion}
          onItemPress={handleItemPress}
          query={searchRef.current?.value || ''}
        />
      );
    }
    switch ((item as TopSearchResultItem).type) {
      case 'album':
        return <AlbumItem item={item as Album} onItemPress={handleItemPress} />;
      case 'artist':
        return (
          <ArtistItem item={item as Artist} onItemPress={handleItemPress} />
        );
      case 'musicVideo':
        return (
          <MusicVideoItem
            item={item as MusicVideo}
            onItemPress={handleItemPress}
          />
        );
      case 'playlist':
        return (
          <PlaylistItem item={item as Playlist} onItemPress={handleItemPress} />
        );
      case 'song':
        return <SongItem item={item as Song} onItemPress={handleItemPress} />;
      default:
        break;
    }
    return (
      <View>
        <Text>{(item as TopSearchResultItem).type}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={combinedSuggestions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={() => {
          if (searchRef.current) {
            searchRef.current.blur();
          }
        }}
        {...flatListProps}
      />
    </View>
  );
};

export default SearchSuggestionsList;

const styles = StyleSheet.create({
  termItemContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    gap: 8,
  },
  searchIconContainer: {
    justifyContent: 'center',
  },
  body: {
    fontSize: 17,
  },
});
