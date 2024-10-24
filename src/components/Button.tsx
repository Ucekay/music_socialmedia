import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

import Colors from '../constants/Colors';
import { useTheme } from '../contexts/ColorThemeContext';

type ButtonVariant =
  | 'filled'
  | 'bezeled'
  | 'bezeledGray'
  | 'borderless'
  | 'border';
type ButtonSize = 'small' | 'medium' | 'large';

interface IconProps {
  name?: string;
  size: number;
  color: string;
  fill?: string;
}

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string | React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  renderIcon?:
    | ((props: IconProps) => React.ReactNode)
    | ((props: IconProps) => React.JSX.Element);
  iconFill?: string;
  colorScheme?: 'light' | 'dark';
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'filled',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  backgroundColor,
  textColor,
  style,
  textStyle,
  renderIcon,
  iconFill,
  colorScheme,
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (colorScheme === 'dark') {
      return getBackgroundColorByScheme(Colors.dark);
    }
    if (colorScheme === 'light') {
      return getBackgroundColorByScheme(Colors.light);
    }
    return getBackgroundColorByScheme(colors);
  };

  const getBackgroundColorByScheme = (
    colorScheme: typeof Colors.light | typeof Colors.dark | typeof colors,
  ) => {
    if (disabled) return colorScheme.buttonDisabled;
    if (backgroundColor) return backgroundColor;
    switch (variant) {
      case 'filled':
        return colorScheme.buttonFilled;
      case 'bezeled':
        return colorScheme.buttonBezeled;
      case 'bezeledGray':
        return colorScheme.buttonBezeledGray;
      case 'borderless':
        return colorScheme.buttonBorderless;
      case 'border':
        return 'transparent';
      default:
        return colorScheme.buttonFilled;
    }
  };

  const getTextColor = () => {
    if (colorScheme === 'dark') {
      return getTextColorByScheme(Colors.dark);
    }
    if (colorScheme === 'light') {
      return getTextColorByScheme(Colors.light);
    }
    return getTextColorByScheme(colors);
  };

  const getTextColorByScheme = (
    colorScheme: typeof Colors.light | typeof Colors.dark | typeof colors,
  ) => {
    if (disabled) return colorScheme.buttonDisabledText;
    if (textColor) return textColor;
    switch (variant) {
      case 'filled':
        return colorScheme.buttonText;
      case 'bezeled':
      case 'bezeledGray':
      case 'borderless':
        return colorScheme.tint;
      case 'border':
        return colorScheme.text;
      default:
        return colorScheme.buttonText;
    }
  };

  const buttonStyles = [
    {
      backgroundColor: getBackgroundColor(),
      borderWidth: variant === 'border' ? 1 : 0,
      borderColor: colors.text,
    },
    styles[size],
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    { color: getTextColor() },
    textStyle,
  ];

  const iconSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
  const iconColor = getTextColor();

  const renderIconElement = () => {
    if (typeof icon === 'string' && renderIcon) {
      return (
        <View
          style={{
            width: iconSize,
            height: iconSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {renderIcon({
            name: icon,
            size: iconSize,
            color: iconColor,
            fill: iconFill,
          })}
        </View>
      );
    }
    if (renderIcon) {
      <View
        style={{
          width: iconSize,
          height: iconSize,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderIcon({
          size: iconSize,
          color: iconColor,
          fill: iconFill,
        })}
      </View>;
    }
    if (React.isValidElement(icon)) {
      return icon;
    }
    return null;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [...buttonStyles, pressed && styles.pressed]}
    >
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && renderIconElement()}
        <View style={styles.textContainer}>
          <Text style={textStyles}>{title}</Text>
        </View>
        {icon && iconPosition === 'right' && renderIconElement()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  small: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderCurve: 'continuous',
    borderRadius: 12,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 15,
  },
  mediumText: {
    fontSize: 15,
  },
  largeText: {
    fontSize: 17,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
