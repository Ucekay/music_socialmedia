import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Iconoir } from 'iconoir-react-native';
import { Image } from 'expo-image';

const MusicPlayerBar = ({openModal}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState("")
  useEffect(() => {
    setIsPlaying(false);
  }, []);

  const handleClick = () => useCallback(() => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 48 }} />

      <Pressable onPress={openModal} style={styles.bar}>

      <View style={styles.content}>
      <Image source={"..\assets\images\ikuokukonen.jpg"} style={styles.artwork} />
        <View style={styles.trackInfo}>
          <Text style={styles.title}>{"幾億光年"}</Text>
        </View>
      </View>

        <View style={styles.controls}>
          <Pressable onPress={handleClick} style={styles.playPauseButton}>
            <Iconoir
              width={32}
              height={32}
              color="black"
            />
          </Pressable>

          <Pressable style={styles.nextButton}>
            <Iconoir
              width={32}
              height={32}
              color="black"
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 48,
    width: '100%',
  },
  artwork:{
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    height: 62.5,
  },
  content: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
  artist: {
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playPauseButton: {
    marginRight: 10,
  },
  nextButton: {
    marginRight: 10,
  }
});

export default MusicPlayerBar;