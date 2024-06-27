import { Button, Pressable, View, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Text from '@/src/components/ThemedText';
import BgView from '@/src/components/ThemedBgView';
import { Link } from 'expo-router';
import todaySongData from '@/src/assets/todaySongData';
import TodaySongCardForList from '@/src/components/TodaySongCardForList';

const TodayScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <BgView style={{ marginBottom: tabBarHeight, flex:1}}>
            <FlatList 
            data={todaySongData}
            renderItem={({item}) => (<TodaySongCardForList todaySong={item}/>)}
            numColumns={2}
            columnWrapperStyle={styles.column}/>
    </BgView>
  );
};

const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-around',
    marginTop: 10,
  }
})


export default TodayScreen;
