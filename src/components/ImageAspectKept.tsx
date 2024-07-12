import React, {useState} from 'react';
import { Image } from 'expo-image';
import { Image as RNImage, View, Text } from 'react-native'

interface Props {
    uri?: string,
    height: number,
    children?: JSX.Element,
    style?: any,
    url?: string,
    src: 'url' | 'uri'
}

const ImageAspectKept = (props: Props) : JSX.Element => {
  
  if (props.src=='uri' && props.uri){
    const [width, setWidht] = useState(200)
    RNImage.getSize(props.uri, (originalWidth, originalHeight) => {
        const newWidth = (Number(originalWidth*props.height/originalHeight));
        setWidht(newWidth);
      });
  return(
    <Image source={{uri: props.uri}} style={[props.style, {height: props.height, width: width} ]}>{props.children}</Image>
  )
  } else if (props.src=='url' && props.url){
    const [width, setWidht] = useState(200)
    RNImage.getSize(props.url, (originalWidth, originalHeight) => {
        const newWidth = (Number(originalWidth*props.height/originalHeight));
        setWidht(newWidth);
      });
  return(
    <Image source={props.url} style={[props.style, {height: props.height, width: width} ]}>{props.children}</Image>
  )
  } else {
    return(
    <View>
      <Text>Image not Found</Text>
    </View>
    )
  }
}

export default ImageAspectKept