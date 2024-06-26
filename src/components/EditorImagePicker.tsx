import { useState } from 'react';
import {
  View,
  useWindowDimensions,
  Modal,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import EditorOptionButton from './EditorOptionButton';
import Text from './ThemedText';
import Color from '../constants/Colors';

const EditorImagePicker = () => {
  const { width } = useWindowDimensions();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageEdited, setImageEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const colorScheme = useColorScheme();
  const cropperWidth = width - 40;
  const cropperHeight = ((width - 40) / 21) * 9;
  const imageWidth = width - 88;
  const imageHeight = (imageWidth / 21) * 9;

  const pickImage = async () => {
    setErrorMessage('');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      const selectedImage = result.assets[0].uri;
      setImageEdited(false);
      openCropEditor(selectedImage);
    } else {
      setLoading(false);
    }
  };

  const openCropEditor = async (selectedImage: string) => {
    try {
      const cropped = await ImageCropPicker.openCropper({
        path: selectedImage,
        width: cropperWidth,
        height: cropperHeight,
        cropperToolbarTitle: '画像を編集',
        mediaType: 'photo',
      });
      setImage(cropped.path);
      setImageEdited(true);
    } catch (e: any) {
      console.log(e.message);
      if (e.message === 'User cancelled image selection') {
        setErrorMessage(
          '画像のクロップがキャンセルされたので、画像を読み込めませんでした。'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        gap: 12,
      }}
    >
      <EditorOptionButton onPress={pickImage} title='写真ライブラリから選ぶ' />
      <Modal animationType='fade' transparent={true} visible={loading}>
        <View style={styles.dialog}>
          <BlurView tint={'systemMaterial'} style={styles.dialogInner}>
            <Text style={styles.text}>画像を読み込んでいます</Text>
            <ActivityIndicator />
          </BlurView>
        </View>
      </Modal>
      {errorMessage !== '' && (
        <Text style={{ color: Color[colorScheme ?? 'light'].warnText }}>
          {errorMessage}
        </Text>
      )}
      {imageEdited && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            borderRadius: 12,
            borderCurve: 'continuous',
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: image }}
            contentFit='cover'
            style={{
              width: imageWidth,
              height: imageHeight,
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
  dialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogInner: {
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 16,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  text: {
    fontSize: 17,
  },
});
