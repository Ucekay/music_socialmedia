import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(256, 256, 256, 0.7)',
        },
        tabBarBackground: () => (
          <BlurView
            tint='light'
            intensity={60}
            style={StyleSheet.absoluteFill}
          />
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
