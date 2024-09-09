import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

type ButtonVariant = 'solid' | 'ghost' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface IconProps {
  name: string;
  size: number;
  color: string;
  fill?: string;
}

interface ButtonProps {
  onPress: () => void;
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string | React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  renderIcon?: (props: IconProps) => React.ReactNode;
  iconFill?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  variant = 'solid',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  backgroundColor,
  textColor,
  borderColor,
  style,
  textStyle,
  renderIcon,
  iconFill,
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (disabled) return colors.buttonDisabled;
    switch (variant) {
      case 'solid':
        return colors.buttonSolid;
      case 'ghost':
      case 'outline':
        return colors.buttonGhost;
      default:
        return colors.buttonSolid;
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    if (disabled) return colors.buttonDisabledText;
    switch (variant) {
      case 'solid':
        return colors.buttonText;
      case 'ghost':
      case 'outline':
        return colors.buttonGhostText;
      default:
        return colors.buttonText;
    }
  };

  const getBorderColor = () => {
    if (borderColor) return borderColor;
    if (variant === 'outline') return colors.buttonOutlineBorder;
    return 'transparent';
  };

  const buttonStyles = [
    styles.button,
    { backgroundColor: getBackgroundColor() },
    { borderColor: getBorderColor() },
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
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
          <Text style={textStyles}>{text}</Text>
        </View>
        {icon && iconPosition === 'right' && renderIconElement()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    gap: 8,
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
