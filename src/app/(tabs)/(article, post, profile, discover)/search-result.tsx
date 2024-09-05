import React, { useEffect, useRef, useState } from 'react';
import {
  Stack,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { SearchBarCommands } from 'react-native-screens';

import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import {
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import SearchBar from '@/src/components/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search, Xmark } from 'iconoir-react-native';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import type { SearchHistoryItem } from '@/src/types';
import SearchHistoryList from '@/src/components/SearchHistoryList';
import { set } from 'date-fns';

const search_result = () => {
  const { query } = useLocalSearchParams();
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  const insetsTop = useSafeAreaInsets().top;
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [returnFromSearchResult, setReturnFromSearchResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const showCurrentQuery = () => {
    searchRef.current?.setText(query as string);
  };

  const searchRef = useRef<SearchBarCommands>(null);
  useEffect(() => {
    showCurrentQuery();
  }, []);

  const handleCancelButtonPress = () => {
    showCurrentQuery();
    setShowHistory(false);
  };

  useFocusEffect(() => {
    if (returnFromSearchResult) {
      searchRef.current?.blur();
      showCurrentQuery();
      setReturnFromSearchResult(false);
    }
  });

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('searchHistory');
        setHistory(storedHistory ? JSON.parse(storedHistory) : []);
      } catch (error) {
        console.error(error);
      }
    };
    loadHistory();
  }, [history]);

  const saveHistory = async (history: SearchHistoryItem[]) => {
    try {
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  const clearHistory = (history: SearchHistoryItem) => {
    setHistory((prev) => {
      const newHistory = prev.filter((item) => item.query !== history.query);
      saveHistory(newHistory);
      return newHistory;
    });
  };

  const handleSearchFocus = () => {
    setShowHistory(true);
  };

  const handleSearch = (query: string) => {
    searchRef.current?.cancelSearch();
    setReturnFromSearchResult(true);
    const newHistoryItem = {
      query,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      let newHistory = [...prev];
      const existingIndex = newHistory.findIndex(
        (item) => item.query === query
      );

      if (existingIndex !== -1) {
        newHistory.splice(existingIndex, 1);
      }

      newHistory.unshift(newHistoryItem);
      newHistory = newHistory.slice(0, 15);

      saveHistory(newHistory);
      return newHistory;
    });

    router.push({
      pathname: '/search-result',
      params: { query },
    });
  };

  const handleSearchButtonPress = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const query = e.nativeEvent.text;
    handleSearch(query);
  };

  return (
    <BgView style={{ flex: 1, paddingTop: insetsTop }}>
      <Stack.Screen
        options={{
          header: () => (
            <BlurView
              tint='systemUltraThinMaterial'
              intensity={100}
              style={{ height: insetsTop, paddingHorizontal: 16 }}
            ></BlurView>
          ),
          headerTransparent: true,
        }}
      />
      <BlurView
        tint='systemUltraThinMaterial'
        intensity={100}
        style={{
          height: 44,
          paddingHorizontal: 16,
        }}
      >
        <SearchBar
          ref={searchRef}
          canBack={true}
          placeholder='検索'
          onCancelButtonPress={handleCancelButtonPress}
          onFocus={handleSearchFocus}
          onSearchButtonPress={handleSearchButtonPress}
        />
      </BlurView>
      <View style={{}}>
        <Text>search_result</Text>
        <Text>query: {query}</Text>
      </View>

      {showHistory && (
        <SearchHistoryList
          data={history}
          onItemPress={handleSearch}
          onClearHistory={clearHistory}
        />
      )}
    </BgView>
  );
};

export default search_result;
