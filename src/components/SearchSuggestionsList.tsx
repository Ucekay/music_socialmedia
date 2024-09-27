import {
  FlatList,
  Pressable,
  StyleSheet,
  type TextStyle,
  View,
} from 'react-native';

import { Search } from 'iconoir-react-native';

import { useTheme } from '../contexts/ColorThemeContext';

import BgView from './ThemedBgView';
import Text from './ThemedText';

import type {
  SearchSuggestions,
  Suggestion,
  TopSearchResultItem,
} from '@/modules/music-kit-module/src/MusicKit.types';
import type { SearchBarCommands as NativeSearchBarCommands } from 'react-native-screens';

type SearchSuggestionListProps = {
  data: SearchSuggestions | undefined;
  onItemPress: (query: string) => void;
  searchRef: React.RefObject<SearchBarCommands>;
};

type SearchBarCommands = NativeSearchBarCommands & {
  value: string;
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
  onItemPress: (query: string) => void;
  item: Suggestion;
  query: string;
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.itemContainer, { borderColor: colors.border }]}>
      <Pressable
        onPress={() => handleItemPress(item.displayTerm)}
        style={styles.termContainer}
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
    </View>
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

  const { colors } = useTheme();
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
    return (
      <View>
        <Text>{(item as TopSearchResultItem).type}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={combinedSuggestions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          marginHorizontal: 16,
          borderBottomWidth: 0.2,
          borderTopWidth: 0.2,
          borderColor: colors.border,
        }}
      />
    </View>
  );
};

export default SearchSuggestionsList;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
  },
  termContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    gap: 8,
  },
  searchIconContainer: {
    justifyContent: 'center',
  },
  body: {
    fontSize: 17,
  },
});
