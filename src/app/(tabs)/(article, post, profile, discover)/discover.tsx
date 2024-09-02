import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  Pressable,
  TextInputFocusEventData,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Link,
  Stack,
  useFocusEffect,
  useNavigation,
  useRouter,
} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBarCommands } from 'react-native-screens';

import BgView from '@/src/components/ThemedBgView';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';
import todaySongData from '@/src/assets/todaySongData';
import TodaySongCard from '@/src/components/TodaySongCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import Text from '@/src/components/ThemedText';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import { Search, Xmark } from 'iconoir-react-native';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

const Discover = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
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
  }, []);

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
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const query = e.nativeEvent.text;
    handleSearch(query);
  };

  const handleSearchCancel = () => {
    setShowHistory(false);
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
    <BgView
      style={{
        flex: 1,
        padding: 16,
        paddingTop: headerHeight + 16,
      }}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: '検索',
            onFocus: handleSearchFocus,
            onSearchButtonPress(e) {
              handleSearchButtonPress(e);
            },
            onCancelButtonPress: handleSearchCancel,
            ref: searchRef,
          },
        }}
      />
      {!showHistory && (
        <View style={{ marginTop: 52 }}>
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

export default Discover;
