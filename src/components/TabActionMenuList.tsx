import React, { useEffect } from 'react';
import { StyleSheet, Pressable, useColorScheme, FlatList } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Link } from 'expo-router';
import { useTabAction } from '../contexts/ActionButtonContext';

import Colors from '../constants/Colors';

const actions = [
  {
    id: 'post',
    title: '新しいPost',
    icon: ({ theme }: { theme: string }) => {
      return (
        <SymbolView
          name='square.and.pencil'
          tintColor={theme}
          style={styles.symbol}
        />
      );
    },
    href: '/(tabs)/(post)',
  },
  {
    id: 'article',
    title: 'Articleを作成',
    icon: ({ theme }: { theme: string }) => {
      return (
        <SymbolView name='newspaper' tintColor={theme} style={styles.symbol} />
      );
    },
    href: '/(tabs)/home',
  },
  {
    id: 'profile',
    title: 'プロフィール',
    icon: ({ theme }: { theme: string }) => {
      return (
        <SymbolView
          name='person.crop.circle'
          tintColor={theme}
          style={styles.symbol}
        />
      );
    },
    href: '/(tabs)/profile',
  },
];

interface ListItemProps {
  item: {
    title: string;
    icon: ({ theme }: { theme: string }) => JSX.Element;
    href: string;
  };
  index: number;
}

const ListItem = ({ item, index }: ListItemProps) => {
  const colorScheme = useColorScheme();
  const { actionVisible } = useTabAction();

  const theme = Colors[colorScheme ?? 'light'].text;

  const animatedFontSize = useSharedValue(0);

  animatedFontSize.value = withTiming(actionVisible ? 20 : 0, {
    duration: 242,
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: animatedFontSize.value,
    };
  });

  const animatedContainerSize = useSharedValue(0);
  useEffect(() => {
    if (actionVisible) {
      setTimeout(() => {
        animatedContainerSize.value = withTiming(24, {
          duration: 232,
        });
      }, 10);
    } else {
      animatedContainerSize.value = withTiming(0, {
        duration: 100,
      });
    }
  }, [actionVisible]);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      width: animatedContainerSize.value,
      height: animatedContainerSize.value,
    };
  });

  let itemBorder = {};
  if (index % 2 === 1) {
    itemBorder = {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: Colors[colorScheme ?? 'light'].border,
      borderBottomColor: Colors[colorScheme ?? 'light'].border,
    };
  }

  return (
    <Link href={`${item.href}`} asChild>
      <Pressable>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.itemContainer, itemBorder]}
        >
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[animatedTextStyle, { color: theme }]}
          >
            {item.title}
          </Animated.Text>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[animatedContainerStyle]}
          >
            {item.icon({ theme })}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Link>
  );
};

const TabActionMenuList = () => {
  return (
    <FlatList
      data={actions}
      renderItem={({ item, index }) => <ListItem item={item} index={index} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 12 }}
      scrollEnabled={false}
    />
  );
};

export default TabActionMenuList;

const styles = StyleSheet.create({
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    width: '100%',
    height: `100%`,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderCurve: 'continuous',
  },
});
