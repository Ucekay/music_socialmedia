import { View, ViewProps, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

const SecondaryBgView = (props: ViewProps) => {
  const colorScheme = useColorScheme();
  const { style, ...otherProps } = props;
  const backgroundColor = Colors[colorScheme ?? 'light'].secondaryBackground;
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default SecondaryBgView;
