import { Pressable } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  name: string;
  size: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const IconAntDesign = (props: Props): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Icon
        name={props.name}
        size={props.size}
        style={props.style}
        color={props.color}
      />
    </Pressable>
  );
};

export default IconAntDesign;
