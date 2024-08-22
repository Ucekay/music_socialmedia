import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BgView from './ThemedBgView';
import { Image } from 'expo-image';
import { articleDataType } from '../types';

const MusicListCard = (props: articleDataType):JSX.Element => {
    return(
        <BgView style={styles.container}>
            <Image source={props.imageUrl} style={styles.image}/>
            <View style={{gap: 2}}>
                <Text style={styles.text1}>{props.articleTitle}</Text>
                <Text style={styles.text2}>{props.}</Text>
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
        fontWeight:'400'
    },
    text2:{
        fontSize:16,
        color:'#696969',
        fontWeight: '300'
    }
})