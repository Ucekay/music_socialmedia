import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  useWindowDimensions,
  NativeSyntheticEvent,
  TargetedEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { NavArrowLeft, Search, XmarkCircleSolid } from 'iconoir-react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SearchBarCommands } from 'react-native-screens';
import { useNavigation } from 'expo-router';

import { useTheme } from '../contexts/ColorThemeContext';
import Text from './ThemedText';

interface SearchBarProps {
  placeholder?: string;
  onBlur?: () => void;
  onCancelButtonPress?: () => void;
  onChangeText?: (text: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  onSearchButtonPress?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
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
      canBack ? width - 48 : width - 32
    );
    const inputRef = useRef<TextInput>(null);

    const focusedSearchBarWidth = canBack
      ? initialWidth - 49
      : initialWidth - 65;

    useImperativeHandle(
      ref,
      () => {
        return {
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
      []
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
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
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
      <View
        style={{
          width: '100%',
          height: 36,
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {canBack === true && (
            <Animated.View
              style={[
                animatedBackButtonStyle,
                { marginLeft: -16, overflow: 'hidden' },
              ]}
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
              styles.container,
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
        <Animated.View style={[animatedCancelButtonStyle, { width: 53 }]}>
          <Pressable
            onPress={handleCancel}
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 17 }}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderCurve: 'continuous',
    paddingHorizontal: 6,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    padding: 0,
    height: '100%',
  },
  button: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default SearchBar;
