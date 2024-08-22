import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity, Keyboard, SafeAreaView, Pressable, Dimensions, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Search, Xmark } from 'iconoir-react-native';
import { FlashList } from '@shopify/flash-list';
import todaySongData from '@/src/assets/todaySongData';
import MusicListCard from '@/src/components/MusicListCrad';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const router = useRouter();
  const {width} = Dimensions.get('screen')

  const tabBarHeight = useBottomTabBarHeight();

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
  }, []);

  const handleSearch = (text: string) => {
    router.push({
        pathname: '/explore/result',
        params: {key: text}
    })
    setFocused(false)
    saveHistory(text)
    setQuery('')
  };

  const handleCancel = () => {
    setQuery('');
    setFocused(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    handleSearch(query);
  };

  const saveHistory = async (text) => {
    try {
      const newHistory = [text, ...history.filter((item) => item !== text)];
      setHistory(newHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  const handleFocus = () => {
    setFocused(true)
    inputRef.current.focus();
  };

  const renderHistoryItem = ({ item }) => (
    <Pressable onPress={() => handleSearch(item)} style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginBottom: 8}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Search height={20} width={20} color={'#000000'}/>
        <Text style={styles.historyItem}>{item}</Text>
      </View>
      <Xmark height={20} width={20} color={'#000000'}/>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleFocus} style={[styles.searchBar, {width: width-32, flexDirection:'row', alignItems:'center', gap:12}, focused &&  {width: width-100}]}>
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
      <View style={styles.contentContainer}>
      {focused && history.length > 0 && (
        <KeyboardAvoidingView>
            <Text style={[{fontWeight: '500', marginVertical: 4}]}>履歴</Text>
            <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </KeyboardAvoidingView>
      )}
      </View>
      {!focused && 
      <FlashList
      data={todaySongData}
      renderItem={({item}) => (<MusicListCard artistName={item.artistName} musicName={item.songName} artworkUrl={item.artworkUrl}/>)}
      numColumns={1}
      estimatedItemSize={70}
      contentContainerStyle={{
        paddingBottom: tabBarHeight}}/>}
    </SafeAreaView>
  );
};

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
  searchBar: {
    height: 40,
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
  },
  cancelButton: {
    marginLeft: 10,
    flex: 1
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  }
});

export default SearchScreen;
