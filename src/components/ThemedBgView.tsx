import { View, ViewProps } from 'react-native';
import { useTheme } from '../contexts/ColorThemeContext';

const BgView = (props: ViewProps) => {
  const { colors } = useTheme();
  const { style, ...otherProps } = props;
  const backgroundColor = colors.background;
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default BgView;
