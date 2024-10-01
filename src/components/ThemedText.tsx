import {
  Text as DefaultText,
  type TextProps,
  useColorScheme,
} from 'react-native';

import Colors from '../constants/Colors';

type ThemedTextProps = TextProps & {
  secondary?: boolean;
};

const Text = (props: ThemedTextProps) => {
  const { style, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const color = props.secondary
    ? Colors[colorScheme ?? 'light'].secondaryText
    : Colors[colorScheme ?? 'light'].text;
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export default Text;
