import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { LinearGradient } from 'expo-linear-gradient';
import { VariableBlurView } from '@candlefinance/blur-view';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import {
  BackdropFilter,
  Blur,
  Canvas,
  rotate,
} from '@shopify/react-native-skia';

const bottomTabBarHeight = 79;

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const width = useWindowDimensions().width;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <>
            <LinearGradient
              colors={['rgba(256,256,256,0)', 'rgba(256,256,256,1)']}
              style={StyleSheet.absoluteFill}
            />
            <VariableBlurView
              style={[
                StyleSheet.absoluteFill,
                { transform: [{ rotate: '180deg' }] },
              ]}
            />
          </>
        ),
      }}
    >
      <Tabs.Screen name='index' options={{ href: null }} />
      <Tabs.Screen
        name='articles'
        options={{
          title: 'Articles',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
    </Tabs>
  );
}
