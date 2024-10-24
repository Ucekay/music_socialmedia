import { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { ImageAdd02Icon } from 'hugeicons-react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, {
  FadeIn,
  FadeOut,
  type SharedValue,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useTheme } from '../contexts/ColorThemeContext';

import AnimatedTextInput from './AnimatedPlaceholderTextInput';
import ArticleTag from './ArticleTag';
import { Button } from './Button';
import EditorOptionButton from './EditorOptionButton';
import LiveInputField from './LiveInputField';
import Text from './ThemedText';
import TrackEntry from './TrackEntry';

const EditorImagePicker = () => {
  const { width } = useWindowDimensions();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageEdited, setImageEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { colors } = useTheme();
  const cropperWidth = width - 40;
  const cropperHeight = ((width - 40) / 21) * 9;
  const imageWidth = width - 88;
  const imageHeight = (imageWidth / 21) * 9;

  const pickImage = async () => {
    setErrorMessage('');
    const result = await ImagePicker.launchImageLibraryAsync({
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
    } catch (e) {
      if ((e as Error).message === 'User cancelled image selection') {
        setErrorMessage(
          '画像のクロップがキャンセルされたので、画像を読み込めませんでした。',
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
          <BlurView tint='regular' style={styles.dialogInner}>
            <Text style={styles.text}>画像を読み込んでいます</Text>
            <ActivityIndicator />
          </BlurView>
        </View>
      </Modal>
      {errorMessage !== '' && (
        <Text style={{ color: colors.cancelText }}>{errorMessage}</Text>
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

const GeneralMetaInput = () => {
  const { colors } = useTheme();
  const textColor = colors.text;
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
      <Animated.Text
        entering={FadeIn}
        exiting={FadeOut}
        style={[styles.imagePickerText, { color: textColor }]}
      >
        見出し画像
      </Animated.Text>
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
        <Text style={{ color: colors.cancelText }}>{errorMessage}</Text>
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

const ArticleConfigScreen = () => {
  const { colors } = useTheme();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const articleTypes = ['general', 'review', 'liveReport', 'playlist'];

  const textColor = colors.text;
  const secondaryTextColor = colors.secondaryText;

  const opacityValues: { [key: string]: SharedValue<number> } =
    articleTypes.reduce(
      (acc, type) => {
        acc[type] = useSharedValue(1);
        return acc;
      },
      {} as { [key: string]: SharedValue<number> },
    );

  const handleTagPress = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
      for (const t of articleTypes) {
        opacityValues[t].value = withTiming(1);
      }
    } else {
      setSelectedType(type);
      for (const t of articleTypes) {
        opacityValues[t].value = withTiming(t === type ? 1 : 0.3);
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <AnimatedTextInput
          label='Article Title'
          focusedLabelTop={16}
          focusedLabelSize={16}
          multiline={true}
          blurOnSubmit={true}
          style={[
            styles.title,
            { color: textColor, borderBottomColor: secondaryTextColor },
          ]}
        />
        <View style={styles.articleMetadataContainer}>
          <View style={styles.articleTagWrapper}>
            <Text style={styles.articlePickerText}>Articleの種類</Text>
            <View style={styles.articleTagContainer}>
              {articleTypes.map((type) => {
                const animatedStyle = useAnimatedStyle(() => {
                  return {
                    opacity: opacityValues[type].value,
                  };
                });

                return (
                  <Pressable
                    key={type}
                    onPress={() => handleTagPress(type)}
                    style={styles.articleTag}
                  >
                    <Animated.View style={animatedStyle}>
                      <ArticleTag type={type} size={17} />
                    </Animated.View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          {selectedType === 'general' && <GeneralMetaInput />}
          {selectedType === 'review' && <TrackEntry />}
          {selectedType === 'liveReport' && (
            <>
              <LiveInputField />
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                style={[styles.imagePickerText, { color: textColor }]}
              >
                見出し画像
              </Animated.Text>
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.imagePickerContainer}
              >
                <EditorImagePicker />
              </Animated.View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ArticleConfigScreen;

const styles = StyleSheet.create({
  dialog: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dialogInner: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderCurve: 'continuous',
    borderRadius: 16,
    gap: 12,
  },
  text: {
    fontSize: 17,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    borderBottomWidth: 1,
  },
  articleMetadataContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  articlePickerText: {
    fontSize: 17,
  },
  articleTagWrapper: {
    gap: 4,
  },
  articleTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    columnGap: 12,
    rowGap: 24,
  },
  articleTag: {
    flexGrow: 1,
    minWidth: '40%',
  },
  imagePickerText: {
    fontSize: 17,
    marginTop: 8,
  },
  imagePickerContainer: {
    width: '100%',
    paddingHorizontal: 12,
    gap: 12,
  },
});
