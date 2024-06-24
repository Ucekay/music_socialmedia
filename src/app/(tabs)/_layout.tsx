import React, { useEffect, useRef, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Tabs } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';

import Colors from '@/src/constants/Colors';
import {
  TabActionProvider,
  useTabAction,
} from '@/src/contexts/ActionButtonContext';
import { ProfileScreenProvider } from '@/src/contexts/ProfileScreenContext';
import {
  TabsSwipeOffsetProvider,
  useTabsSwipeOffset,
} from '@/src/contexts/TabsSwipeOffsetContext';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? Colors['dark'].tabBarGradient
      : Colors['light'].tabBarGradient;

  const handleDummyPress = (e) => {
    e.preventDefault();
  };

  return (
    <TabsSwipeOffsetProvider>
      <TabActionProvider>
        <ProfileScreenProvider>
          <Tabs
            tabBar={(props) => <SwipeablePillTabs {...props} />}
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              // Disable the static render of the header on web
              // to prevent a hydration error in React Navigation v6.
              headerShown: useClientOnlyValue(false, true),
            }}
          >
            <Tabs.Screen name='index' options={{ href: null }} />
            <Tabs.Screen
              name='home'
              options={{
                title: 'Articles',
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name='code' color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name='(post)'
              options={{
                title: 'Posts',
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name='code' color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name='profile'
              options={{
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name='code' color={color} />
                ),
              }}
            />
          </Tabs>
        </ProfileScreenProvider>
      </TabActionProvider>
    </TabsSwipeOffsetProvider>
  );
}

const TabBarActionButton = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  const { actionVisible, setActionVisible } = useTabAction();

  const handleActionPress = () => {
    setActionVisible(!actionVisible);
  };
  return (
    <FontAwesome
      onPress={handleActionPress}
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
};

const LABEL_WIDTH = 68;
interface renderTabsProps {
  item: {
    id: string;
    label: string;
  };
}

const SwipeablePillTabs = ({ state, descriptors, navigation }) => {
  const routes = [
    {
      id: '1',
      label: 'Search',
    },
    {
      id: '2',
      label: 'Articles',
    },
    {
      id: '3',
      label: 'Profile',
    },
    {
      id: '4',
      label: 'dummy',
    },
  ];

  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const pillScale = useSharedValue(1);
  const animatedPillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pillScale.value }],
    };
  });

  const [currentIndex, setCurrentIndex] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  const { tabsSwipeOffset, setTabsSwipeOffset } = useTabsSwipeOffset();
  const renderTabs = ({ item }: renderTabsProps) => {
    return (
      <Pressable style={styles.tabs}>
        <Text
          style={[
            styles.label,
            { color: item.label === 'dummy' ? 'black' : 'white' },
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / LABEL_WIDTH);

    setCurrentIndex(newIndex);

    flatListRef.current?.setNativeProps({
      scrollEnabled: true,
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const offsetDifference = offsetX - currentIndex * LABEL_WIDTH;
    if (offsetDifference > LABEL_WIDTH / 2) {
      setTabsSwipeOffset(LABEL_WIDTH / 2);
    } else if (offsetDifference < -LABEL_WIDTH / 2) {
      setTabsSwipeOffset(-LABEL_WIDTH / 2);
    } else {
      setTabsSwipeOffset(offsetDifference);
    }

    pillScale.value = interpolate(
      Math.abs(tabsSwipeOffset),
      [0, LABEL_WIDTH / 2],
      [1, 1.1]
    );

    if (Math.abs(offsetDifference) > LABEL_WIDTH / 2) {
      const correctedIndex =
        offsetDifference > 0 ? currentIndex + 1 : currentIndex - 1;
      if (correctedIndex < 0 || correctedIndex > 3) return;
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: correctedIndex,
      });
      flatListRef.current?.setNativeProps({
        scrollEnabled: false,
      });
    }
  };

  return (
    <Animated.View
      style={[
        styles.pillContainer,
        { position: 'absolute', right: (width - LABEL_WIDTH * 2) / 2, bottom },
        animatedPillStyle,
      ]}
    >
      <View style={styles.pillInner}>
        <MaskedView
          style={{ flex: 1, backgroundColor: 'transparent' }}
          maskElement={
            <LinearGradient
              colors={['transparent', 'black', 'black', 'black', 'transparent']}
              start={[0, 0]}
              end={[1, 0]}
              style={{ flex: 1 }}
            />
          }
        >
          <FlatList
            ref={flatListRef}
            horizontal
            scrollEnabled
            data={routes}
            renderItem={renderTabs}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: LABEL_WIDTH,
              offset: LABEL_WIDTH * index,
              index,
            })}
            contentOffset={{ x: LABEL_WIDTH * 1, y: 0 }}
            snapToInterval={LABEL_WIDTH}
            decelerationRate='normal'
            onMomentumScrollEnd={handleScrollEnd}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{
              paddingHorizontal: LABEL_WIDTH / 2,
            }}
          />
        </MaskedView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flex: 1,
    width: LABEL_WIDTH * 2,

    borderRadius: 100,
    backgroundColor: 'black',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  pillInner: {
    flex: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  tabs: {
    width: LABEL_WIDTH,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});
