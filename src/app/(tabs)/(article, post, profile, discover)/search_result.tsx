import React, { useEffect, useRef, useState } from 'react';
import {
  Stack,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { SearchBarCommands } from 'react-native-screens';

import SearchBarHeader from '@/src/components/SearchBarHeader';
import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import {
  Button,
  FlatList,
  NativeSyntheticEvent,
  Pressable,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import SearchBar from '@/src/components/SearchBar';
import handleSearch from '@/src/backend/components/DB_Access/Searh';
import { insertTodaysSongs } from '@/src/backend/components/DB_Access/TodaysSong';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Search, Xmark } from 'iconoir-react-native';
import { useTheme } from '@/src/contexts/ColorThemeContext';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

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
      pathname: '/search_result',
      params: { query },
    });
  };

  const handleSearchButtonPress = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const query = e.nativeEvent.text;
    handleSearch(query);
  };

  const renderHistoryItem = ({ item }: { item: SearchHistoryItem }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => handleSearch(item.query)}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Search color={colors.text} width={20} height={20} />
            </View>
            <View>
              <Text>{item.query}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => clearHistory(item)}>
          <Xmark color={colors.text} width={20} height={20} />
        </Pressable>
      </View>
    );
  };

  return (
    <BgView style={{ paddingTop: headerHeight }}>
      <Stack.Screen
        options={{
          header: () => (
            <BlurView
              tint='systemUltraThinMaterial'
              intensity={100}
              style={{ height: insetsTop, paddingHorizontal: 16 }}
            ></BlurView>
          ),
        }}
      />
      <BlurView
        tint='systemUltraThinMaterial'
        intensity={100}
        style={{
          position: 'absolute',
          top: insetsTop,
          zIndex: 1,
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
      <View style={{ paddingTop: insetsTop }}>
        <Text>search_result</Text>
        <Text>query: {query}</Text>
      </View>

      {showHistory && (
        <View>
          <View>
            <Text>履歴</Text>
          </View>
          {history.length > 0 && (
            <View>
              <FlatList
                data={history}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.timestamp.toString()}
              />
            </View>
          )}
        </View>
      )}
    </BgView>
  );
};

export default search_result;
