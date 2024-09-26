import type React from 'react';
import { FlatList, type FlatListProps, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native';

import { Search, Xmark } from 'iconoir-react-native';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type { SearchHistoryItem } from '@/src/types';
import type { SearchBarCommands } from 'react-native-screens';

type CustomFlatListProps<T> = Omit<
  FlatListProps<T>,
  'renderItem' | 'keyExtractor'
>;

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
    ...flatListProps
  } = props;
  const { colors } = useTheme();
  const data = flatListProps.data;
  if (!data || data.length === 0) {
    return;
  }
  const renderHistoryItem = ({ item }: { item: SearchHistoryItem }) => {
    return (
      <View style={styles.itemContainer}>
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
            if (props.searchRef.current) {
              props.searchRef.current.blur();
            }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  termContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  searchIconContainer: {
    justifyContent: 'center',
    height: '100%',
  },
  body: {
    fontSize: 17,
  },
  xmarkContainer: {
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
});
