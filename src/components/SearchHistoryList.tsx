import { Search, Xmark } from 'iconoir-react-native';
import type React from 'react';
import { FlatList, type FlatListProps, Pressable, View } from 'react-native';

import type { SearchHistoryItem } from '@/src/types';
import type { SearchBarCommands } from 'react-native-screens';
import { useTheme } from '../contexts/ColorThemeContext';
import Text from './ThemedText';

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Pressable
          onPress={() => handleItemPress(item.query)}
          style={{ paddingVertical: 8, paddingHorizontal: 16 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={{ paddingVertical: 2, paddingHorizontal: 4 }}>
              <Search color={colors.text} width={18} height={18} />
            </View>
            <View>
              <Text>{item.query}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => handleClearHistory(item)}
          style={{ paddingVertical: 8, paddingHorizontal: 16 }}
        >
          <Xmark color={colors.text} width={18} height={18} />
        </Pressable>
      </View>
    );
  };
  return (
    <View>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16 }}>履歴</Text>
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
