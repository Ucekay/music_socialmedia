import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';

import EditorOptionButton from './EditorOptionButton';

const EditorImagePicker = () => {
  const { width } = useWindowDimensions();
  const [image, setImage] = useState<string | null>(null);
  const [imageEdited, setImageEdited] = useState(0);
  const imageWidth = width - 88;
  const imageHeight = ((width - 40) / 21) * 9;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <EditorOptionButton onPress={pickImage} title='写真ライブラリから選ぶ' />
      {image && (
        <View
          style={{
            borderRadius: 12,
            borderCurve: 'continuous',
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default EditorImagePicker;
