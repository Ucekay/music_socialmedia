import React, { useCallback, useMemo, useRef } from 'react';
import { EventArg } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';

import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { useTheme } from '@/src/contexts/ColorThemeContext';

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

  const insets = useSafeAreaInsets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  return (
    <View style={styles.screenContainer}>
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
                handlePresentModalPress();
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
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='code' color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name='(post)'
            options={{
              title: 'Post',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='code' color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name='create/index'
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='code' color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name='(discover)'
            options={{
              title: 'Discover',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='code' color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name='(profile)'
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name='code' color={color} />
              ),
            }}
          />
        </Tabs>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </Animated.View>
    </View>
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
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
  actionContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
