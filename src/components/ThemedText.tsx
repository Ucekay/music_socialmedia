import { Text as DefaultText, type TextProps } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

type ThemedTextProps = TextProps & {
  secondary?: boolean;
};

const Text = (props: ThemedTextProps) => {
  const { style, ...otherProps } = props;
  const { colors } = useTheme();
  const color = props.secondary ? colors.secondaryText : colors.text;
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export default Text;
