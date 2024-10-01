import { Stack, router, useLocalSearchParams } from 'expo-router';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  type NativeSyntheticEvent,
  type PressableAndroidRippleConfig,
  type StyleProp,
  StyleSheet,
  type TextInputSubmitEditingEventData,
  type TextStyle,
  View,
  type ViewStyle,
  useWindowDimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  type NavigationState,
  type Route,
  type SceneRendererProps,
  TabBar,
  type TabBarIndicatorProps,
  type TabBarItemProps,
  TabView,
} from 'react-native-tab-view';

import articleData from '@/src/assets/articleData';
import postData from '@/src/assets/postData';
import todaySongData from '@/src/assets/todaySongData';
import userData from '@/src/assets/userData';
import ArticleCard from '@/src/components/ArticleCard';
import PostCard from '@/src/components/PostCard';
import SearchBar from '@/src/components/SearchBar';
import SearchHistoryList from '@/src/components/SearchHistoryList';
import SearchSuggestionsList from '@/src/components/SearchSuggestionsList';
import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import TodaySongsListItem from '@/src/components/TodaySongsListItem';
import UsersListItem from '@/src/components/UsersListItem';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import * as MusicKit from 'music-kit-module';

import type { SearchSuggestions } from '@/modules/music-kit-module/src/MusicKit.types';
import type {
  ArticleData,
  PostData,
  SearchHistoryItem,
  TodaySongsListItemProps,
  Track,
  UsersListItemProps,
} from '@/src/types';
import type { SearchBarCommands as NativeSearchBarCommands } from 'react-native-screens';
import type {
  Event,
  Scene,
} from 'react-native-tab-view/lib/typescript/src/types';

type SearchBarCommands = NativeSearchBarCommands & {
  value: string;
};

const fetchData = async (
  type: 'post' | 'article' | 'today' | 'user' | 'music',
) => {
  switch (type) {
    case 'post':
      return postData;
    case 'article':
      return articleData;
    case 'today':
      return todaySongData;
    case 'user':
      return userData;
    case 'music':
      return todaySongData;
    default:
      return null;
  }
};

type ArticleSearchResultsProps = {
  isLoading: boolean;
  data: ArticleData[];
};

type PostSearchResultsProps = {
  isLoading: boolean;
  data: PostData[];
};

type TodaySongSearchResultsProps = {
  isLoading: boolean;
  data: TodaySongsListItemProps[];
};

type UserSearchResultsProps = {
  isLoading: boolean;
  data: UsersListItemProps[];
};

type TrackSearchResultsProps = {
  isLoading: boolean;
  data: Track[];
};

const ArticleSearchResults = ({ query }: { query: string }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { colors } = useTheme();
  //バックエンドのからのデータの型がわからないany型を使用
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData('article');
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' color={colors.border} />
      </View>
    );
  }
  return (
    <View style={styles.resultsContainer}>
      <FlashList
        data={data}
        renderItem={({ item }) => <ArticleCard article={item as ArticleData} />}
        estimatedItemSize={255}
        contentContainerStyle={{
          paddingBottom: bottomTabBarHeight,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
};

const PostSearchResults = ({ query }: { query: string }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { colors } = useTheme();
  //バックエンドのからのデータの型がわからないany型を使用
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData('post');
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' color={colors.border} />
      </View>
    );
  }

  return (
    <View style={styles.resultsContainer}>
      <FlashList
        data={data}
        renderItem={({ item }) => <PostCard post={item} />}
        estimatedItemSize={150}
        contentContainerStyle={{ paddingBottom: bottomTabBarHeight }}
      />
    </View>
  );
};

const TodaySongSearchResults = ({ query }: { query: string }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { colors } = useTheme();
  //バックエンドのからのデータの型がわからないany型を使用
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData('today');
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' color={colors.border} />
      </View>
    );
  }

  return (
    <View style={styles.resultsContainer}>
      <FlashList
        data={data}
        renderItem={({ item }) => <TodaySongsListItem {...item} />}
        estimatedItemSize={104}
        contentContainerStyle={{ paddingBottom: bottomTabBarHeight }}
      />
    </View>
  );
};

const UserSearchResults = ({ query }: { query: string }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { colors } = useTheme();
  //バックエンドのからのデータの型がわからないany型を使用
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData('user');
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' color={colors.border} />
      </View>
    );
  }
  return (
    <View style={styles.resultsContainer}>
      <FlashList
        data={data}
        renderItem={({ item }) => <UsersListItem {...item} />}
        estimatedItemSize={60}
        contentContainerStyle={{ paddingBottom: bottomTabBarHeight }}
      />
    </View>
  );
};

const TrackSearchResults = ({ query }: { query: string }) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { colors } = useTheme();
  //バックエンドのからのデータの型がわからないany型を使用
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData('music');
      if (result) {
        setData(result);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' color={colors.border} />
      </View>
    );
  }
  return (
    <View style={styles.resultsContainer}>
      {/*<FlashList
        data={data}
        renderItem={({ item }) => <TracksListItem {...item} />}
        estimatedItemSize={60.7}
        contentContainerStyle={{ paddingBottom: bottomTabBarHeight }}
      />*/}
    </View>
  );
};

const SearchResultTabs = ({ query }: { query: string }) => {
  if (!query) {
    return null;
  }

  const renderScene = ({
    route,
  }: {
    route: { key: string; title: string };
  }) => {
    switch (route.key) {
      case 'article':
        return <ArticleSearchResults query={query} />;
      case 'post':
        return <PostSearchResults query={query} />;
      case 'today':
        return <TodaySongSearchResults query={query} />;
      case 'user':
        return <UserSearchResults query={query} />;
      case 'music':
        return <TrackSearchResults query={query} />;
      default:
        return null;
    }
  };

  const { width } = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'article', title: 'Post' },
    { key: 'post', title: 'Article' },
    { key: 'today', title: 'Today' },
    { key: 'user', title: 'User' },
    { key: 'music', title: 'Music' },
  ]);

  const renderTabBar = (
    props: React.JSX.IntrinsicAttributes &
      SceneRendererProps & {
        navigationState: NavigationState<Route>;
        scrollEnabled?: boolean | undefined;
        bounces?: boolean | undefined;
        activeColor?: string | undefined;
        inactiveColor?: string | undefined;
        pressColor?: string | undefined;
        pressOpacity?: number | undefined;
        getLabelText?:
          | ((scene: Scene<Route>) => string | undefined)
          | undefined;
        getAccessible?:
          | ((scene: Scene<Route>) => boolean | undefined)
          | undefined;
        getAccessibilityLabel?:
          | ((scene: Scene<Route>) => string | undefined)
          | undefined;
        getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined;
        renderLabel?:
          | ((
              scene: Scene<Route> & { focused: boolean; color: string },
            ) => React.ReactNode)
          | undefined;
        renderIcon?:
          | ((
              scene: Scene<Route> & { focused: boolean; color: string },
            ) => React.ReactNode)
          | undefined;
        renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined;
        renderIndicator?:
          | ((props: TabBarIndicatorProps<Route>) => React.ReactNode)
          | undefined;
        renderTabBarItem?:
          | ((
              props: TabBarItemProps<Route> & { key: string },
            ) => React.ReactElement<
              Route,
              string | React.JSXElementConstructor<Route>
            >)
          | undefined;
        onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined;
        onTabLongPress?: ((scene: Scene<Route>) => void) | undefined;
        tabStyle?: StyleProp<ViewStyle>;
        indicatorStyle?: StyleProp<ViewStyle>;
        indicatorContainerStyle?: StyleProp<ViewStyle>;
        labelStyle?: StyleProp<TextStyle>;
        contentContainerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
        gap?: number | undefined;
        testID?: string | undefined;
        android_ripple?: PressableAndroidRippleConfig | undefined;
      },
  ) => {
    const { colors } = useTheme();
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors.text }}
        style={[styles.tabBar, { backgroundColor: colors.background }]}
        renderLabel={({ route }) => (
          <View
            style={[
              {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <Text style={[{ color: colors.text, textAlign: 'center' }]}>
              {route.title}
            </Text>
          </View>
        )}
        scrollEnabled={true}
        tabStyle={{ width: 80 }}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
      renderTabBar={renderTabBar}
    />
  );
};

const SearchResult = () => {
  const { query } = useLocalSearchParams();
  const insetsTop = useSafeAreaInsets().top;
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestions>();
  const [showHistory, setShowHistory] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<SearchBarCommands>(null);

  const showCurrentQuery = () => {
    searchRef.current?.setText(query as string);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    showCurrentQuery();
    setShowSuggestions(false);
  }, []);

  /*useFocusEffect(() => {
    showCurrentQuery();
    setShowSuggestions(false);
  });*/

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

  const handleChangeText = async (text: string) => {
    if (text === '') {
      setShowSuggestions(false);
      setShowHistory(true);
      setSuggestions?.({ suggestions: [], topResults: [] });
    } else {
      setShowHistory(false);
      setShowSuggestions(true);
      const suggestions = await MusicKit.getSearchSuggestions(text);
      setSuggestions?.(suggestions);
    }
  };

  const handleCancelButtonPress = () => {
    showCurrentQuery();
    setShowHistory(false);
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearch = (query: string) => {
    searchRef.current?.cancelSearch();
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

  return (
    <BgView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => (
            <BlurView
              tint='regular'
              intensity={100}
              style={{ height: insetsTop }}
            />
          ),
          headerTransparent: true,
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
          canBack={true}
          placeholder='検索'
          onChangeText={handleChangeText}
          onCancelButtonPress={handleCancelButtonPress}
          onFocus={handleSearchFocus}
          onSearchButtonPress={handleSearchButtonPress}
          key={query as string}
        />
      </BlurView>

      <View style={{ flex: 1 }}>
        <SearchResultTabs query={query as string} />
      </View>

      {showHistory && (
        <BgView
          style={{
            position: 'absolute',
            top: 40 + insetsTop,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <SearchHistoryList
            data={history}
            onItemPress={handleSearch}
            onClearHistory={clearHistory}
            searchRef={searchRef}
          />
        </BgView>
      )}
      {showSuggestions && (
        <BgView
          style={{
            position: 'absolute',
            top: 40 + insetsTop,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <SearchSuggestionsList
            data={suggestions}
            onItemPress={handleSearch}
            searchRef={searchRef}
          />
        </BgView>
      )}
    </BgView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  tabBar: {
    height: 50,
  },
});
