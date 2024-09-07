import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  type NativeSyntheticEvent,
  Pressable,
  type TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SearchBarCommands } from 'react-native-screens';

import todaySongData from '@/src/assets/todaySongData';
import SearchBar from '@/src/components/SearchBar';
import SearchHistoryList from '@/src/components/SearchHistoryList';
import BgView from '@/src/components/ThemedBgView';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import TodaySongCard from '@/src/components/TodaySongCard';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import type { SearchHistoryItem } from '@/src/types';

const Discover = () => {
  const router = useRouter();
  const insetsTop = useSafeAreaInsets().top;
  const { colors } = useTheme();
  const searchRef = React.useRef<SearchBarCommands>(null);
  const [returnFromSearchResult, setReturnFromSearchResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  const translateX = -100 * Math.cos((105 * Math.PI) / 180);
  const translateY = 66 * Math.sin((15 * Math.PI) / 180);

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

  useFocusEffect(() => {
    if (returnFromSearchResult) {
      searchRef.current?.focus();
      setReturnFromSearchResult(false);
    }
  });

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
    searchRef.current?.setText(query);
    searchRef.current?.focus();
    setReturnFromSearchResult(true);
    const newHistoryItem = {
      query,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      let newHistory = [...prev];
      const existingIndex = newHistory.findIndex(
        (item) => item.query === query,
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
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const query = e.nativeEvent.text;
    handleSearch(query);
  };

  const handleSearchCancel = () => {
    setShowHistory(false);
  };

  return (
    <BgView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          header: () => (
            <BlurView
              tint='systemUltraThinMaterial'
              intensity={100}
              style={{ height: insetsTop }}
            ></BlurView>
          ),
        }}
      />
      <BlurView
        tint='systemUltraThinMaterial'
        intensity={100}
        style={{
          height: 44,
          marginTop: insetsTop,
          paddingHorizontal: 16,
        }}
      >
        <SearchBar
          ref={searchRef}
          canBack={false}
          placeholder='検索'
          onFocus={handleSearchFocus}
          onSearchButtonPress={handleSearchButtonPress}
          onCancelButtonPress={handleSearchCancel}
        />
      </BlurView>

      {!showHistory && (
        <View style={{ padding: 16, flex: 1 }}>
          <Link href={'/today-song-modal'} asChild>
            <Pressable
              style={{
                borderRadius: 16,
                borderCurve: 'continuous',
                overflow: 'hidden',
              }}
            >
              <SecondaryBgView
                style={{
                  paddingTop: 32,
                  paddingHorizontal: 12,
                  height: 200,
                  overflow: 'hidden',
                }}
              >
                <View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 16,
                      left: 0,
                      transform: [
                        { rotate: '-15deg' },
                        { translateX },
                        { translateY },
                      ],
                    }}
                  >
                    <TodaySongCard
                      todaySong={todaySongData[0]}
                      isEditing={false}
                      isSongInfoVisible
                      size='sm'
                    />
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        position: 'absolute',
                        transform: [
                          {
                            rotate: '15deg',
                          },
                          { translateX: translateX / 2 },
                        ],
                      }}
                    >
                      <TodaySongCard
                        todaySong={todaySongData[1]}
                        isEditing={false}
                        isSongInfoVisible
                        size='sm'
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 68,
                      right: 0,
                      transform: [{ rotate: '-15deg' }],
                    }}
                  >
                    <TodaySongCard
                      todaySong={todaySongData[2]}
                      isEditing={false}
                      isSongInfoVisible
                      size='sm'
                    />
                  </View>
                </View>
              </SecondaryBgView>
              <SecondaryBgView
                style={{
                  padding: 16,
                  borderTopWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ fontSize: 20 }}>Today</Text>
              </SecondaryBgView>
            </Pressable>
          </Link>
        </View>
      )}

      {showHistory && (
        <SearchHistoryList
          data={history}
          onItemPress={handleSearch}
          onClearHistory={clearHistory}
          searchRef={searchRef}
        />
      )}
    </BgView>
  );
};

export default Discover;
