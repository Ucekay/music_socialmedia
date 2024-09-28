import { Pressable, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type {
  Album,
  Artist,
  MusicVideo,
  Playlist,
  Song,
} from '@/modules/music-kit-module/src/MusicKit.types';

const ItemWrapper = ({
  onPress: handlePress,
  children,
}: { onPress: () => void; children: React.ReactNode }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.itemContainer, { borderColor: colors.border }]}
    >
      {children}
    </Pressable>
  );
};

export const AlbumItem = ({
  item,
  onItemPress: handleItemPress,
}: { item: Album; onItemPress: (query: string) => void }) => {
  return (
    <ItemWrapper onPress={() => handleItemPress(item.title)}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 4,
          borderCurve: 'continuous',
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: item.artwork.url }}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 15 }}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          secondary
          style={{ fontSize: 13 }}
        >
          {`Album • ${item.artistName}`}
        </Text>
      </View>
    </ItemWrapper>
  );
};

export const ArtistItem = ({
  item,
  onItemPress: handleItemPress,
}: { item: Artist; onItemPress: (query: string) => void }) => {
  return (
    <ItemWrapper onPress={() => handleItemPress(item.name)}>
      <Image
        source={{ uri: item.artwork.url }}
        style={{ width: 60, height: 60, borderRadius: 100 }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 15 }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          secondary
          style={{ fontSize: 13 }}
        >
          Artist
        </Text>
      </View>
    </ItemWrapper>
  );
};

export const MusicVideoItem = ({
  item,
  onItemPress: handleItemPress,
}: { item: MusicVideo; onItemPress: (query: string) => void }) => {
  return (
    <ItemWrapper onPress={() => handleItemPress(item.title)}>
      <View
        style={{
          height: 60,
          aspectRatio: 16 / 9,
          borderRadius: 4,
          borderCurve: 'continuous',
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: item.artwork.url }}
          style={{ height: 60, aspectRatio: 16 / 9 }}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 15 }}>
          {item.title}
        </Text>
        <Text
          secondary
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ fontSize: 13 }}
        >
          {`Music Video • ${item.artistName}`}
        </Text>
      </View>
    </ItemWrapper>
  );
};

export const PlaylistItem = ({
  item,
  onItemPress: handleItemPress,
}: { item: Playlist; onItemPress: (query: string) => void }) => {
  return (
    <ItemWrapper onPress={() => handleItemPress(item.name)}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 4,
          borderCurve: 'continuous',
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: item.artwork.url }}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 15 }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          secondary
          style={{ fontSize: 13 }}
        >
          {`Playlist • ${item.curatorName}`}
        </Text>
      </View>
    </ItemWrapper>
  );
};

export const SongItem = ({
  item,
  onItemPress: handleItemPress,
}: { item: Song; onItemPress: (query: string) => void }) => {
  return (
    <ItemWrapper onPress={() => handleItemPress(item.title)}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 4,
          borderCurve: 'continuous',
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: item.artwork.url }}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 15 }}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          secondary
          style={{ fontSize: 13 }}
        >
          {`Song • ${item.artistName}`}
        </Text>
      </View>
    </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 0.2,
    gap: 12,
  },
});
