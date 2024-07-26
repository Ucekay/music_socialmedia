import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity, Keyboard, SafeAreaView, Pressable, Dimensions, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const router = useRouter();
  const {width} = Dimensions.get('screen')

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
    <Pressable onPress={() => handleSearch(item)}>
      <Text style={styles.historyItem}>{item}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleFocus}>
            <TextInput
            ref={inputRef}
            style={[styles.searchBar, {width: width-32}, focused &&  {width: width-100}]}
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
