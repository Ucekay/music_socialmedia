import { useState } from 'react';
import { Image as RNImage } from 'react-native';
import type { ImageStyle, StyleProp } from 'react-native';

import { Image } from 'expo-image';

interface Props {
  uri: string;
  height: number;
  children: JSX.Element;
  style?: StyleProp<ImageStyle>;
}

const OriginalAspectImage = (props: Props): JSX.Element => {
  const [width, setWidth] = useState(200);
  RNImage.getSize(props.uri, (originalWidth, originalHeight) => {
    const newWidth = Number((originalWidth * props.height) / originalHeight);
    setWidth(newWidth);
  });
  return (
    <Image
      source={{ uri: props.uri }}
      style={[props.style, { height: props.height, width: width }]}
    >
      {props.children}
    </Image>
  );
};

export default OriginalAspectImage;
