import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { SearchBarCommands } from 'react-native-screens';

const search_result = () => {
  const { query } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();

  const searchRef = useRef<SearchBarCommands>(null);

  useFocusEffect(() => {
    searchRef.current?.setText(query as string);
  });
  return (
    <View style={{ paddingTop: headerHeight }}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: '検索',
            placement: 'stacked',
            ref: searchRef,
          },
        }}
      />
      <Text>search_result</Text>
      <Text>query: {query}</Text>
    </View>
  );
};

export default search_result;
