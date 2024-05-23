import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  useColorScheme,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  SharedTransition,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import ArticleTag from '@/src/components/ArticleTag';
import Color from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import AnimatedTextInput from '../components/AnimatedPlaceholderTextInput';
import Colors from '@/src/constants/Colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ArticleEditorModal = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const articleTypes = ['general', 'review', 'liveReport', 'playlist'];

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  const opacityValues: { [key: string]: SharedValue<number> } =
    articleTypes.reduce((acc, type) => {
      acc[type] = useSharedValue(1);
      return acc;
    }, {} as { [key: string]: SharedValue<number> });

  const handleTagPress = (type: string) => {
    if (selectedTag === type) {
      setSelectedTag(null);
      articleTypes.forEach((t) => {
        opacityValues[t].value = withTiming(1, { duration: 300 });
      });
    } else {
      setSelectedTag(type);
      articleTypes.forEach((t) => {
        opacityValues[t].value = withTiming(t === type ? 1 : 0.3, {
          duration: 300,
        });
      });
    }
  };

  return (
    <BgView style={[styles.container, { paddingTop: insets.top }]}>
      <AnimatedTextInput
        label='Article Title'
        focusedLabelTop={16}
        focusedLabelSize={16}
        multiline={true}
        blurOnSubmit={true}
        style={[
          styles.title,
          { color: textColor, borderBottomColor: secondaryTextColor },
        ]}
      />
      <View style={styles.articleTagWrapper}>
        <Text style={styles.articlePickerText}>Article Type</Text>
        <View style={styles.articleTagContainer}>
          {articleTypes.map((type) => {
            const animatedStyle = useAnimatedStyle(() => {
              return {
                opacity: opacityValues[type].value,
              };
            });

            return (
              <Pressable
                key={type}
                onPress={() => handleTagPress(type)}
                style={styles.articleTag}
              >
                <Animated.View style={animatedStyle}>
                  <ArticleTag type={type} size={17} />
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={[
          styles.bottomButtonWrapper,
          {
            paddingBottom: insets.bottom,
            paddingTop: 12,
          },
        ]}
      >
        <View
          style={[
            styles.bottomButtonContainer,
            { borderTopColor: secondaryTextColor },
          ]}
        >
          <View style={[styles.buttonContainer]}>
            <FontAwesome6 name='xmark' size={16} color={textColor} />
            <Button
              title='Close'
              onPress={() => {
                navigation.goBack();
              }}
              color={textColor}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FontAwesome6 name='check' size={16} color={textColor} />
            <Button title='Publish' onPress={() => {}} color={textColor} />
          </View>
        </View>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default ArticleEditorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    borderBottomWidth: 1,
  },
  articlePickerText: {
    fontSize: 17,
  },
  articleTagWrapper: {
    gap: 12,
  },
  articleTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  articleTag: {
    width: '40%',
    marginBottom: 20,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
  },
});
