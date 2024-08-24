import playlistsData from "@/src/assets/playlistsData";
import SongListCard from "@/src/components/SongListCard";
import BgView from "@/src/components/ThemedBgView";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from "expo-router";
import { PlaylistDetailType } from "@/src/types";
import { ScrollView } from "react-native-gesture-handler";

const PlaylistDetailScreen = () :JSX.Element => {
    const { playlistID } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();
    const queryClient = useQueryClient();
    const cachedPlaylists = queryClient.getQueryData<PlaylistDetailType[]>(['playlists']);
    const selectedPlaylist = cachedPlaylists?.find((playlist) => playlist.playlistID === playlistID);
    if (!selectedPlaylist) {
        return(
            <BgView style={[styles.container, { marginTop: headerHeight,}]}>
                <Text>エラーが発生しました</Text>
            </BgView>
        )
    }
    return(
        <BgView style={[{flex:1, marginTop: headerHeight,}]}>
            <ScrollView
            contentContainerStyle={styles.container}>
            <Image source={{uri: selectedPlaylist.ImageURL}} style={styles.image}/>
            <Text style={styles.name}>{selectedPlaylist.playlistName}</Text>
            <FlatList 
            data={selectedPlaylist.songs}
            scrollEnabled={false}
            renderItem={({item}) => (<SongListCard {...item}/>)}/>
            </ScrollView>
        </BgView>
    )
}

export default PlaylistDetailScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 16,
        gap: 16,
        alignItems: 'center'
    },
    image:{
        width: 250,
        height: 250,
        borderRadius: 8
    },
    name:{
        fontSize: 20,
        fontWeight: '500'
    }
})