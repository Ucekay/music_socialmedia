import React, { createContext, useContext, useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Pressable, StyleSheet, useColorScheme } from 'react-native';
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
                  colors={themeContainerStyle}
                  style={StyleSheet.absoluteFill}
                />
                <BlurView
                  tint='regular'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </>
            ),
          }}
          screenListeners={{
            tabPress: (e) => {
              const pressedTab = e.target.split('-')[0];
              if (pressedTab === 'profile') {
                handleDummyPress(e);
              }
            },
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

          {/*<Tabs.Screen
        name='two'
        options={{
          title: 'Tab Two',
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
      />*/}
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
              tabBarIcon: ({ color }) => <TabBarActionButton color={color} />,
            }}
          />
        </Tabs>
      </ProfileScreenProvider>
    </TabActionProvider>
  );
}

const TabBarActionButton = ({ color }: { color: string }) => {
  const { actionVisible, setActionVisible } = useTabAction();

  const handleActionPress = () => {
    setActionVisible(!actionVisible);
  };
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Pressable
        onPress={handleActionPress}
        style={{
          width: 24,
          position: 'absolute',
          bottom: 10,
          top: 10,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  actionContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
