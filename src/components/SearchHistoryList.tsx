import { View, FlatListProps, FlatList, Pressable } from 'react-native';
import React from 'react';
import { Search, Xmark } from 'iconoir-react-native';

import type { SearchHistoryItem } from '@/src/types';
import Text from './ThemedText';
import { useTheme } from '../contexts/ColorThemeContext';

type CustomFlatListProps<T> = Omit<
  FlatListProps<T>,
  'renderItem' | 'keyExtractor'
>;

interface SearchHistoryListProps
  extends CustomFlatListProps<SearchHistoryItem> {
  onItemPress: (query: string) => void;
  onClearHistory: (item: SearchHistoryItem) => void;
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
        />
      </View>
    </View>
  );
};

export default SearchHistoryList;
