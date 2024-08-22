import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import * as IconoirIcons from 'iconoir-react-native';

import { useTheme } from '../contexts/ColorThemeContext';

type ButtonVariant = 'solid' | 'ghost' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface IconProps {
  name: string;
  size: number;
  color: string;
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
      return renderIcon({ name: icon, size: iconSize, color: iconColor });
    } else if (React.isValidElement(icon)) {
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
        <Text style={textStyles}>{text}</Text>
        {icon && iconPosition === 'right' && renderIconElement()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
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
});
