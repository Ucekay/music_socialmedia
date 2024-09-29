import { useNavigation } from 'expo-router';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  type TargetedEvent,
  TextInput,
  type TextInputSubmitEditingEventData,
  View,
  useWindowDimensions,
} from 'react-native';

import { NavArrowLeft, Search, XmarkCircleSolid } from 'iconoir-react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../contexts/ColorThemeContext';

import Text from './ThemedText';

import type { SearchBarCommands } from 'react-native-screens';

interface SearchBarProps {
  placeholder?: string;
  onBlur?: () => void;
  onCancelButtonPress?: () => void;
  onChangeText?: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onSearchButtonPress?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  canBack: boolean;
}

const SearchBar = forwardRef<SearchBarCommands, SearchBarProps>(
  (props, ref?) => {
    const {
      placeholder = 'Search',
      onFocus,
      onBlur,
      onChangeText,
      onSearchButtonPress,
      onCancelButtonPress,
      canBack,
    } = props;
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [initialWidth, setInitialWidth] = useState(
      canBack ? width - 48 : width - 32,
    );
    const inputRef = useRef<TextInput>(null);

    const focusedSearchBarWidth = canBack
      ? initialWidth - 49
      : initialWidth - 65;

    useImperativeHandle(
      ref,
      () => {
        return {
          value: value,
          focus: () => inputRef.current?.focus(),
          blur: () => inputRef.current?.blur(),
          clearText: () => {
            setValue('');
            onChangeText?.('');
          },
          toggleCancelButton: (show: boolean) => setIsFocused(show),
          setText: (text: string) => {
            setValue(text);
            onChangeText?.(text);
          },
          cancelSearch: () => {
            handleCancel();
          },
        };
      },
      [onChangeText, value],
    );

    const handleLayout = (event: LayoutChangeEvent) => {
      if (initialWidth === 0) setInitialWidth(event.nativeEvent.layout.width);
    };

    const searchBoxWidth = useSharedValue(initialWidth);
    const cancelButtonOpacity = useSharedValue(0);
    const backButtonWidth = useSharedValue(32);
    const backButtonMarginLeft = useDerivedValue(() => {
      return (backButtonWidth.value / 2) * -1;
    });

    const animatedSearchBoxStyle = useAnimatedStyle(() => {
      return {
        width: searchBoxWidth.value,
      };
    });
    const animatedCancelButtonStyle = useAnimatedStyle(() => {
      return {
        opacity: cancelButtonOpacity.value,
      };
    });
    const animatedBackButtonStyle = useAnimatedStyle(() => {
      return {
        width: backButtonWidth.value,
        marginLeft: backButtonMarginLeft.value,
      };
    });

    const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const handleChangeText = (text: string) => {
      setValue(text);
      onChangeText?.(text);
    };

    const handleSubmit = (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => {
      onSearchButtonPress?.(e);
    };

    const handleClear = () => {
      setValue('');
      onChangeText?.('');
      inputRef.current?.focus();
    };

    const handleCancel = () => {
      searchBoxWidth.value = withTiming(initialWidth, { duration: 300 });
      cancelButtonOpacity.value = withTiming(0, {
        duration: 300,
      });
      backButtonWidth.value = withTiming(32, { duration: 300 });
      setValue('');
      onChangeText?.('');
      setIsFocused(false);
      inputRef.current?.blur();
      onCancelButtonPress?.();
    };

    const handleSearchPress = () => {
      inputRef.current?.focus();
    };

    const handleBack = () => {
      navigation.goBack();
    };

    const handlePress = () => {
      backButtonWidth.value = withTiming(0, { duration: 300 });
      searchBoxWidth.value = withTiming(focusedSearchBarWidth, {
        duration: 300,
      });
      cancelButtonOpacity.value = withTiming(1, {
        duration: 300,
      });
    };

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          {canBack === true && (
            <Animated.View
              style={[animatedBackButtonStyle, styles.backButtonContainer]}
            >
              <Pressable onPress={handleBack} style={[styles.button]}>
                <NavArrowLeft
                  width={32}
                  height={32}
                  strokeWidth={2}
                  color={colors.text}
                />
              </Pressable>
            </Animated.View>
          )}
          <Animated.View
            style={[
              styles.searchBoxContainer,
              animatedSearchBoxStyle,
              {
                backgroundColor: colors.searchBar,
              },
            ]}
            onLayout={handleLayout}
          >
            <Pressable onPress={handleSearchPress}>
              <Search
                width={18}
                height={18}
                strokeWidth={2}
                color={colors.secondaryText}
                style={styles.searchIcon}
              />
            </Pressable>
            <TextInput
              ref={inputRef}
              style={[styles.input, { color: colors.text }]}
              placeholder={placeholder}
              placeholderTextColor={colors.secondaryText}
              value={value}
              onChangeText={handleChangeText}
              onSubmitEditing={handleSubmit}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPress={handlePress}
              autoCapitalize='none'
              enablesReturnKeyAutomatically
              enterKeyHint='search'
              spellCheck={false}
            />
            {value.length > 0 && isFocused && (
              <Pressable onPress={handleClear} style={styles.button}>
                <XmarkCircleSolid
                  width={18}
                  height={18}
                  color={colors.secondaryText}
                />
              </Pressable>
            )}
          </Animated.View>
        </View>
        <Animated.View style={animatedCancelButtonStyle}>
          <Pressable
            onPress={handleCancel}
            style={styles.cancelButtonContainer}
          >
            <Text style={{ fontSize: 17 }}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 36,
    gap: 12,
  },
  searchBoxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 36,
    paddingHorizontal: 6,
    borderCurve: 'continuous',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  backButtonContainer: {
    overflow: 'hidden',
    marginLeft: -16,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    fontSize: 17,
    flex: 1,
    height: '100%',
    padding: 0,
  },
  button: {
    justifyContent: 'center',
    height: '100%',
  },
  cancelButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 53,
    height: '100%',
  },
});

export default SearchBar;
