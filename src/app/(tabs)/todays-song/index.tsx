import React from "react";
import TodaySongCardForList from "@/src/components/TodaysSongCardForList";
import BgView from "@/src/components/ThemedBgView";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import todaySongData from "@/src/assets/todaySongData";
import { StyleSheet, FlatList } from "react-native";

const TodaySongList = (): JSX.Element => {
  const tabBarHeight = useBottomTabBarHeight();
    return (
        <BgView style={{ marginBottom: tabBarHeight, flex:1}}>
            <FlatList 
            data={todaySongData}
            renderItem={({item}) => (<TodaySongCardForList todaySong={item}/>)}
            numColumns={2}
            columnWrapperStyle={styles.column}/>
        </BgView>
    )
}

const styles = StyleSheet.create({
    column: {
      justifyContent: 'space-around',
      marginTop: 10,
    }
})

export default TodaySongList;