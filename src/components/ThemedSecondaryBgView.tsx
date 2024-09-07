import { View, type ViewProps } from 'react-native';

import { useTheme } from '../contexts/ColorThemeContext';

const SecondaryBgView = (props: ViewProps) => {
  const { colors } = useTheme();
  const { style, ...otherProps } = props;
  const backgroundColor = colors.secondaryBackground;
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default SecondaryBgView;
