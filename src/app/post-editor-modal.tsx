import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { LayoutChangeEvent } from 'react-native';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

import userData from '../assets/userData';
import { uploadImage } from '../backend/components/DB_Access/Image';
import { insertPost } from '../backend/components/DB_Access/post';
import IconAntDesign from '../components/Icons/AntDesign';
import ImageAspectKept from '../components/OriginalAspectImage';
import BgView from '../components/ThemedBgView';
import { useTheme } from '../contexts/ColorThemeContext';

type ImagePickerResult = ImagePicker.ImagePickerResult & {
  assets?: ImagePicker.ImagePickerAsset[];
};

const PostEditorModal = () => {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const [inputHeight, setInputHeight] = useState(40); // 初期の高さを設定
  const [postHeight, setPostHeight] = useState(60);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const animatedHeight = useSharedValue(0);
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    setErrorMessage('');
    const result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 4 - images.length,
      quality: 1,
    })) as ImagePickerResult;

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLoading(true);
      for (let i = 0; i < result.assets.length; i++) {
        setImages((prevImages) => [...prevImages, result.assets[i].uri]);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);
        setImages((images) => [...images, result.assets[0].uri]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      setLoading(false);
    }
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const textColor = colors.text;
  const secondaryTextColor = colors.secondaryText;

  const BOTTOM_TAB_HEIGHT = 96.7;

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setPostHeight(height - 60); // Viewの高さを状態に保存

    // 高さをアニメーションで変更
    animatedHeight.value = withTiming(height - 60, {
      duration: 600,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleLayoutChangeLine = () => {};

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  const onClose = () => {
    const title = '下書きに保存しまますか？';
    const options = ['内容を削除する', '内容を保存する', '編集を続行する'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        title,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.goBack();
            break;
          case 1:
            navigation.goBack();
            break;
          case 2:
            break;
        }
      },
    );
  };

  const onPublish = () => {
    const options = ['公開する', '編集を続行する'];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === 0) {
          handlePost();
        }
      },
    );
  };

  const handlePost = async () => {
    try {
      const ImageUrls = await Promise.all(
        images.map((image) => uploadImage(image, 'PostImage')),
      );
      if (text) {
        const data = { Body: text, ImageUrl: ImageUrls };
        const result = await insertPost(data);
        if (typeof result === 'boolean' && result) {
          // 記事の挿入に成功した場合の処理
          console.log('postが正常に挿入されました');
        } else {
          // 記事の挿入に失敗した場合の処理
          console.error('postの挿入に失敗しました:', result);
        }
      }
    } catch (error) {
      console.error('postの挿入中にエラーが発生しました:', error);
    }
  };

  return (
    <BgView style={[styles.container]}>
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          style={[styles.headerItem, { alignItems: 'flex-start' }]}
        >
          <Text style={[styles.text1, { color: textColor }]}>キャンセル</Text>
        </Pressable>
        <View style={[styles.headerItem]}>
          <Text style={[styles.text2, { color: textColor }]}>新規ポスト</Text>
        </View>
        <Pressable
          onPress={onPublish}
          style={[styles.headerItem, { alignItems: 'flex-end' }]}
        >
          <Text style={[styles.text2, { color: '#2f95dc' }]}>完了</Text>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: BOTTOM_TAB_HEIGHT }}
      >
        <Modal animationType='fade' transparent={true} visible={loading}>
          <View style={styles.dialog}>
            <BlurView tint={'systemMaterial'} style={styles.dialogInner}>
              <Text style={styles.text}>画像を読み込んでいます</Text>
              <ActivityIndicator />
            </BlurView>
          </View>
        </Modal>
        <View style={styles.editorHeader}>
          <View style={{ flexDirection: 'column' }}>
            <Image
              source={userData[0].userAvatarUrl}
              style={styles.avatorimage}
            />
            <Animated.View
              style={[styles.line, animatedStyle]}
              onLayout={handleLayoutChangeLine}
            />
          </View>
          <View
            style={[{ flexDirection: 'column', flex: 1 }]}
            onLayout={handleLayoutChange}
          >
            <View style={styles.headerLeft}>
              <Text style={styles.text1}>{userData[0].user}</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  height: Math.max(inputHeight + 10),
                  color: textColor,
                  borderBottomColor: secondaryTextColor,
                },
              ]}
              multiline
              placeholder='Postを新規追加'
              value={text}
              onChangeText={setText}
              onContentSizeChange={(event) => {
                setInputHeight(event.nativeEvent.contentSize.height + 10);
              }}
              scrollEnabled={false}
            />
            {images.length > 0 ? (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <FlatList
                  horizontal
                  data={images}
                  keyExtractor={(index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Animated.View entering={FadeIn} exiting={FadeOut}>
                      <ImageAspectKept
                        style={styles.image}
                        uri={item}
                        height={200}
                      >
                        <Pressable
                          style={styles.deleteButton}
                          onPress={() => handleDeleteImage(index)}
                        >
                          <Icon name='delete' size={24} color='#fff' />
                        </Pressable>
                      </ImageAspectKept>
                    </Animated.View>
                  )}
                />
              </Animated.View>
            ) : null}
            {images.length !== 4 ? (
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <IconAntDesign
                  name='paperclip'
                  size={20}
                  style={styles.Icon}
                  onPress={pickImage}
                />
                <IconAntDesign
                  name='camerao'
                  size={20}
                  style={styles.Icon}
                  onPress={takePhoto}
                />
              </View>
            ) : (
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <IconAntDesign name='paperclip' size={20} style={styles.Icon} />
                <IconAntDesign name='camerao' size={20} style={styles.Icon} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <BgView
        style={[
          styles.bottomButtonWrapper,
          {
            paddingBottom: insets.bottom,
            paddingTop: 12,
          },
        ]}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default PostEditorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerItem: {
    alignItems: 'center',
    flex: 1,
  },
  text2: {
    fontSize: 16,
    fontWeight: '600',
  },
  headertitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  line: {
    marginLeft: 31,
    marginTop: 10,
    borderLeftColor: '#ddd',
    borderLeftWidth: 2,
  },
  editorHeader: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  text1: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  input: {
    fontSize: 14,
    textAlignVertical: 'top',
    marginRight: 20,
    marginTop: 10,
  },
  avatorimage: {
    width: 30,
    height: 30,
    marginLeft: 16,
    marginRight: 12,
    borderColor: '#000000',
    borderRadius: 15,
    borderWidth: 0.3,
  },
  Icon: {
    marginBottom: 20,
    color: '#808080',
  },
  headerLeft: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 6,
    color: '#ddd',
  },
  image: {
    marginBottom: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 4,
  },
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
});
