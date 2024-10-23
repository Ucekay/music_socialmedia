import type React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Search, Xmark } from 'iconoir-react-native';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type {
  CustomFlatListProps,
  SearchBarCommands,
  SearchHistoryItem,
} from '@/src/types';

interface SearchHistoryListProps
  extends CustomFlatListProps<SearchHistoryItem> {
  onItemPress: (query: string) => void;
  onClearHistory: (item: SearchHistoryItem) => void;
  searchRef: React.RefObject<SearchBarCommands>;
}

const SearchHistoryList = (props: SearchHistoryListProps) => {
  const {
    onItemPress: handleItemPress,
    onClearHistory: handleClearHistory,
    searchRef,
    ...flatListProps
  } = props;
  const { colors } = useTheme();
  const data = flatListProps.data;
  if (!data || data.length === 0) {
    return;
  }
  const renderHistoryItem = ({ item }: { item: SearchHistoryItem }) => {
    return (
      <View style={[styles.itemContainer, { borderColor: colors.border }]}>
        <Pressable
          onPress={() => handleItemPress(item.query)}
          style={styles.termContainer}
        >
          <View style={styles.searchIconContainer}>
            <Search color={colors.text} width={18} height={18} />
          </View>
          <View>
            <Text style={styles.body}>{item.query}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => handleClearHistory(item)}
          style={styles.xmarkContainer}
        >
          <Xmark color={colors.text} width={18} height={18} />
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.listHeader}>
        <Text style={styles.body}>履歴</Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.timestamp.toString()}
          style={{ height: '100%' }}
          onScroll={() => {
            if (searchRef.current) {
              searchRef.current.blur();
            }
          }}
          contentContainerStyle={{
            borderTopWidth: 0.2,
            borderColor: colors.border,
            marginHorizontal: 16,
          }}
        />
      </View>
    </View>
  );
};

export default SearchHistoryList;

const styles = StyleSheet.create({
  listHeader: {
    padding: 16,
  },
  itemContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
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
  xmarkContainer: {
    justifyContent: 'center',
    height: '100%',
  },
});
