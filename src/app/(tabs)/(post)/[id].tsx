import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image as RNImage,
  Modal,
  GestureResponderEvent
} from 'react-native';
import { useFocusEffect, useLocalSearchParams, Link } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HeartIcon from '@/src/components/Icon/HeartIcon';
import { Image } from 'expo-image';
import IconAntDesign from '@/src/components/Icon/AntDesign';
import TabActionMenu from '@/src/components/TabActionMenu';
import TabActionMenuList from '@/src/components/TabActionMenuList';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import ShareIcon from '@/src/components/Icon/ShareIcon';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Message } from 'iconoir-react-native';

const screen = Dimensions.get('screen');

const PostDetailScreen = (): JSX.Element => {
  const params = useLocalSearchParams();
  const post = params;
  const [modalStatus, setModalStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState([{ url: "" }])
  const [initialIndex, setInitialIndex] = useState(0);
  const { setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();

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


  const HandleImage = (n: number) => {
    if (ImageUrl) {
      setImageUrl(ImageUrl.map((url) => ({ url })))
    }
    setInitialIndex(n)
    setModalStatus(true);
  }

  const onClose = () => {
    setModalStatus(false)
  }
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(false);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );
  if (!post) {
    return <Text>Post not found.</Text>;
  }
  return (
    <View style={styles.container}>
      <Link href={{
        pathname: '/(tabs)/home/(profile)/[userID]',
        params: {
          userID: post.userID
        }
      }}>
        <View>
          <View style={styles.userContainer}>
            <Image
              style={styles.userAvatar}
              source={post.userAvatarUrl} />
            <View>
              <Text style={styles.text1}>{post.user}</Text>
              <Text style={styles.text2}>{post.userID}</Text>
            </View>
          </View>
        </View>
      </Link>
      <Text
        style={[styles.text1, { marginBottom: 16 }]}
      >
        {post.postContent}
      </Text>
      {ImageUrl.length !== 0 && (
        <View>
          <View>
            {ImageUrl.length === 1 && (
              <Pressable onPress={(e) => HandleImage(0)}>
                <Image source={ImageUrl[0]} style={styles.postImage} />
              </Pressable>
            )}
            {ImageUrl.length === 2 && (
              <View style={styles.imageContainer}>
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={ImageUrl[0]} style={styles.Image2} />
                </Pressable>
                <Pressable onPress={(e) => HandleImage(1)}>
                  <Image source={ImageUrl[1]} style={styles.Image2} />
                </Pressable>
              </View>)}
            {ImageUrl.length === 3 && (
              <View style={styles.imageContainer}>
                <Pressable onPress={(e) => HandleImage(0)}>
                  <Image source={ImageUrl[0]} style={styles.Image2} />
                </Pressable>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(1)}>
                    <Image source={ImageUrl[1]} style={styles.Image3} />
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={ImageUrl[2]} style={styles.Image3} />
                  </Pressable>
                </View>
              </View>)}
            {ImageUrl.length === 4 && (
              <View style={styles.imageContainer}>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(0)}>
                    <Image source={ImageUrl[0]} style={styles.Image3} />
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(1)}>
                    <Image source={ImageUrl[1]} style={styles.Image3} />
                  </Pressable>
                </View>
                <View style={styles.imageContainer2}>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={ImageUrl[2]} style={styles.Image3} />
                  </Pressable>
                  <Pressable onPress={(e) => HandleImage(2)}>
                    <Image source={ImageUrl[3]} style={styles.Image3} />
                  </Pressable>
                </View>
              </View>)}
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalStatus}
            onRequestClose={onClose}
            style={styles.modalOverlay}
          >
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>閉じる</Text>
            </Pressable>
            <View style={{ flex: 1, paddingTop: 30, backgroundColor: '#000000' }}>
              <ImageViewer
                imageUrls={imageUrl}
                enableSwipeDown
                onSwipeDown={onClose}
                index={initialIndex}
                renderImage={(props) => <Image {...props} style={styles.image} contentFit='contain' />} />
            </View>
          </Modal>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.text3}>{post.createAt}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text3}>{post.view}件のいいね</Text>
      </View>
      <View style={styles.iconContainer}>
        <HeartIcon size={20} />
        <Link href={{
          pathname: '/reply-editor-modal',
          params: {
            postID: post.postID,
            postContent: post.postContent,
            ImageUrlRow: post.ImageUrlRow,
            userID: post.userID,
            user: post.user,
            userAvatarUrl: post.userAvatarUrl,
            createAt: post.createAt,
            view: post.view
          },
        }}
          asChild >
          <Message width={20} height={20} color={'#000000'} />
        </Link>
        <ShareIcon size={20} />
      </View>
      <TabActionMenu />
    </View>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16
  },
  userContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    lineHeight: 19,
  },
  text2: {
    fontSize: 12,
    lineHeight: 12,
    color: 'rgba(67, 80, 96, 1)',
  },
  text3: {
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(67, 80, 96, 1)',
  },
  userAvatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 16
  },
  infoContainer: {
    height: 34,
    justifyContent: 'center',
    borderBottomColor: 'rgba(67, 80, 96, 0.3)',
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    marginVertical: 16,
  },
  text4: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    color: '#ffffff',
  },
  playIcon: {
    color: '#ffffff',
    opacity: 0.8,
  },
  postImage: {
    marginRight: 12,
    width: screen.width - 32,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  imageContainer: {
    height: 150,
    width: screen.width - 32,
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 16,
    flexDirection: 'row',
    objectFit: 'cover',
    overflow: 'hidden',
    flexWrap: 'wrap',
    gap: 2,
  },
  Image2: {
    height: 150,
    width: screen.width / 2 - 17
  },
  imageContainer2: {
    height: 150,
    width: screen.width / 2 - 17,
    gap: 2
  },
  Image3: {
    height: 78,
    width: '100%'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  image: {
    flex: 1,
    resizeMode: 'contain'
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
  },
});


