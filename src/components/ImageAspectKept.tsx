import React, {useState} from 'react';
import { Image } from 'expo-image';
import { Image as RNImage } from 'react-native'

interface Props {
    url: string,
    height: number,
    children: JSX.Element,
    style?: any,
}

const ImageAspectKept = (props: Props) : JSX.Element => {
    const [width, setWidht] = useState(200)
    RNImage.getSize(props.url, (originalWidth, originalHeight) => {
        const newWidth = (Number(originalWidth*props.height/originalHeight));
        setWidht(newWidth);
      });
  return(
    <Image source={props.url} style={[props.style, {height: props.height, width: width} ]}>{props.children}</Image>
  )
}

export default ImageAspectKept