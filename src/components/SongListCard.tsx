import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import BgView from './ThemedBgView';
import { Image } from 'expo-image';
import { SongTypeSimple } from '../types';

const width = Dimensions.get('window').width

const SongListCard = (props: SongTypeSimple ):JSX.Element => {
    return(
        <BgView style={styles.container}>
            <Image source={props.artworkURL} style={styles.image}/>
            <View style={{gap: 2}}>
                <Text style={styles.text1}>{props.musicName}</Text>
                <Text style={styles.text2}>{props.artistName}</Text>
            </View>
        </BgView>
    )
}

export default SongListCard;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal: 16,
        gap: 12,
        paddingVertical: 8,
        borderBottomColor: '#d0d0d0',
        borderBottomWidth: 0.5,
        width: width-32
    },
    image:{
        height: 45,
        width: 45,
        borderRadius: 6
    },
    text1:{
        fontSize:16,
        fontWeight:'400'
    },
    text2:{
        fontSize:16,
        color:'#696969',
        fontWeight: '300'
    }
})