import { Button, Pressable, View, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Text from '@/src/components/ThemedText';
import BgView from '@/src/components/ThemedBgView';
import { Link } from 'expo-router';
import todaySongData from '@/src/assets/todaySongData';
import TodaySongCardForList from '@/src/components/TodaySongCardForList';
import Animated, {FadeIn} from 'react-native-reanimated';
import TabActionMenu from '@/src/components/TabActionMenu';

const TodayScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <BgView style={{flex: 1}}>
      <BgView style={{ marginBottom: tabBarHeight, flex:1, backgroundColor: "#fff"}}>
        <Animated.View entering={FadeIn}>     
              <FlatList 
              data={todaySongData}
              renderItem={({item}) => (<TodaySongCardForList todaySong={item}/>)}
              numColumns={1}/>
        </Animated.View>
      </BgView>
      <TabActionMenu />
    </BgView>
  );
};


export default TodayScreen;
