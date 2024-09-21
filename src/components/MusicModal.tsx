import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Image} from 'expo-image'
import {
  PlaySolid, 
  PauseSolid, 
  SkipNextSolid, 
  SkipPrevSolid,
  Repeat,
  Infinite,
  RepeatOnce,
  PlaylistPlus,
  PlaylistPlay,
  Shuffle,
  SoundHighSolid,
  SoundMinSolid 
} from 'iconoir-react-native';


export const MusicPlayerModal = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const handlePlaying = () => {
    setIsPlaying(!isPlaying)
  }
  const handleArtwork = () => {
    setArtworkUrl(artworkUrl)
  }
  const handleSong = () => {
    setSongName(songName)
  }
  const handleArtist = () => {
    setArtistName(artistName)
  }

  return (
    <View style={styles.container}>
      {/* ジャケット写真 */}
      <Artwork value={artworkUrl} handle={handleArtwork}/>

      {/* 曲情報 */}
      <TrackInfo songValue={songName} artistValue={artistName}
        songHandle={handleSong} artistHandle={handleArtist} />

      {/* スライダー */}
      
      <View style={styles.bar}/>
      <View style={styles.times}>
        <Text style={styles.timestamp}>{"0:00"}</Text>
        <Text style={styles.timestamp}>{"-4:37"}</Text>
      </View>


      {/* 再生/一時停止・スキップボタン */}
      <View style={styles.controls}>
        <Pressable style={styles.controlButton}>
            <SkipPrevSolid
              width={40}
              height={40}
              color="white"
            />
        </Pressable>

        <MusicControl value={isPlaying} handle={handlePlaying}/>

        <Pressable style={styles.controlButton}>
            <SkipNextSolid
              width={40}
              height={40}
              color="white"
            />
        </Pressable>
      </View>

      {/* 音量調節バー */}
      <View style={styles.volumeControl}>
            <SoundMinSolid
              width={15}
              height={15}
              color="white"
            />
            <View style={styles.soundbar}/>
            <SoundHighSolid
              width={15}
              height={15}
              color="white"
            />
      </View>

      {/* プレイリストボタン */}
      <View style={styles.controls}>
            <Shuffle
            width={24}
            height={24}
            color="white"
            />
            <Repeat
            width={24}
            height={24}
            color="white"
            />
            <Infinite
            width={24}
            height={24}
            color="white"
            />
            <PlaylistPlay
            width={24}
            height={24}
            color="white"
            />
      </View>
    </View>
  );
};

const Artwork = memo(({value, handle}) =>{
  return(
    <Image source={require("../assets/images/ikuokukonen.jpg")} style={styles.artwork} />
  )
}
)

const MusicControl = memo(({value,handle}) => {
    return(
  <Pressable style={styles.playPauseButton}
  onPress={handle}>
    {value?
      <PauseSolid
        width={40}
        height={40}
        color="white"/>
        :
        <PlaySolid
        width={40}
        height={40}
        color="white"/>}
  </Pressable>
  )
})
const TrackInfo = memo(({songValue, artistValue, songHandle, artistHandle}) => {
  return(
    <View style={styles.trackInfo}>
    <Text style={styles.title}>{"幾億光年"}</Text>
    <Text style={styles.artist}>{"Omoinotake"}</Text>
  </View>

  )
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  artwork: {
    width: 240,
    height: 240,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 45,
  },
  bar: {
    // デフォルトのスタイル
    width: "90%", 
    height: 5, 
    backgroundColor: 'black',
    marginTop: 6
  },
  soundbar: {
    width: "80%",
    height: 5,
    backgroundColor: 'black',
    marginLeft: 5,
    marginRight: 5
  },
  trackInfo: {
    width:'90%',
    alignItems:"flex-start",
    marginTop: 40,
  },
  times:{
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  timestamp:{
    color: 'white',
    fontSize: 12,
    opacity: 0.7
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left', 
  },
  artist: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left', 
    opacity: 0.7
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  controlButton: {
    padding: 10,
  },
  playPauseButton: {
    padding: 10,
  },
  volumeControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginBottom: 30,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  playlistButton: {
    backgroundColor: '#0000FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  playlistButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MusicPlayerModal;