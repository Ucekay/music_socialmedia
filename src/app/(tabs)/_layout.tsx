import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  ViewToken,
} from 'react-native';
import { Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import Colors from '@/src/constants/Colors';
import {
  TabActionProvider,
  useTabAction,
} from '@/src/contexts/ActionButtonContext';
import { ProfileScreenProvider } from '@/src/contexts/ProfileScreenContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CornerPathEffect } from '@shopify/react-native-skia';

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

const LABEL_WIDTH = 132;
interface renderTabsProps {
  item: {
    id: string;
    label: string;
  };
}

interface Item {
  id: string;
  text: string;
}

interface ViewableItem {
  item: Item;
  index: number;
  isViewable: boolean;
  key: string;
  section?: any;
}

interface ViewableItemsChanged {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

const SwipeablePillTabs = ({ state, descriptors, navigation }) => {
  const routeNames = [
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
      label: 'Search',
    },
    {
      id: '5',
      label: 'Articles',
    },
    {
      id: '6',
      label: 'Profile',
    },
    {
      id: '7',
      label: 'Search',
    },
    {
      id: '8',
      label: 'Articles',
    },
    {
      id: '9',
      label: 'Profile',
    },
  ];

  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const [currentIndex, setCurrentIndex] = useState(4);
  const [isScrollForced, setIsScrollForced] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const renderTabs = ({ item }: renderTabsProps) => {
    return (
      <Pressable style={styles.tabs}>
        <Text style={styles.label}>{item.label}</Text>
      </Pressable>
    );
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollForced) {
      setIsScrollForced(false);
      flatListRef.current?.setNativeProps({
        scrollEnabled: true,
      });
      return;
    }
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round((offsetX / LABEL_WIDTH) * 2);

    setCurrentIndex(newIndex);

    flatListRef.current?.setNativeProps({
      scrollEnabled: true,
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollForced) {
      return;
    }

    const offsetX = event.nativeEvent.contentOffset.x;
    const offsetDifference = offsetX - (currentIndex * LABEL_WIDTH) / 2;

    if (Math.abs(offsetDifference) > LABEL_WIDTH / 4) {
      const correctedIndex =
        offsetDifference > 0 ? currentIndex + 1 : currentIndex - 1;
      if (correctedIndex < 0) return;
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: correctedIndex,
      });
      flatListRef.current?.setNativeProps({
        scrollEnabled: false,
      });
    }
  };

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: ViewableItemsChanged) => {
      viewableItems.forEach((viewableItem: ViewToken) => {
        const { item, index } = viewableItem as ViewableItem;
        console.log(index);
        if (index === 1 || index === 7) {
          setIsScrollForced(true);
          flatListRef.current?.scrollToIndex({
            animated: false,
            index: 4,
          });
          setCurrentIndex(4);
          flatListRef.current?.setNativeProps({
            scrollEnabled: false,
          });
        }
      });
    },
    []
  );

  return (
    <View
      style={[
        styles.pillContainer,
        { position: 'absolute', right: (width - LABEL_WIDTH) / 2, bottom },
      ]}
    >
      <View style={styles.pillInner}>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
          style={{ flex: 1 }}
        >
          <FlatList
            ref={flatListRef}
            horizontal
            data={routeNames}
            renderItem={renderTabs}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: LABEL_WIDTH,
              offset: (LABEL_WIDTH / 2) * index,
              index,
            })}
            contentOffset={{ x: LABEL_WIDTH * 4, y: 0 }}
            snapToInterval={LABEL_WIDTH}
            onMomentumScrollEnd={handleScrollEnd}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
            style={{ paddingHorizontal: LABEL_WIDTH / 4 }}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    width: LABEL_WIDTH,

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
    paddingVertical: 12,
    borderRadius: 100,
    overflow: 'hidden',
  },
  tabs: {
    width: LABEL_WIDTH,
    marginHorizontal: -LABEL_WIDTH / 4,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});
