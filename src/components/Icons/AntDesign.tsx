import { Pressable } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  name: string;
  size: number;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const IconAntDesign = (props: Props): JSX.Element => {
  return (
    <Pressable onPress={props.onPress}>
      <Icon
        name={props.name}
        size={props.size}
        color={props.color}
        style={props.style}
      />
    </Pressable>
  );
};

export default IconAntDesign;
