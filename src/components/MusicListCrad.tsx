import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BgView from './ThemedBgView';
import { Image } from 'expo-image';
import { MusicListType } from '../types';

const MusicListCard = (props: MusicListType):JSX.Element => {
    return(
        <BgView style={styles.container}>
            <Image source={props.artworkUrl} style={styles.image}/>
            <View style={{gap: 2}}>
                <Text style={styles.text1}>{props.musicName}</Text>
                <Text style={styles.text2}>{props.artistName}</Text>
            </View>
        </BgView>
    )
}

export default MusicListCard;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal: 16,
        gap: 12,
        paddingVertical: 8,
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 0.5
    },
    image:{
        height: 60,
        width: 60,
        borderRadius: 6
    },
    text1:{
        fontSize:16,
        fontWeight:'500'
    },
    text2:{
        fontSize:16,
        color:'#696969'
    }
})