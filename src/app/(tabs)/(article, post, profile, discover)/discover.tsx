import { Link, Stack, useFocusEffect, useRouter } from 'expo-router';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  type NativeSyntheticEvent,
  Pressable,
  type TextInputSubmitEditingEventData,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import todaySongData from '@/src/assets/todaySongData';
import SearchBar from '@/src/components/SearchBar';
import SearchHistoryList from '@/src/components/SearchHistoryList';
import SearchSuggestionsList from '@/src/components/SearchSuggestionsList';
import BgView from '@/src/components/ThemedBgView';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import TodaySongCard from '@/src/components/TodaySongCard';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import * as MusicKit from 'music-kit-module';

import type { SearchSuggestions } from '@/modules/music-kit-module/src/MusicKit.types';
import type { SearchHistoryItem } from '@/src/types';
import type { SearchBarCommands as NativeSearchBarCommands } from 'react-native-screens';

export type SearchBarCommands = NativeSearchBarCommands & {
  value: string;
};

type SearchScreenLayoutProps = {
  children:
    | React.ReactNode
    | ((props: {
        searchRef: React.RefObject<SearchBarCommands>;
        handleSearch: (query: string) => void;
        clearHistory: (history: SearchHistoryItem) => void;
      }) => React.ReactNode);
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  setHistory: React.Dispatch<React.SetStateAction<SearchHistoryItem[]>>;
  setSuggestions?: React.Dispatch<
    React.SetStateAction<SearchSuggestions | undefined>
  >;
};

const SearchScreenLayout = ({
  children,
  setShowSuggestions,
  setShowHistory,
  setHistory,
  setSuggestions,
}: SearchScreenLayoutProps) => {
  const router = useRouter();
  const insetsTop = useSafeAreaInsets().top;
  const searchRef = useRef<SearchBarCommands>(null);
  const [returnFromSearchResult, setReturnFromSearchResult] = useState(false);

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
    setHistory((prev: SearchHistoryItem[]) => {
      const newHistory = prev.filter(
        (item: SearchHistoryItem) => item.query !== history.query,
      );
      saveHistory(newHistory);
      return newHistory;
    });
  };

  const handleSearch = (query: string) => {
    searchRef.current?.setText(query);
    searchRef.current?.focus();
    setReturnFromSearchResult(true);
    const newHistoryItem = {
      query,
      timestamp: Date.now(),
    };
    setHistory((prev: SearchHistoryItem[]) => {
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

  const handleChangeText = async (text: string) => {
    if (text === '') {
      setShowSuggestions(false);
      setShowHistory(true);
      setSuggestions?.(undefined);
    } else {
      setShowHistory(false);
      setShowSuggestions(true);
      const suggestions = await MusicKit.getSearchSuggestions(text);
      setSuggestions?.(suggestions);
    }
  };

  const handleSearchFocus = () => {
    if (searchRef.current?.value === '') {
      setShowSuggestions(false);
      setShowHistory(true);
    } else {
      setShowHistory(false);
      setShowSuggestions(true);
    }
  };

  const handleSearchButtonPress = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const query = e.nativeEvent.text;
    handleSearch(query);
  };

  const handleSearchCancel = () => {
    setShowHistory(false);
    setShowSuggestions(false);
    setSuggestions?.(undefined);
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
              tint='regular'
              intensity={100}
              style={{ height: insetsTop }}
            />
          ),
        }}
      />
      <BlurView
        tint='regular'
        intensity={100}
        style={{
          height: 40,
          marginTop: insetsTop,
          paddingHorizontal: 16,
        }}
      >
        <SearchBar
          ref={searchRef}
          canBack={false}
          placeholder='検索'
          onChangeText={handleChangeText}
          onFocus={handleSearchFocus}
          onSearchButtonPress={handleSearchButtonPress}
          onCancelButtonPress={handleSearchCancel}
        />
      </BlurView>
      {typeof children === 'function'
        ? children({ searchRef, handleSearch, clearHistory })
        : children}
    </BgView>
  );
};

const Discover = () => {
  const { colors } = useTheme();
  const [showHistory, setShowHistory] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestions>();

  const translateX = -100 * Math.cos((105 * Math.PI) / 180);
  const translateY = 66 * Math.sin((15 * Math.PI) / 180);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

  if (showHistory) {
    return (
      <SearchScreenLayout
        setShowSuggestions={setShowSuggestions}
        setShowHistory={setShowHistory}
        setHistory={setHistory}
      >
        {({ searchRef, handleSearch, clearHistory }) => (
          <SearchHistoryList
            data={history}
            onItemPress={handleSearch}
            onClearHistory={clearHistory}
            searchRef={searchRef}
          />
        )}
      </SearchScreenLayout>
    );
  }
  if (showSuggestions) {
    return (
      <SearchScreenLayout
        setShowSuggestions={setShowSuggestions}
        setShowHistory={setShowHistory}
        setHistory={setHistory}
        setSuggestions={setSuggestions}
      >
        {({ handleSearch, searchRef }) => {
          return (
            <SearchSuggestionsList
              data={suggestions}
              onItemPress={handleSearch}
              searchRef={searchRef}
            />
          );
        }}
      </SearchScreenLayout>
    );
  }

  return (
    <SearchScreenLayout
      setShowSuggestions={setShowSuggestions}
      setShowHistory={setShowHistory}
      setHistory={setHistory}
    >
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
    </SearchScreenLayout>
  );
};

export default Discover;
