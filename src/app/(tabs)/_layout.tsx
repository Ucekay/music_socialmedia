import React, { useCallback, useMemo, useRef } from 'react';
import { EventArg } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, StyleSheet, Pressable } from 'react-native';
import { Href, Link, Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { MultiplePages, GoogleDocs, Voice } from 'iconoir-react-native';
import { SvgProps } from 'react-native-svg';

import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';

import Text from '@/src/components/ThemedText';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import type { ColorScheme } from '@/src/types';

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
  const snapPoints = useMemo(() => [220 + insets.bottom], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const themedContentStyle = { backgroundColor: colors.secondaryBackground };

  return (
    <View style={styles.screen}>
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={themedContentStyle}
        handleIndicatorStyle={{ backgroundColor: colors.border }}
        maxDynamicContentSize={220 + insets.bottom}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={[styles.content, { marginBottom: 16 + insets.bottom }]}>
            <CreateContentList colors={colors} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

type CreateItemData = {
  id: string;
  icon: React.FC<SvgProps>;
  text: string;
  onPress: () => void;
  href: Href<string>;
};

const CreateContentList = ({ colors }: { colors: ColorScheme }) => {
  const createItems: CreateItemData[] = [
    {
      id: 'article',
      icon: MultiplePages,
      text: '新しいArticleを作成',
      onPress: () => {},
      href: '/article-editor-modal',
    },
    {
      id: 'post',
      icon: GoogleDocs,
      text: '新しいPostを作成',
      onPress: () => {},
      href: '/post-editor-modal',
    },
    {
      id: 'music',
      icon: Voice,
      text: '今日の一曲を作成',
      onPress: () => {},
      href: '/today-song-editor-modal',
    },
  ];

  return (
    <View style={[styles.list, { borderColor: colors.border }]}>
      {createItems.map((item, index) => (
        <CreateContentListItem
          key={item.id}
          icon={<item.icon width={28} height={28} color={colors.text} />}
          text={item.text}
          onPress={item.onPress}
          showBorder={index % 2 === 1}
          colors={colors}
          href={item.href}
        />
      ))}
    </View>
  );
};

type ListItemProps = {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
  showBorder?: boolean;
  colors: ColorScheme;
  href: Href<string>;
};

const CreateContentListItem = ({
  icon,
  text,
  onPress,
  showBorder,
  colors,
  href,
}: ListItemProps) => {
  return (
    <Link href={href}>
      <View
        style={[
          styles.listItemContainer,
          {
            borderColor: colors.border,
            borderTopWidth: showBorder ? 0.5 : 0,
            borderBottomWidth: showBorder ? 0.5 : 0,
          },
        ]}
      >
        <View>{icon}</View>
        <View style={{ width: 174.3 }}>
          <Text style={{ fontSize: 20 }}>{text}</Text>
        </View>
        <View>
          <MultiplePages width={28} height={28} color={'transparent'} />
        </View>
      </View>
    </Link>
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
    justifyContent: 'center',
    alignContent: 'center',
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
    padding: 16,
    paddingTop: 0,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    gap: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
