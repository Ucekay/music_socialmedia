import { useState, useCallback, useMemo, useRef } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

import { useTheme } from '../contexts/ColorThemeContext';

interface AnimatedTextInputProps extends TextInputProps {
  focusedLabelTop: number;
  focusedLabelSize: number;
  label: string;
}

const AnimatedTextInput = (props: AnimatedTextInputProps) => {
  const { label, style, focusedLabelTop, focusedLabelSize, ...otherProps } =
    props;

  const { colors } = useTheme();
  const placeholderColor = colors.placeholder;

  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const inputFocused = useSharedValue(0);

  const { defaultLabelSize } = useMemo(() => {
    let fontSize: number | undefined;
    let fontWeight: TextStyle['fontWeight'] | undefined;

    if (Array.isArray(style)) {
      style.forEach((s) => {
        if (s && 'fontSize' in s) {
          fontSize = (s as TextStyle).fontSize;
        }
      });
    } else if (style && typeof style === 'object') {
      if ('fontSize' in style) {
        fontSize = (style as TextStyle).fontSize;
      }
    }

    return {
      defaultLabelSize: fontSize !== undefined ? fontSize : 16,
    };
  }, [style]);

  const animatedLabelStyle = useAnimatedStyle(
    () => ({
      top: withTiming(
        interpolate(inputFocused.value, [0, 1], [0, -focusedLabelTop])
      ),
      fontSize: withTiming(
        interpolate(
          inputFocused.value,
          [0, 1],
          [defaultLabelSize, focusedLabelSize]
        )
      ),
    }),
    [defaultLabelSize, focusedLabelTop, focusedLabelSize]
  );

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(e.nativeEvent.text);
  };

  const handleFocus = useCallback(() => {
    inputFocused.value = 1;
  }, []);

  const handleBlur = useCallback(() => {
    const trimmedValue = (value || '').trim();
    if (trimmedValue === '') {
      inputFocused.value = 0;
    }
  }, [value]);

  const labelHandler = () => {
    inputFocused.value = 1;
    inputRef?.current?.focus();
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        style={style}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        {...otherProps}
      />
      <Animated.View style={styles.textInputLabelWrapper}>
        <Pressable style={{ flex: 1 }} onPress={labelHandler}>
          <Animated.Text
            style={[
              animatedLabelStyle,
              {
                color: placeholderColor,
              },
            ]}
          >
            {label}
          </Animated.Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default AnimatedTextInput;

const styles = StyleSheet.create({
  textInputLabelWrapper: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    padding: 0,
  },
});
