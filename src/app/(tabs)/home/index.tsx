import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

import Colors from '@/src/constants/Colors';
import ArticleCard from '@/src/components/ArticleCard';
import TabActionMenu from '@/src/components/TabActionMenu';
import TabActionMenuList from '@/src/components/TabActionMenuList';
import articleData from '@/src/assets/articleData';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import type { articleDataType } from '@/src/types';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';

const itemSize = 308;

export default function TabOneScreen() {
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(false);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );

  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { actionVisible, setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors.dark.background }
      : { backgroundColor: Colors.light.background };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <FlashList
        data={articleData}
        renderItem={({ item }) => (
          <ArticleCard article={item as articleDataType} />
        )}
        estimatedItemSize={itemSize}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabBarHeight,
          paddingHorizontal: 20,
        }}
      />
      <TabActionMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
