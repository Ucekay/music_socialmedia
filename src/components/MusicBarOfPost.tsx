import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import { Image } from 'expo-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import { type PostDataType } from '../types';

const MusicBarOfPost = (props: PostDataType): JSX.Element => {
  return(
    <Image 
    source={require('../assets/images/grad1.png')}
    style={styles.musicBar}>
      <View style={styles.musicContainer}>
        <Image 
        source={props.musicUrl}
        style={styles.musicImage}/>
        <View>
          <Text style={styles.text2}>{props.songName}</Text>
          <Text style={[styles.text2, {fontWeight:'500'}]}>{props.artistName}</Text>
        </View>
        <Icon name='play' size={16} color={'#ffffff'} style={styles.playIcon}/>
      </View>
    </Image>
  )
}

export default MusicBarOfPost;

const styles = StyleSheet.create({
    musicBar:{
        height:48,
        marginLeft: 62,
        marginRight: 12,
        marginBottom: 12,
        borderRadius: 10,
      },
      musicContainer:{
       backgroundColor: 'rgba(0,0,0,0.2)',
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center'
      },
      musicImage:{
        height:40,
        width: 40,
        borderRadius:4,
        marginHorizontal:16
      },
      text2:{
        fontSize:16,
        fontWeight: "700",
        lineHeight: 21,
        color: "#ffffff"
      },
      playIcon:{
        marginRight:16,
        marginLeft:160
      }
})