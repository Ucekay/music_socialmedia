import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import Colors from '../constants/Colors';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';

import TodaySongCard from '@/src/components/TodaySongCard';
import { useState } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedFontAwesome6 = Animated.createAnimatedComponent(FontAwesome6);

const TodaySongModal = () => {
  const { top, bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.background
      : Colors.light.secondaryBackground;
  const secondaryBackgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const iconsColor = colorScheme === 'dark' ? 'white' : 'black';

  const [isToggled, setToggled] = useState(false);

  const flip = useSharedValue(0);
  flip.value = withTiming(isToggled ? 180 : 0);
  const animatedToggleButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${flip.value}deg` }],
    };
  });

  return (
    <View
      style={[
        styles.cardWrapper,
        { paddingTop: top, paddingBottom: bottom, backgroundColor },
      ]}
    >
      <TodaySongCard />
      <View style={styles.buttonContainer}>
        <View
          style={[styles.button, { backgroundColor: secondaryBackgroundColor }]}
        >
          <FontAwesome6 name='heart' size={20} color={iconsColor} />
        </View>
        <View
          style={[
            styles.playButtonContainer,
            { backgroundColor: secondaryBackgroundColor },
          ]}
        >
          <FontAwesome6 name='play' size={20} color={iconsColor} />
        </View>
        <AnimatedPressable
          onPress={() => setToggled(!isToggled)}
          style={[styles.button, { backgroundColor: secondaryBackgroundColor }]}
        >
          <AnimatedFontAwesome6
            name='chevron-up'
            size={20}
            color={iconsColor}
            style={animatedToggleButtonStyle}
          />
        </AnimatedPressable>
      </View>
    </View>
  );
};

export default TodaySongModal;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  playButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    padding: 10,
  },
});
