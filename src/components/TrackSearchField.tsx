import { Image } from 'expo-image';
import type React from 'react';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';
interface Song {
  id: string;
  title: string;
  artist: string;
  coverArtUrl: string;
}

interface SearchFieldProps {
  placeholder: string;
  onTrackSelect: (track: Song) => void;
}

const SONGS = [
  {
    id: '1',
    title: 'Pray',
    artist: 'Hakubi',
    coverArtUrl:
      'https://www.uta-net.com/res/getamazon.php?jcode=4943674336401&asin=&tid=306896&uimg=',
  },
  {
    id: '2',
    title: '331',
    artist: '湯木慧',
    coverArtUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyOkC51dEBqOnXTQ74HSMDuT0XJIw70rXCQ&s',
  },
  {
    id: '3',
    title: `少年少女よ`,
    artist: 'Organic Call',
    coverArtUrl:
      'https://pimg.awa.io/v2/jacket/22cecc9d6d12dce69595.w630.h630.v1724018957.jpg',
  },
  {
    id: '4',
    title: '青くね',
    artist: 'bokula.',
    coverArtUrl:
      'https://pimg.awa.io/v2/jacket/b5de9216a67ac9171e70.w200.h200.v1722773904.jpg',
  },
  {
    id: '5',
    title: 'Cloud 9',
    artist: "SHE'S",
    coverArtUrl:
      'https://cf.mora.jp/contents/package/0000/00000083/0035/694/921/0035694921.200.jpg',
  },
  {
    id: '6',
    title: 'ベガ',
    artist: 'kalmia',
    coverArtUrl:
      'https://cf.mora.jp/contents/package/0000/00000166/0035/486/185/0035486185.200.jpg',
  },
];

const TrackSearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  onTrackSelect,
}) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const searchFieldTextColor = colors.appleMusicText;
  const searchFieldBgColor = colors.appleMusicBg;

  const handlePress = (item: Song) => {
    onTrackSelect(item);
  };

  const renderItem = ({ item, index }: { item: Song; index: number }) => {
    return (
      <Pressable
        onPress={() => handlePress(item)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          gap: 8,
          borderColor: colors.border,
          borderTopWidth: index % 2 === 0 ? 1 : 0,
          borderBottomWidth: index % 2 === 0 ? 1 : 0,
        }}
      >
        <View
          style={{
            borderRadius: 8,
            borderCurve: 'continuous',
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: item.coverArtUrl }}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View>
          <View>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
          </View>
          <View>
            <Text style={{ color: colors.secondaryText }}>{item.artist}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <View
        style={[
          styles.inputInner,
          {
            backgroundColor: searchFieldBgColor,
            borderColor: searchFieldTextColor,
          },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={searchFieldTextColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={[styles.inputText, { color: searchFieldTextColor }]}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 240,
          backgroundColor: 'transparent',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: searchFieldTextColor,
          borderCurve: 'continuous',
        }}
      >
        <FlatList
          data={SONGS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
          nestedScrollEnabled
          contentContainerStyle={{ padding: 12 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputInner: {
    padding: 12,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TrackSearchField;
