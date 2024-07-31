import React, {useRef, useState, useEffect} from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavArrowLeft, Xmark, Search } from 'iconoir-react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import postData from '@/src/assets/postData';
import articleData from '@/src/assets/articleData';
import todaySongData from '@/src/assets/todaySongData';
import UserListData from '@/src/assets/userListData';
import PostCard from '@/src/components/PostCard';
import TodaySongCardForList from '@/src/components/TodaySongCardForList';
import UserListCard from '@/src/components/UserListCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ArticleCard from '@/src/components/ArticleCard';
import userData from '@/src/assets/userData';
import MusicListCard from '@/src/components/MusicListCrad';
import { MusicListType, PostType, UserListType, articleDataType } from '@/src/types';

const fetchData = async (type: 'Post'|'Article'|'TodaysSong'|'User'|'Music'): Promise<any[]> => {
  // データ取得関数　サンプルデータを返すようにしています
  if(type==='Post'){
     return postData
  } else if(type==='Article'){
    return articleData
  } else if(type==='TodaysSong'){
    return todaySongData
  } else if(type==='User'){
    return userData
  }else if(type==='Music'){
    return todaySongData
  }else {
    return ['error']
  }
  
};

type FirstRouteProps = {
  data: PostType[];
  loading: boolean
};

const FirstRoute: React.FC<FirstRouteProps> = ({data, loading}) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
  loading ? 
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#696969" />
    </View> :
    <View style={styles.scene}>
      <FlashList
          data={data}
          renderItem={({ item }) => <PostCard {...item} path='/[postId]' />}
          estimatedItemSize={150}
          contentContainerStyle={{
            paddingBottom: tabBarHeight,
          }}
        />
    </View>
  )
};

type SecondRouteProps = {
  loading: boolean
  data: articleDataType[]
}

const SecondRoute: React.FC<SecondRouteProps> = ({data, loading}) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    loading ? 
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#696969" />
    </View> :
    <View style={styles.scene}>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <ArticleCard article={item} />
        )}
        estimatedItemSize={300}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          paddingHorizontal:20
        }}
      />
    </View>
  )
};

type ThirdRouteProps = {
  loading: boolean
  data: any[]
}

const ThirdRoute: React.FC<ThirdRouteProps> = ({data, loading}) => {
  const tabBarHeight = useBottomTabBarHeight();
  return(
    loading ? 
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#696969" />
    </View> :
    <View style={[styles.scene, {paddingTop: 16}]}>
      <FlatList 
        data={data}
        renderItem={({item}) => (<TodaySongCardForList todaySong={item}/>)}
        numColumns={1}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
        }}/>
    </View>
  )
};

type ForthRouteProps = {
  loading: boolean
  data: any[]
}

const ForthRoute: React.FC<ForthRouteProps> = ({data, loading}) => {
  const tabBarHeight = useBottomTabBarHeight();
  return(
    loading ? 
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#696969" />
    </View> :
    <View style={[styles.scene, {paddingTop: 12}]}>
    <FlatList 
      data={data}
      renderItem={({item}) => (<UserListCard userID={item.userID} userName={item.user} userAvatarUrl={item.userAvatarUrl}/>)}
      numColumns={1}
      contentContainerStyle={{
        paddingBottom: tabBarHeight,
      }}/>
  </View>
)
};

type FifthRouteProps = {
  loading: boolean
  data: any[]
}

const FifthRoute: React.FC<FifthRouteProps> = ({data, loading}) => {
  const tabBarHeight = useBottomTabBarHeight();
  return(
    loading ? 
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#696969" />
    </View> :
    <View style={styles.scene}>
      <FlatList 
      data={data}
      renderItem={({item}) => (<MusicListCard artistName={item.artistName} musicName={item.songName} artworkUrl={item.artworkUrl}/>)}
      numColumns={1}
      contentContainerStyle={{
        paddingBottom: tabBarHeight
      }}/>
    </View>
)
};


const SearchResults = () => {
  
  const { key } = useLocalSearchParams<{key: string}>();

  if (!key) {
    return (
      <SafeAreaView>
        <Text>error</Text>
      </SafeAreaView>
    )
  }

  useEffect(() => {
  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };
  loadHistory();
}, [])

  const {width} = Dimensions.get('screen')

  const [query, setQuery] = useState(key);
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Post', title: 'Post' },
    { key: 'Article', title: 'Article' },
    { key: 'TodaysSong', title: 'TodaysSong' },
    { key: 'User',  title: 'User'},
    { key: 'Music', title: 'Music'}
  ]);

  const [postData, setPostData] = useState<PostType[]>([]); //この辺のdata型定義はある程度任せます。First Secondについては現在適用している型が必要十分な型です。
  const [articleData, setArticleData] = useState<articleDataType[]>([]);
  const [todaysSongData, setTodaysSongData] = useState<any[]>([]);//third forthがany[]型になっているのはサンプルデータの都合上です。お手数おかけしますが必要な要素をコンポーネントから確認してください。
  const [musicData, setMusicData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [loadedTabs, setLoadedTabs] = useState({ Post: false, Article: false, TodaysSong: false, User: false, Music: false });
  const [loadingTabs, setLoadingTabs] = useState({ Post: false, Article: false, TodaysSong: false, User: false, Music: false });

  useEffect(() => {
    const fetchDataForTab = async () => {
      if (index === 0 && !loadedTabs.Post) {
        setLoadingTabs((prev) => ({ ...prev, Post: true }));
        const data = await fetchData('Post');
        setPostData(data);
        setLoadingTabs((prev) => ({ ...prev, Post: false }));
        setLoadedTabs((prev) => ({ ...prev, Post: true }));
      } else if (index === 1 && !loadedTabs.Article) {
        setLoadingTabs((prev) => ({ ...prev, Article: true }));
        const data = await fetchData('Article');
        setArticleData(data);
        setLoadingTabs((prev) => ({ ...prev, Article: false }));
        setLoadedTabs((prev) => ({ ...prev, Article: true }));
      } else if (index === 2 && !loadedTabs.TodaysSong) {
        setLoadingTabs((prev) => ({ ...prev, TodaysSong: true }));
        const data = await fetchData('TodaysSong');
        setTodaysSongData(data);
        setLoadingTabs((prev) => ({ ...prev, TodaysSong: false }));
        setLoadedTabs((prev) => ({ ...prev, TodaysSong: true }));
      } else if (index === 3 && !loadedTabs.User) {
        setLoadingTabs((prev) => ({ ...prev, User: true }));
        const data = await fetchData('User');
        setUserData(data);
        setLoadingTabs((prev) => ({ ...prev, User: false }));
        setLoadedTabs((prev) => ({ ...prev, User: true }));
      } else if (index === 4 && !loadedTabs.Music) {
        setLoadingTabs((prev) => ({ ...prev, Music: true }));
        const data = await fetchData('Music');
        setMusicData(data);
        setLoadingTabs((prev) => ({ ...prev, Music: false }));
        setLoadedTabs((prev) => ({ ...prev, Music: true }));
      }
    };
    fetchDataForTab();
  }, [index, loadedTabs]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'Post':
        return <FirstRoute data={postData} loading={loadingTabs.Post}/>;
      case 'Article':
        return <SecondRoute data={articleData} loading={loadingTabs.Article}/>;
      case 'TodaysSong':
        return <ThirdRoute data={todaysSongData} loading={loadingTabs.TodaysSong}/>;
      case 'User':
        return <ForthRoute data={userData} loading={loadingTabs.User}/>
      case 'Music':
        return <FifthRoute data={musicData} loading={loadingTabs.Music}/>
      default:
        return null;
    }
  };

  const inputRef = useRef(null);
  const router = useRouter();

  const handleCancel = () => {
    setQuery(key);
    setFocused(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    handleSearch(query);
  };

  const handleSearch = (text: string) => {
    router.push({
        pathname: '/(tabs)/explore/result',
        params: {key: text}
    })
  };

  const handleFocus = () => {
    setFocused(true)
    inputRef.current.focus();
  };

  const renderHistoryItem = ({ item }) => (
    <Pressable onPress={() => handleSearch(item)} style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginBottom: 4}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search height={20} width={20} color={'#000000'}/>
        <Text style={styles.historyItem}>{item}</Text>
      </View>
      <Xmark height={16} width={16} color={'#000000'}/>
    </Pressable>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      renderLabel={({ route }) => (
        <Text style={[{ color: '#0000000', width: 80, textAlign:'center' }]}>{route.title}</Text>
      )}
      scrollEnabled={true} 
      tabStyle={{width: 80}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          { !focused && 
          <Pressable onPress={(e) => router.back()}>
            <NavArrowLeft height={30} width={30} color={'#000000'}/>
          </Pressable>
          }
        <Pressable onPress={handleFocus} style={[styles.searchBar, {width: width-62, flexDirection:'row', alignItems:'center', gap:12}, focused &&  {width: width-100}]}>
            <Search height={16} width={16} color={'#000000'}/>
            <TextInput
            ref={inputRef}
            placeholder="検索"
            value={query}
            onChangeText={setQuery}
            onFocus={handleFocus}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            />
        </Pressable>
        { focused && 
        <Pressable onPress={handleCancel}>
            <Text>キャンセル</Text>  
        </Pressable>
        }
        </View>
        {focused && history.length > 0 && (
        <View style={styles.contentContainer}>
        <KeyboardAvoidingView>
            <Text style={[{fontWeight: '500', marginVertical: 4}]}>履歴</Text>
            <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </KeyboardAvoidingView>
        </View>
        )}
        {!focused && (
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
        style={[styles.tabView]}
      />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header:{
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchBar: {
    height: 40,
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    color: 'gray',
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contentContainer: {
    paddingHorizontal: 16
  },
  scene: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    height: 50,
  },
  indicator: {
    backgroundColor: '#000000'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}
);

export default SearchResults;