import { Pressable, StyleSheet, Text } from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Animated from 'react-native-reanimated';

import { useTheme } from '../contexts/ColorThemeContext';

type EditorOptionButtonProps = {
  onPress: () => void;
  title: string;
};

const EditorOptionButton = ({ onPress, title }: EditorOptionButtonProps) => {
  const { colors } = useTheme();
  const secondaryTextColor = colors.secondaryText;

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[styles.option, { borderColor: secondaryTextColor }]}
      >
        <Text style={[styles.optionText, { color: secondaryTextColor }]}>
          {title}
        </Text>
        <FontAwesome6 name='plus' size={15} color={secondaryTextColor} />
      </Animated.View>
    </Pressable>
  );
};

export default EditorOptionButton;

const styles = StyleSheet.create({
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
