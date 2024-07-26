import React, {useRef, useState, useEffect} from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavArrowLeft } from 'iconoir-react-native';

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
  const GetPostData = () => {

  }
  }, []);

  const {width} = Dimensions.get('screen')

  const [query, setQuery] = useState(key);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

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
    <Pressable onPress={() => handleSearch(item)}>
      <Text style={styles.historyItem}>{item}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          { !focused && 
          <Pressable onPress={(e) => router.back()}>
            <NavArrowLeft height={30} width={30} color={'#000000'}/>
          </Pressable>
          }
        <Pressable onPress={handleFocus}>
            <TextInput
            ref={inputRef}
            style={[styles.searchBar, {width: width-62}, focused &&  {width: width-100}]}
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
  }
});

export default SearchResults;
