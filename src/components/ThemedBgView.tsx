import { View, ViewProps, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

const BgView = (props: ViewProps) => {
  const colorScheme = useColorScheme();
  const { style, ...otherProps } = props;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default BgView;
