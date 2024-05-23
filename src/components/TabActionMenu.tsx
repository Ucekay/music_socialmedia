import {
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedProps,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTabAction } from '../contexts/ActionButtonContext';
import { useProfileScreen } from '../contexts/ProfileScreenContext';
import Colors from '../constants/Colors';
import TabActionMenuList from './TabActionMenuList';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const TabActionMenu = () => {
  const { actionVisible, setActionVisible } = useTabAction();
  const { profileDismissed, setProfileDismissed } = useProfileScreen();
  const { width, height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();

  const handlePress = () => {
    setActionVisible(false);
  };

  const actionBackgroundOpacity = useSharedValue(0);
  const actionContainerHeight = useSharedValue(0);
  const actionContainerWidth = useSharedValue(0);
  const actionContainerIntensity = useSharedValue(0);

  actionBackgroundOpacity.value = withTiming(actionVisible ? 1 : 0, {
    duration: 250,
  });
  actionContainerHeight.value = withTiming(actionVisible ? 145 : 0, {
    duration: 250,
  });
  actionContainerWidth.value = withTiming(actionVisible ? 200 : 0, {
    duration: profileDismissed ? 0 : 250,
  });
  actionContainerIntensity.value = withTiming(actionVisible ? 150 : 0, {
    duration: 350,
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: actionBackgroundOpacity.value,
    };
  });
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: actionContainerHeight.value,
      width: actionContainerWidth.value,
      bottom: tabBarHeight + 16,
    };
  });
  const animatedBlurIntensity = useAnimatedProps(() => {
    return {
      intensity: actionContainerIntensity.value,
    };
  });
  const actionBackGroundColor = () => {
    if (colorScheme === 'dark') {
      return 'rgba(0,0,0,0.6)';
    } else {
      return 'rgba(0,0,0,0.3)';
    }
  };
  return (
    <>
      {actionVisible && (
        <AnimatedPressable
          onPress={handlePress}
          style={[
            styles.actionBackground,
            animatedBackgroundStyle,
            {
              height,
              backgroundColor: actionBackGroundColor(),
            },
          ]}
        />
      )}
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[animatedContainerStyle, styles.actionContainerWrapper]}
      >
        <AnimatedBlurView
          animatedProps={animatedBlurIntensity}
          tint={
            colorScheme === 'dark'
              ? 'systemThinMaterialDark'
              : 'systemThinMaterialLight'
          }
          style={styles.actionContainer}
        >
          <TabActionMenuList />
        </AnimatedBlurView>
      </Animated.View>
    </>
  );
};

export default TabActionMenu;

const styles = StyleSheet.create({
  actionBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  actionContainerWrapper: {
    position: 'absolute',
    right: 16,
    borderRadius: 16,
    borderCurve: 'continuous',
    zIndex: 100,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  actionContainer: {
    zIndex: 101,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
});
