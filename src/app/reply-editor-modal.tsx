import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Pressable,
  FlatList,
  Modal,
  ActivityIndicator,
  findNodeHandle,
  UIManager,
} from 'react-native';
import userData from '../assets/userData';
import { Image } from 'expo-image';
import BgView from '../components/ThemedBgView';
import IconAntDesign from '../components/Icons/AntDesign';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/AntDesign';
import OriginalAspectImage from '../components/OriginalAspectImage';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTheme } from '../contexts/ColorThemeContext';

type ImagePickerResult = ImagePicker.ImagePickerResult & {
  assets?: ImagePicker.ImagePickerAsset[];
};

const ReplyEditorModal = () => {
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(40); // 初期の高さを設定
  const [postHeight, setPostHeight] = useState(60);
  const [errorMessage, setErrorMessage] = useState<string>('');
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

  useEffect(() => {
    if (postComponentRef.current) {
      const handle = findNodeHandle(postComponentRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height) => {
          setPostHeight2(height - 30);
        });
      }
    }
  }, [postComponentRef.current]);

  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    setErrorMessage('');
    let result = (await ImagePicker.launchImageLibraryAsync({
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

  const handleLayoutChange = (event: any) => {
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
    try {
      setLoading(true);
      const cropped = await ImageCropPicker.openCropper({
        path: uri,
        cropperToolbarTitle: '画像を編集',
        mediaType: 'photo',
        freeStyleCropEnabled: true,
      });
      setImages(
        images.map((images, index) => (index === num ? cropped.path : images))
      );
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
      }
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
          handlePost;
        }
      }
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
                  keyExtractor={(item, index) => index.toString()}
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
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Animated.View entering={FadeIn} exiting={FadeOut}>
                      <Pressable
                        onPress={(e) => {
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
    paddingTop: 20,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
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
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
    marginLeft: 31,
    marginTop: 10,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    flex: 1,
  },
  editorHeader2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  input: {
    fontSize: 14,
    marginTop: 10,
    textAlignVertical: 'top',
    marginRight: 20,
  },
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 16,
    marginRight: 12,
    borderWidth: 0.3,
    borderColor: '#000000',
  },
  Icon: {
    color: '#808080',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 6,
    color: '#ddd',
  },
  image: {
    marginBottom: 20,
    borderRadius: 10,
    marginRight: 10,
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
    gap: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
  },
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
