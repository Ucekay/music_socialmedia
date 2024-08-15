import React, { createContext, useContext, useEffect, useState } from 'react';
import { EventArg } from '@react-navigation/native';
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
import { useTheme } from '@/src/contexts/ColorThemeContext';
import Animated from 'react-native-reanimated';

interface TabPressEvent {
  defaultPrevented: boolean;
  preventDefault: () => void;
  target: string;
  type: 'tabPress';
}

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();
  const themeContainerStyle = colors.tabBarGradient;

  return (
    <Animated.View style={styles.screen}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            position: 'absolute',
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
          tabPress: (e: EventArg<'tabPress', true, undefined>) => {
            const pressedTab = e.target?.split('-')[0];
            if (pressedTab === 'create/index') {
              e.preventDefault();
            }
          },
        }}
      >
        <Tabs.Screen name='index' options={{ href: null }} />
        <Tabs.Screen
          name='(article)'
          options={{
            title: 'Article',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
        <Tabs.Screen
          name='(post)'
          options={{
            title: 'Post',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
        <Tabs.Screen
          name='create/index'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
        <Tabs.Screen
          name='(discover)'
          options={{
            title: 'Discover',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
        <Tabs.Screen
          name='(profile)'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
      </Tabs>
    </Animated.View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  screen: {
    flex: 1,
    backgroundColor: `black`,
  },
  actionContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
