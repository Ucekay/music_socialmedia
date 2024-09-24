import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions
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
  SoundMinSolid, 
  Play
} from 'iconoir-react-native';
import { FontWidth } from '@shopify/react-native-skia';


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
  const { width, height} = useWindowDimensions();

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      marginBottom: 20,
    }}>
      {/* ジャケット写真 */}
      <Artwork value={artworkUrl} handle={handleArtwork}
      style={{
        width: 0.65*width,
        height: 0.65*width,
        marginBottom: 0.02*height,
        borderRadius: 0.02*width,
        marginTop: 0.065*height,
      }}/>

      {/* 曲情報 */}
      <TrackInfo songValue={songName} artistValue={artistName}
        songHandle={handleSong} artistHandle={handleArtist}
        style={{trackInfo: {
          width:'90%',
          alignItems:"flex-start",
          marginTop: 0.05*height},
          title: {
            fontSize: 0.055*width,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'left', 
          },
          artist: {
            fontSize: 0.055*width,
            color: 'white',
            textAlign: 'left', 
            opacity: 0.7
          },
          }}/>

      {/* スライダー */}
      
      <View style={styles.bar}/>
      <View style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 0.015*height,
          marginBottom: 0.02*height,
          marginLeft: 5,
          marginRight: 5,
        }}>
        <Text style={{
            color: 'white',
            fontSize: 0.0175*height,
            opacity: 0.7
          }}>{"0:00"}</Text>
        <Text style={{
            color: 'white',
            fontSize: 0.0175*height,
            opacity: 0.7
          }}>{"-4:37"}</Text>
      </View>


      {/* 再生/一時停止・スキップボタン */}
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '80%',
          marginBottom: 0.03*height,
        }}>
        <Pressable style={styles.controlButton}>
            <SkipPrevSolid
              width={0.12*width}
              height={0.12*width}
              color="white"
            />
        </Pressable>

        <MusicControl value={isPlaying} handle={handlePlaying}
          width={0.13*width}/>

        <Pressable style={styles.controlButton}>
            <SkipNextSolid
              width={0.12*width}
              height={0.12*width}
              color="white"
            />
        </Pressable>
      </View>

      {/* 音量調節バー */}
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '90%',
          marginBottom: 0.045*height,
        }}>
            <SoundMinSolid
              width={0.04*width}
              height={0.04*width}
              color="white"
            />
            <View style={styles.soundbar}/>
            <SoundHighSolid
              width={0.04*width}
              height={0.04*width}
              color="white"
            />
      </View>

      {/* プレイリストボタン */}
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '90%',
          marginBottom: 0.03*height,
        }}>
            <Shuffle
            width={0.065*width}
            height={0.065*width}
            color="white"
            />
            <Repeat
            width={0.065*width}
            height={0.065*width}
            color="white"
            />
            <Infinite
            width={0.065*width}
            height={0.065*width}
            color="white"
            />
            <PlaylistPlay
            width={0.065*width}
            height={0.065*width}
            color="white"
            />
      </View>
    </View>
  );
};

const Artwork = memo(({value, handle, style}) =>{
  return(
    <Image source={require("../assets/images/ikuokukonen.jpg")} style={style} />
  )
}
)

const MusicControl = memo(({value,handle, width}) => {
    return(
  <Pressable style={styles.playPauseButton}
  onPress={handle}>
    {value?
      <PauseSolid
        width={width}
        height={width}
        color="white"/>
        :
        <PlaySolid
        width={width}
        height={width}
        color="white"/>}
  </Pressable>
  )
})
const TrackInfo = memo(({songValue, artistValue, songHandle, artistHandle, style}) => {
  return(
    <View style={style.trackInfo}>
    <Text style={style.title}>{"幾億光年"}</Text>
    <Text style={style.artist}>{"Omoinotake"}</Text>
  </View>

  )
})
const getWimdowDimensions = () => {
  const dimensions = useWindowDimensions()
  return(
    dimensions
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  artwork: {
    width: 0.7*getWimdowDimensions.width,
    height: "70%",
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 45,
  },
  bar: {
    // デフォルトのスタイル
    width: "90%", 
    height: 5, 
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 6
  },
  soundbar: {
    width: "80%",
    height: 5,
    backgroundColor: 'black',
    borderRadius: 5,
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
    padding: 0,
  },
  playPauseButton: {
    padding: 0,
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