import SongListCard from '@/src/components/SongListCard';
import BgView from '@/src/components/ThemedBgView';
import { useHeaderHeight } from '@react-navigation/elements';
import { Image } from 'expo-image';
import React from 'react';
import { FlatList, StyleSheet, Text, ScrollView, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { PlaylistDetailType } from '@/src/types';
import { Button } from '@/src/components/Button';
import * as IconoirIcons from 'iconoir-react-native';

const PlaylistDetailScreen = (): JSX.Element => {
  const { playlistID } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const queryClient = useQueryClient();
  const cachedPlaylists = queryClient.getQueryData<PlaylistDetailType[]>([
    'playlists',
  ]);
  const selectedPlaylist = cachedPlaylists?.find(
    (playlist) => playlist.playlistID === playlistID
  );
  if (!selectedPlaylist) {
    return (
      <BgView style={[styles.container, { marginTop: headerHeight }]}>
        <Text>エラーが発生しました</Text>
      </BgView>
    );
  }
  return (
    <BgView style={[{ flex: 1, marginTop: headerHeight }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: selectedPlaylist.ImageURL }}
          style={styles.image}
        />
        <Text style={styles.name}>{selectedPlaylist.playlistName}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => console.log('Button pressed')}
              text='再生'
              icon='Play'
              renderIcon={({ name, size, color }) => {
                const IconComponent = IconoirIcons[name];
                return (
                  <IconComponent
                    width={size}
                    height={size}
                    color={color}
                    fill={color}
                  />
                );
              }}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => console.log('Button pressed')}
              text='曲を追加'
              icon='Edit'
              renderIcon={({ name, size, color }) => {
                const IconComponent = IconoirIcons[name];
                return (
                  <IconComponent
                    width={size}
                    height={size}
                    color={color}
                    fill={color}
                  />
                );
              }}
              variant='outline'
            />
          </View>
        </View>
        <FlatList
          data={selectedPlaylist.songs}
          scrollEnabled={false}
          renderItem={({ item }) => <SongListCard {...item} />}
        />
      </ScrollView>
    </BgView>
  );
};

export default PlaylistDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    gap: 16,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
    gap: 8,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});
