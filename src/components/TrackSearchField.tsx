import React from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../contexts/ColorThemeContext';
import { Image } from 'expo-image';

import Text from './ThemedText';

interface SearchFieldProps {
  placeholder: string;
  trackName: string;
  setTrackName: React.Dispatch<React.SetStateAction<string>>;
}

const SONGS = [
  {
    id: '1',
    songName: 'Pray',
    artistName: 'Hakubi',
    artworkUrl:
      'https://www.uta-net.com/res/getamazon.php?jcode=4943674336401&asin=&tid=306896&uimg=',
  },
  {
    id: '2',
    songName: '331',
    artistName: '湯木慧',
    artworkUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyOkC51dEBqOnXTQ74HSMDuT0XJIw70rXCQ&s',
  },
  {
    id: '3',
    songName: `少年少女よ`,
    artistName: 'Organic Call',
    artworkUrl:
      'https://pimg.awa.io/v2/jacket/22cecc9d6d12dce69595.w630.h630.v1724018957.jpg',
  },
  {
    id: '4',
    songName: '青くね',
    artistName: 'bokula.',
    artworkUrl:
      'https://pimg.awa.io/v2/jacket/b5de9216a67ac9171e70.w200.h200.v1722773904.jpg',
  },
  {
    id: '5',
    songName: 'Cloud 9',
    artistName: "SHE'S",
    artworkUrl:
      'https://cf.mora.jp/contents/package/0000/00000083/0035/694/921/0035694921.200.jpg',
  },
  {
    id: '6',
    songName: 'ベガ',
    artistName: 'kalmia',
    artworkUrl:
      'https://cf.mora.jp/contents/package/0000/00000166/0035/486/185/0035486185.200.jpg',
  },
];

const TrackSearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  trackName,
  setTrackName,
}) => {
  const { colors } = useTheme();
  const searchFieldTextColor = colors.appleMusicText;
  const searchFieldBgColor = colors.appleMusicBg;

  const renderItem = ({ item, index }) => {
    return (
      <View
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
            source={{ uri: item.artworkUrl }}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View>
          <View>
            <Text style={{ fontSize: 16 }}>{item.songName}</Text>
          </View>
          <View>
            <Text style={{ color: colors.secondaryText }}>
              {item.artistName}
            </Text>
          </View>
        </View>
      </View>
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
