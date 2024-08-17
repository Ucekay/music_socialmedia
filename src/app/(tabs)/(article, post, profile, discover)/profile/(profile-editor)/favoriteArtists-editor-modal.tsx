import BgView from '@/src/components/ThemedBgView';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  useColorScheme,
  FlatList,
  Modal,
} from 'react-native';
import { ProfileEditorContext } from '@/src/contexts/ProfileEditor';
import { useNavigation, useRouter } from 'expo-router';
import Color from '@/src/constants/Colors';
import Colors from '@/src/constants/Colors';
import { Xmark, Plus, Search } from 'iconoir-react-native';

const FavoriteArtistsEditor = (): JSX.Element => {
  const context = useContext(ProfileEditorContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [query, setQuery] = useState('');

  const router = useRouter();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  if (!context) {
    throw new Error(
      'FavoriteArtistsEditorModal must be used within a ProfileEditorProvider'
    );
  }

  const colorScheme = useColorScheme();
  const textColor = Color[colorScheme ?? 'light'].text;
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;

  const { tag, setTag } = context;
  const [tagEditing, setTagEditing] = useState(tag);

  const handleDelete = (tagToRemove: string) => {
    setTagEditing((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleAdd = () => {};

  const handleSubmit = () => {};

  return (
    <BgView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.headerItem, { alignItems: 'flex-start' }]}
        >
          <Text style={[styles.text1, { color: textColor }]}>キャンセル</Text>
        </Pressable>
        <View style={[styles.headerItem]}>
          <Text style={[styles.text2, { color: textColor }]}>
            favorite artists
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setTag(tagEditing);
            router.back();
          }}
          style={[styles.headerItem, { alignItems: 'flex-end' }]}
        >
          <Text style={[styles.text2, { color: '#2f95dc' }]}>完了</Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.Editor,
          { borderColor: textColor, height: tagEditing.length * 25 + 55 },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>
            favorite artists
          </Text>
          <Pressable
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#2f95dc',
                borderRadius: 6,
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 2,
                paddingHorizontal: 4,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#2f95dc' }}
              >
                追加
              </Text>
              <Plus height={14} width={14} color='#2f95dc' />
            </View>
          </Pressable>
        </View>
        <FlatList
          data={tagEditing}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
                gap: 16,
                paddingBottom: 4,
              }}
            >
              <Text>{item}</Text>
              <Pressable
                onPress={() => {
                  handleDelete(item);
                }}
              >
                <View
                  style={{
                    borderWidth: 0.3,
                    borderColor: textColor,
                    borderRadius: 6,
                    alignItems: 'center',
                  }}
                >
                  <Xmark height={14} width={14} color={textColor} />
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <View
              style={{
                height: height * 0.35,
                width: width * 0.8,
                padding: 16,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                position: 'relative',
                marginBottom: 200,
              }}
            >
              <View
                style={{
                  height: height * 0.35 - 60,
                  borderBottomColor: 'ddd',
                  borderBottomWidth: 0.2,
                  paddingBottom: 8,
                }}
              >
                <View
                  style={[
                    styles.searchBar,
                    {
                      width: width * 0.8 - 32,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 8,
                    },
                  ]}
                >
                  <Search height={16} width={16} color={'#000000'} />
                  <TextInput
                    placeholder='検索'
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSubmit}
                    returnKeyType='search'
                  />
                </View>
                <FlatList
                  data={tagEditing}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 4,
                        justifyContent: 'space-between',
                        paddingBottom: 4,
                      }}
                    >
                      <Text>{item}</Text>
                      <Pressable
                        onPress={() => {
                          handleAdd();
                        }}
                      >
                        <View
                          style={{
                            borderWidth: 0.5,
                            borderColor: '#2f95dc',
                            borderRadius: 6,
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingVertical: 2,
                            paddingHorizontal: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '600',
                              color: '#2f95dc',
                            }}
                          >
                            追加
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  )}
                />
              </View>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={{
                  padding: 8,
                }}
              >
                <Text>閉じる</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </BgView>
  );
};

export default FavoriteArtistsEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  Editor: {
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 0.3,
    borderRadius: 20,
    height: 100,
    gap: 8,
  },
  text1: {
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchBar: {
    height: 40,
    borderRadius: 15,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
  },
});
