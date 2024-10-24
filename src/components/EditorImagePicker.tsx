import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { ImageAdd02Icon } from 'hugeicons-react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Text from '../components/ThemedText';
import { useTheme } from '../contexts/ColorThemeContext';

import { Button } from './Button';

const EditorImagePicker = () => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const pickImage = async () => {
    setErrorMessage('');
    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      cropImage(selectedImage);
    } else {
      setLoading(false);
    }
  };

  const cropImage = async (image: string) => {
    await ImageCropPicker.openCropper({
      path: image,
      width: width,
      height: (width / 21) * 9,
      cropperToolbarTitle: '画像を編集',
      mediaType: 'photo',
    })
      .then((cropped) => {
        setImage(cropped.path);
      })
      .catch((e) => {
        if ((e as Error).message !== 'User cancelled image selection') {
          setErrorMessage('画像を読み込めませんでした');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{ gap: 12 }}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.imagePickerContainer}
      >
        <Button
          disabled={loading}
          icon='ImageAdd02'
          iconPosition='right'
          renderIcon={({ size, color }) => (
            <ImageAdd02Icon size={size} color={color} />
          )}
          size='large'
          title={image ? '画像を変更' : 'ライブラリから画像を選択'}
          variant='border'
          onPress={pickImage}
        />
      </Animated.View>
      {errorMessage !== '' && (
        <Text style={{ color: colors.distractiveText }}>{errorMessage}</Text>
      )}
      {image && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            borderRadius: 12,
            borderCurve: 'continuous',
            overflow: 'hidden',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: image }}
            contentFit='cover'
            style={{
              width: width - 88,
              height: ((width - 88) / 21) * 9,
              borderRadius: 12,
            }}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default EditorImagePicker;

const styles = StyleSheet.create({
  imagePickerContainer: {
    width: '100%',
    gap: 12,
  },
});
