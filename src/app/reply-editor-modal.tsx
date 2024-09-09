import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type LayoutChangeEvent,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
  findNodeHandle,
} from 'react-native';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

import userData from '../assets/userData';
import IconAntDesign from '../components/Icons/AntDesign';
import OriginalAspectImage from '../components/OriginalAspectImage';
import BgView from '../components/ThemedBgView';
import { useTheme } from '../contexts/ColorThemeContext';

type ImagePickerResult = ImagePicker.ImagePickerResult & {
  assets?: ImagePicker.ImagePickerAsset[];
};

const ReplyEditorModal = () => {
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(40); // 初期の高さを設定
  const [postHeight, setPostHeight] = useState(60);
  const [_errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const animatedHeight = useSharedValue(0);

  const params = useLocalSearchParams();
  const post = params;

  let ImageUrl: string[] = [];

  if (typeof params.ImageUrlRow === 'string') {
    try {
      ImageUrl = JSON.parse(params.ImageUrlRow);
    } catch (error) {
      console.error('Error parsing image URLs:', error);
    }
  } else if (Array.isArray(params.ImageUrlRow)) {
    ImageUrl = params.ImageUrlRow;
  } else {
    console.error('Invalid image URLs:', params.ImageUrlRow);
  }

  const [postHeight2, setPostHeight2] = useState<number>(0);
  const postComponentRef = useRef(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (postComponentRef.current) {
      const handle = findNodeHandle(postComponentRef.current);
      if (handle) {
        UIManager.measure(handle, (height) => {
          setPostHeight2(height - 30);
        });
      }
    }
  }, [postComponentRef.current]);

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

  const textColor = colors.text;
  const secondaryTextColor = colors.secondaryText;

  const BOTTOM_TAB_HEIGHT = 96.7;

  const { showActionSheetWithOptions } = useActionSheet();

  const handlePost = () => {
    setText('');
    // ここでポストをサーバーに送信する処理を追加します
    console.log('Posted:', text, images);
  };

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setPostHeight(height - 60); // Viewの高さを状態に保存
    animatedHeight.value = withTiming(height, { duration: 300 });
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleLayoutChangeLine = () => {
    animatedHeight.value = withTiming(postHeight, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  const openCropEditor = async (num: number, uri: string) => {
    setLoading(true);
    ImageCropPicker.openCropper({
      path: uri,
      cropperToolbarTitle: '画像を編集',
      mediaType: 'photo',
      freeStyleCropEnabled: true,
    })
      .then((cropped) => {
        setImages(
          images.map((images, index) =>
            index === num ? cropped.path : images,
          ),
        );
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === 'User cancelled image selection') {
          setErrorMessage('画像の選択がキャンセルされました');
        }
        setLoading(false);
      });
  };

  const onClose = () => {
    const title = '返信を削除しまますか？';
    const options = ['内容を削除する', '編集を続行する'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

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
  const handleCropEditor = (num: number, uri: string) => {
    openCropEditor(num, uri);
  };

  return (
    <BgView style={[styles.container]}>
      <Modal animationType='fade' transparent={true} visible={loading}>
        <View style={styles.dialog}>
          <BlurView tint={'systemMaterial'} style={styles.dialogInner}>
            <Text style={styles.text}>画像を読み込んでいます</Text>
            <ActivityIndicator />
          </BlurView>
        </View>
      </Modal>
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          style={[styles.headerItem, { alignItems: 'flex-start' }]}
        >
          <Text style={[styles.text1, { color: textColor }]}>キャンセル</Text>
        </Pressable>
        <View style={[styles.headerItem]}>
          <Text style={[styles.text2, { color: textColor }]}>返信を作成</Text>
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
        <View style={styles.editorHeader}>
          <View style={{ flexDirection: 'column' }}>
            <Image source={post.userAvatarUrl} style={styles.avatarImage} />
            <View style={[styles.line, { height: postHeight2 - 10 }]} />
          </View>
          <View
            style={[{ flexDirection: 'column' }, { flex: 1 }]}
            ref={postComponentRef}
          >
            <View style={styles.headerLeft}>
              <Text style={styles.text1}>{post.user}</Text>
            </View>
            <Text
              style={[
                styles.input,
                {
                  color: textColor,
                  borderBottomColor: secondaryTextColor,
                  marginBottom: 16,
                },
              ]}
            >
              {post.postContent}
            </Text>
            {ImageUrl && ImageUrl.length > 0 ? (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                <FlatList
                  horizontal
                  data={ImageUrl}
                  keyExtractor={(index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Animated.View entering={FadeIn} exiting={FadeOut}>
                      <OriginalAspectImage
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
                      </OriginalAspectImage>
                    </Animated.View>
                  )}
                />
              </Animated.View>
            ) : null}
          </View>
        </View>
        <View style={styles.editorHeader2}>
          <View style={{ flexDirection: 'column' }}>
            <Image
              source={userData[0].userAvatarUrl}
              style={styles.avatarImage}
            />
            <Animated.View
              style={[styles.line, animatedStyle]}
              onLayout={handleLayoutChangeLine}
            />
          </View>
          <Animated.View
            style={[{ flexDirection: 'column' }, { flex: 1 }]}
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
              autoFocus
              placeholder='返信を新規追加'
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
                      <Pressable
                        onPress={() => {
                          handleCropEditor(index, item);
                        }}
                      >
                        <OriginalAspectImage
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
                        </OriginalAspectImage>
                      </Pressable>
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
          </Animated.View>
        </View>
      </ScrollView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default ReplyEditorModal;

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
  headerTitle: {
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
  editorHeader2: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
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
  avatarImage: {
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
