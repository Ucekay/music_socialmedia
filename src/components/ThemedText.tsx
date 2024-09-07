import {
  Text as DefaultText,
  type TextProps,
  useColorScheme,
} from 'react-native';
import Colors from '../constants/Colors';

const Text = (props: TextProps) => {
  const colorScheme = useColorScheme();
  const { style, ...otherProps } = props;
  const color = Colors[colorScheme ?? 'light'].text;
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export default Text;
